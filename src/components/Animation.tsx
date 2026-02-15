import type { Entity } from "../types/Entity";
import { useRef, useEffect, useState } from "react";
import { Container, Sprite, Texture, Ticker, Assets } from "pixi.js";
import { extend, useTick } from "@pixi/react";
import { useHeroAnimation } from "../helpers/useHeroAnimation";
import { ANIMATION_SPEED } from "../constants/game-world";
import { SceneRunner } from "../core/SceneRunner";
import { DEMO_SCENE } from "../constants/demo-scene";
import { backgroundAssets } from "../helpers/assets";
extend({ Container, Sprite });

interface IHeroProps {
  herotexture: Texture | null;
  rocktexture: Texture | null;
  setBackgroundTexture: (texture: Texture) => void;
}

export const Animation = ({ herotexture, rocktexture, setBackgroundTexture }: IHeroProps) => {
  if (!herotexture || !rocktexture) return null;

  const sceneRef = useRef<SceneRunner | null>(null);
  const [entities, setEntities] = useState<Entity[]>([]);

  const { update: heroAnimUpdate } = useHeroAnimation({
    texture: herotexture,
    frameWidth: 64,
    frameHeight: 64,
    animationSpeed: ANIMATION_SPEED,
  });

  useEffect(() => {
    const scene = new SceneRunner(DEMO_SCENE);
    sceneRef.current = scene;

    const hero = scene.registry.get("hero");
    if (hero) {
      hero.texture = herotexture;
      hero.currentanim = "RIGHT";
    }

    const rock = scene.registry.get("rock");
    if (rock) {
      rock.texture = rocktexture;
    }

    const background = scene.getBackground();
    if (background) {
      Assets.load(backgroundAssets[background]).then((texture) => {
        setBackgroundTexture(texture as Texture)
      })
    }

    setEntities(scene.registry.getAll());

    const unsubscribe = scene.registry.subscribe(() => {
      setEntities(scene.registry.getAll());
    });

    return () => {
      unsubscribe();
      scene.destroy();
    };
  }, []);

  useEffect(() => {
    const hero = sceneRef.current?.registry.get("hero");
    if (hero) {
      hero.texture = herotexture;
    }
    const rock = sceneRef.current?.registry.get("rock");
    if (rock) {
      rock.texture = rocktexture;
    }
  }, [herotexture, rocktexture]);

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
