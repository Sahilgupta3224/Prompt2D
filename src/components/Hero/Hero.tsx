import type { ActionDefinition } from "../../types/Action";
import { MoveAction } from "../../actions/Move";
import type { Entity } from "../../types/Entity";
import { useRef, useEffect, useState, createRef } from "react";
import { Assets, Container, Sprite, Texture, Ticker } from "pixi.js";
import { extend, useTick } from "@pixi/react";
extend({ Container, Sprite });

import { useHeroAnimation } from "./useHeroAnimation";
import objectAsset from "../../assets/rock.png";
import {
  ANIMATION_SPEED,
  DEFAULT_X_POS,
} from "../../constants/game-world";
import { GrabAction } from "../../actions/Grab";

interface IHeroProps {
  herotexture: Texture | null;
  onMove: (gridX: number, gridY: number) => void;
  projectileRef: React.MutableRefObject<any>;
}

export const Hero = ({ herotexture, onMove, projectileRef }: IHeroProps) => {
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
  });
  const rockRef = useRef<Entity>({
    x: DEFAULT_X_POS + 100,
    y: DEFAULT_X_POS,
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

  const runAction = (def: ActionDefinition<any>, params: any) => {
    def.enter?.(hero, params);
    activeActions.current.push({ def, params })
  };

  const { update: heroAnimUpdate } = useHeroAnimation({
    texture: herotexture,
    frameWidth: 64,
    frameHeight: 64,
    totalFrames: 9,
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
    runAction(MoveAction, { destination: { x: 370, y: 120 } });
  }, []);

  useEffect(() => {
    if (!rock.texture) return
    const i = setTimeout(() => {
      runAction(GrabAction, {
        object: rock,
        localOffset: { x: 40, y: 35 },
      })
    }, 50)

    return () => clearTimeout(i)
  }, [rock.texture])


  function updateEntityTransform(e: Entity) {
    if (e.parent && e.localOffset) {
      e.x = e.parent.x + e.localOffset.x;
      e.y = e.parent.y + e.localOffset.y;
    }
    const c = e.container.current;
    if (c) {
      c.x = e.x;
      c.y = e.y;
    }
  }

  useTick((ticker: Ticker) => {
    const dt = ticker.deltaTime;

    activeActions.current = activeActions.current.filter(a => {
      const done = a.def.update(hero, a.params, dt)
      if (done) {
        a.def.exit?.(hero, a.params)
      }
      return !done
    })

    for (const e of entitiesRef.current) {
      updateEntityTransform(e);
    }

    const heroSprite = hero.sprite.current;
    if (heroSprite) {
      const frameTexture = heroAnimUpdate(hero.currentanim as any, !!hero.state.isMoving);
      heroSprite.texture = frameTexture;
    }

    // const rockSprite = rock.sprite.current;
    // if (rockSprite && rock.texture) {
    //   if (rockSprite.texture !== rock.texture) {
    //     rockSprite.texture = rock.texture;
    //   }
    // }

    // onMove(Math.floor(hero.x / 64), Math.floor((hero.y || 0) / 64));
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
