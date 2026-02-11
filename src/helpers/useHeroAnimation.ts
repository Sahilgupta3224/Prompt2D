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

  const getRowByDirection = (direction: Direction | null) => {
    switch (direction) {
      case "UP": return { row: 8, frames: 9 }
      case "LEFT": return { row: 9, frames: 9 }
      case "DOWN": return { row: 10, frames: 9 }
      case "RIGHT": return { row: 11, frames: 9 }
      case "DANCE": return { row: 2, frames: 9 }
      case "STILL": return { row: 10, frames: 9 }
      default: return { row: 0, frames: 7 }
    }
  }

  const update = (direction: Direction | null, moving: boolean) => {
    const { row, frames } = getRowByDirection(direction)
    // console.log(row)
    if (moving && direction !== "STILL") {
      elapsedRef.current += animationSpeed
      if (elapsedRef.current >= 1) {
        elapsedRef.current = 0
        frameRef.current = (frameRef.current + 1) % frames
      }
    } else {
      frameRef.current = 0
    }
    // console.log(`Frame: ${frameRef.current * frameWidth}`, row * frameHeight)

    texture = new Texture({
      source: texture.source,
      frame: new Rectangle(
        frameRef.current * frameWidth,
        row * frameHeight,
        frameWidth,
        frameHeight
      ),
    })
    // console.log(texture.frame)
    return { texture, frameIndex: frameRef.current }
  }

  return { update }
}