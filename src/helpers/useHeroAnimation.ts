import { useRef } from "react"
import { Texture, Rectangle } from "pixi.js"
import type { Direction } from "../types/common"

interface AnimState {
  frame: number
  elapsed: number
  prevAnim: string | null
}

interface RowConfig {
  row: number
  frames: number
  speed?: number
  h?: number
  vScale?: number
  vOffset?: number
}

const getRowByDirection = (direction: Direction | null): RowConfig => {
  const aiScale = 0.75;
  const aiOffset = 14;

  switch (direction) {
    case "SPELLCASTUP": return { row: 0, frames: 7, speed: 0.5 }
    case "SPELLCASTLEFT": return { row: 1, frames: 7, speed: 0.5 }
    case "SPELLCASTDOWN": return { row: 2, frames: 7, speed: 0.5 }
    case "SPELLCASTRIGHT": return { row: 3, frames: 7, speed: 0.5 }
    case "THRUSTUP": return { row: 4, frames: 8 }
    case "THRUSTLEFT": return { row: 5, frames: 8 }
    case "THRUSTDOWN": return { row: 6, frames: 8 }
    case "THRUSTRIGHT": return { row: 7, frames: 8 }
    case "MOVEUP": return { row: 8, frames: 9 }
    case "MOVELEFT": return { row: 9, frames: 9 }
    case "MOVEDOWN": return { row: 10, frames: 9 }
    case "MOVERIGHT": return { row: 11, frames: 9 }
    case "SLASHUP": return { row: 12, frames: 6 }
    case "SLASHLEFT": return { row: 13, frames: 6 }
    case "SLASHDOWN": return { row: 14, frames: 6 }
    case "SLASHRIGHT": return { row: 15, frames: 6 }
    case "SHOOTUP": return { row: 16, frames: 10 }
    case "SHOOTLEFT": return { row: 17, frames: 10 }
    case "SHOOTDOWN": return { row: 18, frames: 10 }
    case "SHOOTRIGHT": return { row: 19, frames: 10 }
    case "HURT": return { row: 20, frames: 6 }
    case "CLIMBUP": return { row: 21, frames: 6 }
    case "IDLEUP": return { row: 22, frames: 2, speed: 0.2 }
    case "IDLELEFT": return { row: 23, frames: 2, speed: 0.2 }
    case "IDLEDOWN": return { row: 24, frames: 2, speed: 0.2 }
    case "IDLERIGHT": return { row: 25, frames: 2, speed: 0.2 }
    case "JUMPUP": return { row: 26, frames: 5 }
    case "JUMPLEFT": return { row: 27, frames: 5 }
    case "JUMPDOWN": return { row: 28, frames: 5 }
    case "JUMPRIGHT": return { row: 29, frames: 5 }
    case "SITUP": return { row: 30, frames: 3 }
    case "SITLEFT": return { row: 31, frames: 3 }
    case "SITDOWN": return { row: 32, frames: 3 }
    case "SITRIGHT": return { row: 33, frames: 3 }
    case "EMOTE1UP": return { row: 34, frames: 3 }
    case "EMOTE1LEFT": return { row: 35, frames: 3 }
    case "EMOTE1DOWN": return { row: 36, frames: 3 }
    case "EMOTE1RIGHT": return { row: 37, frames: 3 }
    case "RUNUP": return { row: 38, frames: 8 }
    case "RUNLEFT": return { row: 39, frames: 8 }
    case "RUNDOWN": return { row: 40, frames: 8 }
    case "RUNRIGHT": return { row: 41, frames: 8 }
    case "COMBATIDLEUP": return { row: 42, frames: 2 }
    case "COMBATIDLELEFT": return { row: 43, frames: 2 }
    case "COMBATIDLEDOWN": return { row: 44, frames: 2 }
    case "COMBATIDLERIGHT": return { row: 45, frames: 2 }
    case "PUNCHUP": return { row: 50, frames: 6 }
    case "PUNCHLEFT": return { row: 51, frames: 6 }
    case "PUNCHDOWN": return { row: 52, frames: 6 }
    case "PUNCHRIGHT": return { row: 53, frames: 6 }
    case "PULLLEFT": return { row: 54, frames: 9, vScale: aiScale, vOffset: aiOffset }
    case "PULLRIGHT": return { row: 55, frames: 9, vScale: aiScale, vOffset: aiOffset }
    case "PUSHLEFT": return { row: 56, frames: 9, vScale: aiScale, vOffset: aiOffset }
    case "PUSHRIGHT": return { row: 57, frames: 9, vScale: aiScale, vOffset: aiOffset }
    case "DANCE": return { row: 2, frames: 9 }
    default: return { row: 24, frames: 2 }
  }
}

export const useHeroAnimation = ({
  texture,
  frameWidth,
  frameHeight,
  animationSpeed,
}: {
  texture: Texture
  frameWidth: number
  frameHeight: number
  animationSpeed: number
}) => {
  const statesRef = useRef<Map<string, AnimState>>(new Map())
  const textureCache = useRef<Map<string, Texture>>(new Map())

  const getOrCreateState = (entityId: string): AnimState => {
    if (!statesRef.current.has(entityId)) {
      statesRef.current.set(entityId, { frame: 0, elapsed: 0, prevAnim: null })
    }
    return statesRef.current.get(entityId)!
  }

  const update = (
    entityId: string,
    direction: Direction | null,
    animMode: "loop" | "once" | "static" | "freeze" = "loop"
  ) => {
    const state = getOrCreateState(entityId)
    const config = getRowByDirection(direction)
    const { row, frames, h = frameHeight, speed } = config;

    if (state.prevAnim !== direction) {
      state.frame = 0
      state.elapsed = 0
      state.prevAnim = direction
    }

    let finished = false

    if (animMode === "once") {
      if (state.frame < frames - 1) {
        state.elapsed += animationSpeed * (speed ?? 1)
        if (state.elapsed >= 1) {
          state.elapsed = 0
          state.frame++
        }
      } else {
        finished = true
      }
    }
    // else if (animMode === "loop") {
    //   state.elapsed += animationSpeed * (speed ?? 1)
    //   if (state.elapsed >= 1) {
    //     state.elapsed = 0
    //     state.frame = (state.frame + 1) % frames
    //   }
    // } 
    else if (animMode === "freeze") {
      // Keep current frame
    } else {
      var f = 0;
      f++;
      state.elapsed += animationSpeed * (speed ?? 1)
      console.log(row)
      // console.log(f)
      if (state.elapsed >= 1) {
        f = 0;
        state.elapsed = 0
        state.frame = (state.frame + 1) % frames
      }
    }

    const cacheKey = `${texture.uid}_${row}_${state.frame}`;
    let frameTexture = textureCache.current.get(cacheKey);

    if (!frameTexture) {
      frameTexture = new Texture({
        source: texture.source,
        frame: new Rectangle(
          state.frame * frameWidth,
          row * frameHeight,
          frameWidth,
          h
        ),
      });
      textureCache.current.set(cacheKey, frameTexture);
    }

    return {
      texture: frameTexture,
      frameIndex: state.frame,
      finished,
      vScale: config.vScale ?? 1,
      vOffset: config.vOffset ?? 0
    }
  }

  return { update }
}