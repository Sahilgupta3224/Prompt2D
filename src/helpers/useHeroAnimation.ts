import { useRef } from "react"
import { Texture, Rectangle } from "pixi.js"
import type { Direction } from "../types/common"

interface AnimState {
  frame: number
  elapsed: number
  prevAnim: string | null
}

const getRowByDirection = (direction: Direction | null) => {
  switch (direction) {
    case "UP": return { row: 8, frames: 9 }
    case "LEFT": return { row: 9, frames: 9 }
    case "DOWN": return { row: 10, frames: 9 }
    case "RIGHT": return { row: 11, frames: 9 }
    case "DANCE": return { row: 2, frames: 9 }
    case "STILL": return { row: 10, frames: 9 }
    case "SIT": return { row: 19, frames: 13 }
    case "HIT": return { row: 20, frames: 6 }
    default: return { row: 0, frames: 7 }
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
    const { row, frames } = getRowByDirection(direction)

    if (state.prevAnim !== direction) {
      state.frame = 0
      state.elapsed = 0
      state.prevAnim = direction
    }

    let finished = false

    if (animMode === "once") {
      if (state.frame < frames - 1) {
        state.elapsed += animationSpeed
        if (state.elapsed >= 1) {
          state.elapsed = 0
          state.frame++
        }
      } else {
        finished = true
      }
    } else if (animMode === "loop") {
      state.elapsed += animationSpeed
      if (state.elapsed >= 1) {
        state.elapsed = 0
        state.frame = (state.frame + 1) % frames
      }
    } else if (animMode === "freeze") {
    } else {
      state.frame = 0
    }

    const frameTexture = new Texture({
      source: texture.source,
      frame: new Rectangle(
        state.frame * frameWidth,
        row * frameHeight,
        frameWidth,
        frameHeight
      ),
    })

    return { texture: frameTexture, frameIndex: state.frame, finished }
  }

  return { update }
}