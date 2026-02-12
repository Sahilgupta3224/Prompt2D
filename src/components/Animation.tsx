import type { ActionDefinition } from "../types/Action";
import type { Entity } from "../types/Entity";
import { useRef, useEffect, useState, createRef } from "react";
import { Assets, Container, Sprite, Texture, Ticker } from "pixi.js";
import { extend, useTick } from "@pixi/react";
extend({ Container, Sprite });

import { useHeroAnimation } from "../helpers/useHeroAnimation";
import objectAsset from "../assets/rock.png";
import {
  ANIMATION_SPEED,
  DEFAULT_X_POS,
} from "../constants/game-world";

import { TimelineRunner } from "../executor/TimelineRunner";
import type { TimelineNode } from "../types/Timeline";
import { HERO_ATTACHMENTS } from "../config/hero-attachments";

interface IHeroProps {
  herotexture: Texture | null;
}

export const Animation = ({ herotexture }: IHeroProps) => {
  if (!herotexture) return null;

  const heroRef = useRef<Entity>({
    x: DEFAULT_X_POS,
    y: DEFAULT_X_POS,
    vx: 0,
    vy: 0,
    scale: 1,
    sprite: createRef<Sprite | null>(),
    container: createRef<Container | null>(),
    texture: herotexture,
    currentanim: "RIGHT",
    state: {},
    parent: null,
    attachmentConfig: HERO_ATTACHMENTS,
    currentFrame: 0,
  });
  const rockRef = useRef<Entity>({
    x: 670,
    y: 50,
    vx: 0,
    vy: 0,
    scale: 0.005,
    sprite: createRef<Sprite | null>(),
    container: createRef<Container | null>(),
    texture: null,
    currentanim: "",
    state: {},
    parent: null,
  });

  const hero = heroRef.current;
  const rock = rockRef.current;
  const entitiesRef = useRef<Entity[]>([heroRef.current, rockRef.current]);

  const activeActions = useRef<
    { def: ActionDefinition<any>; params: any }[]
  >([])

  const runnerRef = useRef<TimelineRunner | null>(null);

  const { update: heroAnimUpdate } = useHeroAnimation({
    texture: herotexture,
    frameWidth: 64,
    frameHeight: 64,
    animationSpeed: ANIMATION_SPEED,
  });

  const [rockLoaded, setRockLoaded] = useState(false);
  useEffect(() => {
    Assets.load(objectAsset).then((t) => {
      rock.texture = t as Texture;
      setRockLoaded(true);
    });
  }, []);

  useEffect(() => {
    hero.texture = herotexture;
  }, [herotexture]);

  useEffect(() => {
    const plan: TimelineNode = {
      type: "sequence",
      children: [
        {
          type: "action",
          name: "move",
          params: { destination: { x: 200, y: 200 } }
        },
        {
          type: "action",
          name: "grab",
          params:{object:rock,attachmentPoint:"hand"}
        },
        {
          type: "action",
          name: "jump",
          params: { height: 150, duration: 1000 }
        },
        {
          type: "action",
          name: "throw",
          params:{object:rock,target:{x:300,y:300}, arcHeight:150}
        },
        // {
        //   type: "action",
        //   name: "detach",
        //   params:{object:rock}
        // },
        // {
        //   type: "action",
        //   name: "wait",
        //   params: { duration: 500 }
        // },
        // {
        //   type: "action",
        //   name: "move",
        //   params: { destination: { x: 500, y: 300 } }
        // }
      ]
    };

    runnerRef.current = new TimelineRunner(plan, hero);
  }, []);

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
    const dt = ticker.deltaTime;

    if (runnerRef.current) {
      runnerRef.current.update(dt);
    } else {
      activeActions.current = activeActions.current.filter(a => {
        const done = a.def.update(hero, a.params, dt)
        if (done) {
          a.def.exit?.(hero, a.params)
        }
        return !done
      })
    }

    for (const e of entitiesRef.current) {
      updateEntityTransform(e);
    }

    const heroSprite = hero.sprite.current;
    if (heroSprite) {
      const { texture: frameTexture, frameIndex } = heroAnimUpdate(hero.currentanim as any, !!hero.state.isMoving || !!hero.state.isJumping);
      heroSprite.texture = frameTexture;
      hero.currentFrame = frameIndex;
    }
  });

  return (
    <pixiContainer>
      {entitiesRef.current.map((e, i) => (
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
