import type { Entity } from "../types/Entity";
import { useRef, useEffect, useState } from "react";
import { Container, Sprite, Texture, Ticker } from "pixi.js";
import { extend, useTick } from "@pixi/react";
extend({ Container, Sprite });

import { useHeroAnimation } from "../helpers/useHeroAnimation";
import { ANIMATION_SPEED, DEFAULT_X_POS } from "../constants/game-world";
import { HERO_ATTACHMENTS } from "../config/hero-attachments";
import { SceneRunner } from "../core/SceneRunner";
import type { SceneDefinition } from "../types/Scene";

interface IHeroProps {
  herotexture: Texture | null;
  rocktexture: Texture | null;
}

const DEMO_SCENE: SceneDefinition = {
  id: "demo",
  name: "Demo Scene",
  entities: [
    {
      id: "hero",
      position: { x: DEFAULT_X_POS, y: DEFAULT_X_POS },
      scale: 1,
      attachments: HERO_ATTACHMENTS,
    },
    {
      id: "rock",
      position: { x: 670, y: 50 },
      scale: 0.005,
    },
  ],
  timeline: {
    type: "sequence",
    children: [
      {
        type: "action",
        name: "move",
        params: { destination: { x: 200, y: 200 } },
      },
      {
        type: "action",
        name: "speak",
        params: { text: "Hello world!", duration: 2000 },
      },
      {
        type: "action",
        name: "emote",
        params: { emote: "happy", duration: 1000 },
      },
      {
        type: "action",
        name: "wait",
        params: { duration: 500 },
      },
      {
        type: "action",
        name: "grab",
        params: { objectId: "rock", attachmentPoint: "hand" },
      },
      {
        type: "action",
        name: "jump",
        params: { height: 50 },
      },
      {
        type: "action",
        name: "throw",
        params: { objectId: "rock", target: { x: 300, y: 300 }, arcHeight: 50 },
      },
    ],
  },
};

export const Animation = ({ herotexture, rocktexture }: IHeroProps) => {
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
    console.log(scene.registry.getAll())
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
