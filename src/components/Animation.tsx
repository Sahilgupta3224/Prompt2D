import type { Entity } from "../types/Entity";
import { useRef, useEffect, useState } from "react";
import { Container, Sprite, Texture, Ticker, Assets, Graphics, Text, TextStyle } from "pixi.js";
import { extend, useTick, useApplication } from "@pixi/react";
import { useHeroAnimation } from "../helpers/useHeroAnimation";
import { ANIMATION_SPEED } from "../constants/game-world";
import { SceneRunner } from "../core/SceneRunner";
import { backgroundAssets } from "../helpers/assets";
import { generateShapeTexture, type ShapeName } from "../helpers/shapeFactory";
import { HERO_FRAME_SIZE, GAME_WIDTH, GAME_HEIGHT } from "../constants/game-world";
import type { Config } from "../helpers/anchorScanner";
import { OutlineFilter, GlowFilter } from 'pixi-filters';
import { ColorMatrixFilter } from 'pixi.js';
import { CharacterAssembler } from "../helpers/CharacterAssembler";
import { buildGloveAttachmentConfig } from "../helpers/gloveAttachmentScanner";
import type { SceneDefinition } from "../types/Scene";

extend({ Container, Sprite, Graphics, Text });

type AttachmentConfig = ReturnType<typeof Config>;
type FrameOffset = { x: number; y: number } | null;

interface IHeroProps {
  herotexture: Texture | null;
  setBackgroundTexture: (texture: Texture) => void;
  scannedAnchorConfig?: AttachmentConfig | null;
  sceneDef: SceneDefinition;
}

