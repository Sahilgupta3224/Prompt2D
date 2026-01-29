import { useRef } from "react"
import { Texture, Rectangle } from "pixi.js"
import type { Direction } from "../../types/common"

export const useHeroAnimation = ({
  texture,
  frameWidth,
  frameHeight,
  totalFrames,
  animationSpeed,
}: {
  texture: Texture
  frameWidth: number
  frameHeight: number
  totalFrames: number
  animationSpeed: number
}) => {
  const frameRef = useRef(0)
  const elapsedRef = useRef(0)

  const getRowByDirection = (direction: Direction | null) => {
    switch (direction) {
      case "UP": return 0
      case "LEFT": return 0
      case "DOWN": return 5
      case "RIGHT": return 8
      default: return 20
    }
  }

  const update = (direction: Direction | null, moving: boolean) => {
    const row = getRowByDirection(direction)
    if (moving) {
      elapsedRef.current += animationSpeed
      if (elapsedRef.current >= 1) {
        elapsedRef.current = 0
        frameRef.current = (frameRef.current + 1) % totalFrames
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
    return texture
  }

  return { update }
}