import { useRef } from "react"
import { Texture, Rectangle } from "pixi.js"
import type { Direction } from "../types/common"

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
  const frameRef = useRef(0)
  const elapsedRef = useRef(0)
  const prevAnimRef = useRef<string | null>(null)
  // console.log()

  const getRowByDirection = (direction: Direction | null) => {
    switch (direction) {
      case "UP": return { row: 8, frames: 9 }
      case "LEFT": return { row: 9, frames: 9 }
      case "DOWN": return { row: 10, frames: 9 }
      case "RIGHT": return { row: 11, frames: 9 }
      case "DANCE": return { row: 2, frames: 9 }
      case "STILL": return { row: 10, frames: 9 }
      case "SIT": return { row: 19, frames: 13 }
      case "HIT": return {row: 20, frames: 6}
      default: return { row: 0, frames: 7 }
    }
  }

  const update = (direction: Direction | null, animMode: "loop" | "once" | "static" | "freeze" = "loop") => {
    const { row, frames } = getRowByDirection(direction)
    // console.log(direction)
    if (prevAnimRef.current !== direction) {
      frameRef.current = 0
      elapsedRef.current = 0
      prevAnimRef.current = direction
    }

    let finished = false

    if (animMode === "once") {
      // console.log(frameRef.current)
      if (frameRef.current < frames - 1) {
        elapsedRef.current += animationSpeed
        if (elapsedRef.current >= 1) {
          elapsedRef.current = 0
          frameRef.current++
        }
      } else {
        finished = true
      }
    } else if (animMode === "loop") {
      elapsedRef.current += animationSpeed
      if (elapsedRef.current >= 1) {
        elapsedRef.current = 0
        frameRef.current = (frameRef.current + 1) % frames
      }
    } else if (animMode === "freeze") {
      
    } else {
      frameRef.current = 0
    }

    texture = new Texture({
      source: texture.source,
      frame: new Rectangle(
        frameRef.current * frameWidth,
        row * frameHeight,
        frameWidth,
        frameHeight
      ),
    })
    return { texture, frameIndex: frameRef.current, finished }
  }

  return { update }
}