export const Animation = ({ herotexture, setBackgroundTexture, scannedAnchorConfig, sceneDef }: IHeroProps) => {
  if (!herotexture) return null;

  const sceneRef = useRef<SceneRunner | null>(null);
  const shadowGfx = useRef<Graphics | null>(null);
  const [entities, _setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const entitiesRef = useRef<Entity[]>([]);
  const setEntities = (arr: Entity[]) => { entitiesRef.current = arr; _setEntities(arr); };
  const { app } = useApplication();

  const { update: heroAnimUpdate } = useHeroAnimation({
    texture: herotexture,
    animationSpeed: ANIMATION_SPEED,
  });

  useEffect(() => {
    let scene: SceneRunner;
    setIsLoading(true);
    setEntities([]);

    try {
      scene = new SceneRunner(sceneDef);
      sceneRef.current = scene;
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      return () => {};
    }

    const allEntities = scene.registry.getAll();
    for (const entity of allEntities) {
      if (!entity.isObject) {
        entity.texture = herotexture;
        if (!entity.currentanim) {
          entity.currentanim = "IDLEDOWN";
        }
        if (!entity.attachmentConfig) {
          entity.attachmentConfig = {};
        }
      }
    }
    setEntities([...allEntities]);

    const prepareEntities = async () => {
      const Entities = allEntities.filter(e => !e.isObject && e.appearance);
      if (Entities.length === 0) {
        setIsLoading(false);
        scene.startAudio();
        return;
      }

      let c = 0;
      for (const entity of Entities) {
        CharacterAssembler.assembleFromAppearance(entity.appearance!)
          .then(async tex => {
            entity.texture = tex;
            if (entity.appearance?.gloves) {
              try {
                const gloveConfig = await buildGloveAttachmentConfig(
                  entity.appearance.gloves as string
                );
                // console.log(gloveConfig)
                if (gloveConfig && gloveConfig["MOVELEFT"] && gloveConfig["MOVELEFT"].hand) {
                  (gloveConfig["MOVELEFT"].hand)[1] = null;
                }
                entity.attachmentConfig = {
                  ...entity.attachmentConfig,
                  ...gloveConfig,
                };
              } catch (err) {
                console.warn(`[GloveScanner] Failed for "${entity.id}":`, err);
              }
            }

            c++;
            if (c === Entities.length) {
              setIsLoading(false);
              console.log("assembled")
              scene.startAudio();
            }
            setEntities([...scene.registry.getAll()]);
          })
          .catch(e => {
            console.error(`Failed to assemble character ${entity.id}:`, e);
            c++;
            if (c === Entities.length) {
              setIsLoading(false);
              scene.startAudio();
            }
          });
      }
    };
    prepareEntities();

    const background = scene.getBackground();
    if (background) {
      Assets.load(backgroundAssets[background]).then((texture) => {
        setBackgroundTexture(texture as Texture)
      })
    }

    const objects = scene.getObjects();
    if (app?.renderer) {
      for (const object of objects) {
        object.texture = generateShapeTexture(app.renderer, {
          shape: (object.shape ?? "circle") as ShapeName,
          color: object.color ?? "#4a90d9",
          size: 96,
        });
      }
    }

    const unsubscribe = scene.registry.subscribe(() => {
      setEntities(scene.registry.getAll());
    });

    return () => {
      unsubscribe();
      scene.destroy();
    };
  }, [herotexture, scannedAnchorConfig, app?.renderer, setBackgroundTexture, sceneDef]);

  function updateEntityTransform(e: Entity) {
    if (e.parent) {
      let offset = e.localOffset || { x: 0, y: 0 };
      if (e.attachmentPoint && e.parent.attachmentConfig) {
        const anim = e.parent.currentanim;
        const frame = e.parent.currentFrame || 0;
        const parentScale = (e.parent.scale ?? 1) * (e.parent.visualScale ?? 1);
        const config = e.parent.attachmentConfig[anim]?.[e.attachmentPoint]
          ?? e.parent.attachmentConfig["default"]?.[e.attachmentPoint];
        const rawOffset: FrameOffset = config
          ? (Array.isArray(config) ? (config[frame % config.length] as FrameOffset) : config)
          : null;
        const container = e.container.current;
        if (rawOffset === null) {
          if (container) container.visible = false;
          return;
        }
        if (container) container.visible = true;
        const half = HERO_FRAME_SIZE / 2;
        const parentVOffset = (e.parent as any).visualOffset ?? 0;
        offset = {
          x: (rawOffset.x - half) * parentScale,
          y: (rawOffset.y - half) * parentScale + parentVOffset,
        };
      } else {
        const container = e.container.current;
        if (container) container.visible = true;
      }
      e.x = e.parent.x + offset.x;
      e.y = e.parent.y + offset.y;
    }
    const c = e.container.current;
    if (c) {
      c.x = e.x;
      c.y = e.y;
    }
  }

  useTick((ticker: Ticker) => {
    const dt = ticker.deltaTime;
    try {
      const scene = sceneRef.current;
      if (!scene) return;
      scene.update(dt);

      const registryEntities = scene.registry.getAll();
      if (entitiesRef.current.length !== registryEntities.length) {
        setEntities([...registryEntities]);
        return;
      }

      const g = shadowGfx.current;
      if (g) {
        g.clear();
        for (const e of registryEntities) {
          if (!e.isObject) {
            const vScale = (e as any).visualScale || 1;
            const Y = e.y + (30 * (e.scale * vScale));
            g.ellipse(e.x, Y, 15 * e.scale, 5 * e.scale);
            g.fill({ color: 0x000000, alpha: 0.2 });
          }
        }
      }

      for (const e of registryEntities) {
        updateEntityTransform(e);
        const sprite = e.sprite.current;
        const container = e.container.current;
        if (container) {
          if (e.parent) {
            e.zIndex = (e.parent.zIndex || 0) + 1;
          } else {
            e.zIndex = Math.round(e.y + (e.isObject ? 0 : 32 * (e.scale * (e.visualScale || 1))));
          }
          container.zIndex = e.zIndex
        }
        if (e && sprite) {
          const filters = [];
          if (e.state.isSelected) {  //just in case if i have some usecase of this in any primitive
            if (!e.outlineFilter) e.outlineFilter = new OutlineFilter(2, 0x00ff00);
            filters.push(e.outlineFilter);
          }
          if (e.state.isMagic) {
            if (!e.glowFilter) e.glowFilter = new GlowFilter({ distance: 15, outerStrength: 2, color: 0x00ffff });
            filters.push(e.glowFilter);
          }
          if (e.state.isHit) {
            sprite.tint = 0xff8888;
          } else if (e.state.hp === 0) {
            if (!e.desatFilter) { e.desatFilter = new ColorMatrixFilter(); e.desatFilter.desaturate(); }
            filters.push(e.desatFilter);
            sprite.tint = 0x888888;
          } else {
            sprite.tint = 0xffffff;
          }
          sprite.filters = filters.length > 0 ? filters : null;

          if (!e.isObject) {
            const mode = e.animMode ?? (!!e.state.isMoving || !!e.state.isJumping ? "loop" : "static");
            const { texture: frameTexture, frameIndex, finished, vScale, vOffset } = heroAnimUpdate(e.id, (e.currentanim as any), mode, e.texture || undefined);
            sprite.texture = frameTexture;
            sprite.scale.set(e.scale * vScale);
            sprite.y = vOffset;
            (e as any).visualScale = vScale;
            (e as any).visualOffset = vOffset;
            e.currentFrame = frameIndex;
            if (finished) {
              e.animFinished = true;
            }
          }
        }
      }
    } catch (e) {
      console.warn("Update error:", e);
    }
  });

  if (isLoading) {
    return (
      <pixiContainer>
        <pixiText
          text="Assembling characters..."
          anchor={0.5}
          x={GAME_WIDTH / 2}
          y={GAME_HEIGHT / 2}
          style={new TextStyle({
            fill: 0xffffff,
            fontSize: 28,
            fontWeight: 'bold'
          })}
        />
      </pixiContainer>
    );
  }

  return (
    <pixiContainer sortableChildren={true}>
      <pixiGraphics ref={shadowGfx} zIndex={0} draw={() => { }} />
      {entities.map((e) => (
        <pixiContainer key={e.id} ref={e.container} visible={!!e.texture || e.isObject}>
          <pixiSprite
            ref={e.sprite}
            texture={e.texture ?? undefined}
            scale={e.scale}
            anchor={0.5}
          />
        </pixiContainer>
      ))}
    </pixiContainer>
  );
};