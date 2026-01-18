import { useRef, useEffect } from 'react'
import {
  Container,
  Graphics,
  Sprite,
  Texture,
  Ticker,
} from 'pixi.js'
import {
  extend, useTick
} from '@pixi/react'
extend({
  Container,
  Graphics,
  Sprite,
  Texture
})
import {
  ANIMATION_SPEED,
  DEFAULT_X_POS,
  DEFAULT_Y_POS,
  MOVE_SPEED,
} from '../../constants/game-world'
import {
  calculateAngle,
  checkCanMove,
  handleMovement,
  moveByAngle,
  reachedDestination,
} from '../../helpers/common'
import { useHeroAnimation } from './useHeroAnimation'

interface IHeroProps {
  texture: Texture | null
}

export const Hero = ({ texture }: IHeroProps) => {
  if (!texture) {
    return null
  }
  const finalDestination = useRef<{ x: number; y: number } | null>({
    x: 350,
    y: 200,
  })
  const directionVector = useRef({ x: 0, y: 0 })
  useEffect(() => {
    if (!finalDestination.current) return
    const angle = calculateAngle(
      position.current,
      finalDestination.current
    )

    directionVector.current = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    }
    console.log(angle)
    console.log(directionVector)
  }, [])
  const position = useRef({ x: DEFAULT_X_POS, y: DEFAULT_Y_POS })
  const targetPosition = useRef<{ x: number; y: number } | null>(null)
  const isMoving = useRef(false)

  const { update } = useHeroAnimation({
    texture,
    frameWidth: 64,
    frameHeight: 64,
    totalFrames: 9,
    animationSpeed: ANIMATION_SPEED,
  })
  const frameTexture = useRef(texture)

  useTick((ticker: Ticker) => {
    if(!finalDestination.current){
      return
    }
    const delta = ticker.deltaTime
    if (!targetPosition.current) {
      const nextStep = moveByAngle(
        position.current,
        directionVector.current,
        MOVE_SPEED * 32,
        delta
      )

      // if (checkCanMove(nextStep)) {
      targetPosition.current = nextStep
      // }
    }

    if (targetPosition.current) {
      const { position: newPosition, completed } = handleMovement(
        position.current,
        targetPosition.current,
        MOVE_SPEED,
        delta
      )

      position.current = newPosition
      isMoving.current = true

      if (completed) {
        targetPosition.current = null
        isMoving.current = false
      }
    }
    if (
      reachedDestination(position.current, finalDestination.current)
    ) {
      console.log("hurray")
      finalDestination.current = null
      frameTexture.current = update("RIGHT", false)
    }
    else{
      frameTexture.current = update("RIGHT", true)
    }
  })
  return (
    <pixiContainer>
      <pixiSprite
        texture={frameTexture.current}
        x={position.current.x}
        y={position.current.y}
        scale={0.8}
        anchor={{ x: 0.25, y: 0.5 }}
      />
    </pixiContainer>
  )
}
