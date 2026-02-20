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
extend({ Container, Sprite });

interface IHeroProps {
  herotexture: Texture | null;
  setBackgroundTexture: (texture: Texture) => void;
}

export const Animation = ({ herotexture, setBackgroundTexture }: IHeroProps) => {
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
      if (e.attachmentPoint && e.parent.attachmentConfig) {
        const anim = e.parent.currentanim;
        const frame = e.parent.currentFrame || 0;
        const config = e.parent.attachmentConfig[anim]?.[e.attachmentPoint];
        if (config) {
          if (Array.isArray(config)) {
            offset = config[frame % config.length];
          } else {
            offset = config;
          }
        }
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
    const scene = sceneRef.current;
    if (!scene) return;
    const dt = ticker.deltaTime;

    scene.update(dt);

    for (const e of scene.registry.getAll()) {
      updateEntityTransform(e);
    }
    // console.log(scene.registry.getAll())
    const hero = scene.registry.get("hero");
    const heroSprite = hero?.sprite.current;

    if (hero && heroSprite) {
      const mode = hero.animMode ?? (!!hero.state.isMoving || !!hero.state.isJumping ? "loop" : "static");
      const { texture: frameTexture, frameIndex, finished } = heroAnimUpdate(hero.currentanim as any, mode);
      heroSprite.texture = frameTexture;
      hero.currentFrame = frameIndex;
      if (finished) {
        hero.animFinished = true;
      }
    }
  });

  return (
    <pixiContainer>
      {entities.map((e, i) => (
        <pixiContainer key={i} ref={e.container}>
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
