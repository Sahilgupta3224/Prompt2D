import type { Entity } from "../types/Entity";
import { useRef, useEffect, useState } from "react";
import { Container, Sprite, Texture, Ticker, Assets, Graphics } from "pixi.js";
import { extend, useTick, useApplication } from "@pixi/react";
import { useHeroAnimation } from "../helpers/useHeroAnimation";
import { ANIMATION_SPEED } from "../constants/game-world";
import { SceneRunner } from "../core/SceneRunner";
import { DEMO_SCENE } from "../constants/demo-scene";
import { FOOTBALL_SCENE } from "../constants/football-scene";
import { backgroundAssets } from "../helpers/assets";
import { generateShapeTexture, type ShapeName } from "../helpers/shapeFactory";
import { serializeWorldState } from "../llm/worldState";
import { generateScene } from "../llm/client";
import { HERO_FRAME_SIZE } from "../constants/game-world";
import type { Config } from "../helpers/anchorScanner";
import { OutlineFilter, GlowFilter } from 'pixi-filters';
import { ColorMatrixFilter } from 'pixi.js';
extend({ Container, Sprite, Graphics });

type AttachmentConfig = ReturnType<typeof Config>;
type FrameOffset = { x: number; y: number } | null;

interface IHeroProps {
  herotexture: Texture | null;
  setBackgroundTexture: (texture: Texture) => void;
  scannedAnchorConfig?: AttachmentConfig | null;
}

export const Animation = ({ herotexture, setBackgroundTexture, scannedAnchorConfig }: IHeroProps) => {
  if (!herotexture) return null;
  // const hasFetched = useRef(false);
  const sceneRef = useRef<SceneRunner | null>(null);
  const shadowGfx = useRef<Graphics | null>(null);
  const [entities, setEntities] = useState<Entity[]>([]);
  const { app } = useApplication();

  const { update: heroAnimUpdate } = useHeroAnimation({
    texture: herotexture,
    frameWidth: 64,
    frameHeight: 64,
    animationSpeed: ANIMATION_SPEED,
  });

  useEffect(() => {
    const scene = new SceneRunner(FOOTBALL_SCENE);

    // if (!hasFetched.current) {
    //   hasFetched.current = true;
    //   generateScene("a man is eating a banana.", serializeWorldState(scene.registry))
    //     .then(data => console.log("LLM Response:", data))
    //     .catch(err => console.error("LLM Error:", err));
    // }
    sceneRef.current = scene;

    const hero = scene.registry.get("hero1");
    if (hero) {
      hero.texture = herotexture;
      hero.currentanim = "IDLEDOWN";
      if (!hero.attachmentConfig) hero.attachmentConfig = {};
    }
    const hero2 = scene.registry.get("hero2");
    if (hero2) {
      hero2.texture = herotexture;
      hero2.currentanim = "IDLEDOWN";
      if (!hero2.attachmentConfig) hero2.attachmentConfig = {};
    }

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
          size: 64,
        });
      }
    }
    setEntities([...scene.registry.getAll()]);

    if (scannedAnchorConfig && Object.keys(scannedAnchorConfig).length > 0) {
      for (const entity of scene.registry.getAll()) {
        if (!entity.isObject && entity.attachmentConfig) {
          entity.attachmentConfig = {
            ...entity.attachmentConfig,
            ...scannedAnchorConfig,
          };
        }
      }
    }
    const unsubscribe = scene.registry.subscribe(() => {
      setEntities(scene.registry.getAll());
    });

    return () => {
      unsubscribe();
      scene.destroy();
    };
  }, [herotexture]);

  // useEffect(() => {
  //   const hero = sceneRef.current?.registry.get("hero");
  //   if (hero) {
  //     hero.texture = herotexture;
  //   }
  //   const rock = sceneRef.current?.registry.get("rock");
  //   if (rock) {
  //     rock.texture = rocktexture;
  //   }
  // }, [herotexture, rocktexture]);

  function updateEntityTransform(e: Entity) {
    if (e.parent) {
      let offset = e.localOffset || { x: 0, y: 0 };
      // console.log(e.localOffset)
      // console.log(e.attachmentPoint)
      if (e.attachmentPoint && e.parent.attachmentConfig) {
        // console.log(e.parent.attachmentConfig)
        const anim = e.parent.currentanim;
        // console.log(config, e)
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
        offset = { x: (rawOffset.x - half) * parentScale, y: (rawOffset.y - half) * parentScale };
      } else {
        const container = e.container.current;
        if (container) container.visible = true;
      }
      // console.log(offset)
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

      const g = shadowGfx.current;
      if (g) {
        g.clear();
        for (const e of scene.registry.getAll()) {
          if (!e.isObject) {
            const vScale = (e as any).visualScale || 1;
            const Y = e.y + (30 * (e.scale * vScale));
            g.ellipse(e.x, Y, 15 * e.scale, 5 * e.scale);
            g.fill({ color: 0x000000, alpha: 0.2 });
          }
        }
      }

      for (const e of scene.registry.getAll()) {
        updateEntityTransform(e);
        const sprite = e.sprite.current;
        const container = e.container.current;
        if (container) {
          if (e.parent) {
            e.zIndex = e.parent.zIndex + 1;
          } else {
            e.zIndex = Math.round(e.y + (e.isObject ? 0 : 32 * (e.scale * (e.visualScale || 1))));
          }
          container.zIndex = e.zIndex
        }
        if (e && sprite) {
          const filters = [];

          if (e.state.isSelected) {  //just in case if i have some usecase of this in any primitive
            filters.push(new OutlineFilter(2, 0x00ff00));
          }
          if (e.state.isMagic) {
            filters.push(new GlowFilter({ distance: 15, outerStrength: 2, color: 0x00ffff }));
          }
          if (e.state.isHit) {
            sprite.tint = 0xff8888;
          } else if (e.state.hp === 0) {
            const cm = new ColorMatrixFilter();
            cm.desaturate();
            filters.push(cm);
            sprite.tint = 0x888888;
          } else {
            sprite.tint = 0xffffff;
          }
          sprite.filters = filters.length > 0 ? filters : null;

          if (!e.isObject) {
            const mode = e.animMode ?? (!!e.state.isMoving || !!e.state.isJumping ? "loop" : "static");
            const { texture: frameTexture, frameIndex, finished, vScale, vOffset } = heroAnimUpdate(e.id, e.currentanim as any, mode);
            sprite.texture = frameTexture;
            sprite.scale.set(e.scale * vScale);
            sprite.y = vOffset;
            (e as any).visualScale = vScale;
            e.currentFrame = frameIndex;
            if (finished) {
              e.animFinished = true;
            }
          }
        }
      }
    }
    catch (e) {
      console.warn(e)
    }
  });

  return (
    <pixiContainer sortableChildren={true}>
      <pixiGraphics ref={shadowGfx} zIndex={0} draw={() => { }} />
      {entities.map((e, i) => (
        <pixiContainer key={i} ref={e.container}>
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
