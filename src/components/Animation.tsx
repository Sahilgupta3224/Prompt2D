import type { Entity } from "../types/Entity";
import { useRef, useEffect, useState } from "react";
import { Container, Sprite, Texture, Ticker, Assets } from "pixi.js";
import { extend, useTick, useApplication } from "@pixi/react";
import { useHeroAnimation } from "../helpers/useHeroAnimation";
import { ANIMATION_SPEED } from "../constants/game-world";
import { SceneRunner } from "../core/SceneRunner";
import { DEMO_SCENE } from "../constants/demo-scene";
import { backgroundAssets } from "../helpers/assets";
import { generateShapeTexture, type ShapeName } from "../helpers/shapeFactory";
import { serializeWorldState } from "../llm/worldState";
import { generateScene } from "../llm/client";
import type { Config } from "../helpers/anchorScanner";
extend({ Container, Sprite });

type AttachmentConfig = ReturnType<typeof Config>;

interface IHeroProps {
  herotexture: Texture | null;
  setBackgroundTexture: (texture: Texture) => void;
  scannedAnchorConfig?: AttachmentConfig | null;
}

export const Animation = ({ herotexture, setBackgroundTexture, scannedAnchorConfig }: IHeroProps) => {
  if (!herotexture) return null;
  // const hasFetched = useRef(false);
  const sceneRef = useRef<SceneRunner | null>(null);
  const [entities, setEntities] = useState<Entity[]>([]);
  const { app } = useApplication();

  const { update: heroAnimUpdate } = useHeroAnimation({
    texture: herotexture,
    frameWidth: 64,
    frameHeight: 64,
    animationSpeed: ANIMATION_SPEED,
  });

  useEffect(() => {
    const scene = new SceneRunner(DEMO_SCENE);

    // if (!hasFetched.current) {
    //   hasFetched.current = true;
    //   generateScene("a man is eating a banana.", serializeWorldState(scene.registry))
    //     .then(data => console.log("LLM Response:", data))
    //     .catch(err => console.error("LLM Error:", err));
    // }
    sceneRef.current = scene;

    const hero = scene.registry.get("hero");
    if (hero) {
      hero.texture = herotexture;
      hero.currentanim = "RIGHT";
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
        if (config) {
          if (Array.isArray(config)) {
            offset = { x: config[frame % config.length].x * parentScale, y: config[frame % config.length].y * parentScale };
          } else {
            offset = { x: config.x * parentScale, y: config.y * parentScale };
          }
          // Offsets are raw frame pixels → multiply by effective visual scale.
          // parentScale = entity.scale * vScale so offset always matches rendering.
          // const rawOffset = Array.isArray(config)
          //   ? config[frame % config.length]
          //   : config;
          // if (rawOffset) {
          //   offset = { x: rawOffset.x * parentScale, y: rawOffset.y * parentScale };
          // }
        }
        // console.log(config, offset)
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
    try{
      const scene = sceneRef.current;
      if (!scene) return;
      scene.update(dt);

      for (const e of scene.registry.getAll()) {
        updateEntityTransform(e);
        const sprite = e.sprite.current;
        if (e && sprite && !e.isObject) {
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
    catch(e){
      console.warn(e)
    }
  });

  return (
    <pixiContainer>
      {[...entities]
        .sort((a, b) => a.zIndex - b.zIndex)
        .map((e, i) => (
          <pixiContainer key={i} ref={e.container} zIndex={e.zIndex}>
            <pixiSprite
              ref={e.sprite}
              texture={e.texture ?? undefined}
              scale={e.scale}
            />
          </pixiContainer>
        ))}
    </pixiContainer>
  );
};
