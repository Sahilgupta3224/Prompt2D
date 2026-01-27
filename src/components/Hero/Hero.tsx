import { useRef, useEffect, useState } from 'react'
import {
  Assets,
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
import objectAsset from '../../assets/rock.png'

interface IHeroProps {
  texture: Texture | null
  onMove: (gridX: number, gridY: number) => void
  projectileRef: React.MutableRefObject<any>
}

export const Hero = ({ texture, onMove, projectileRef }: IHeroProps) => {
  if (!texture) {
    return null
  }
  const finalDestination = useRef<{ x: number; y: number } | null>({
    x: 320,
    y: 420,
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
  }, [])
  const [isHolding, setIsHolding] = useState(true)
  const handOffset = { x:25, y: 15 }
  const position = useRef({ x: DEFAULT_X_POS, y: DEFAULT_Y_POS })
  const targetPosition = useRef<{ x: number; y: number } | null>(null)
  const isMoving = useRef(false)
  const heldObjectTexture = useRef<Texture | null>(null)

  const { update } = useHeroAnimation({
    texture,
    frameWidth: 64,
    frameHeight: 64,
    totalFrames: 9,
    animationSpeed: ANIMATION_SPEED,
  })
  const frameTexture = useRef(texture)

  useEffect(() => {
    onMove(position.current.x, position.current.y)
  }, [onMove])

  useEffect(() => {
    Assets.load(objectAsset).then((t) => {
      heldObjectTexture.current = t as Texture
    })
  }, [])

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
      if (checkCanMove(nextStep)) {
      targetPosition.current = nextStep
      }
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
        const { x, y } = position.current
        onMove(x, y)
        targetPosition.current = null
        isMoving.current = false
      }
    }
    if (
      reachedDestination(position.current, finalDestination.current)
    ) {
      finalDestination.current = null
      frameTexture.current = update("RIGHT", false)
    }
    else{
      frameTexture.current = update("RIGHT", true)
    }
  })

  const throwToTarget = (target: { x: number; y: number }) => {
  if (!isHolding || !heldObjectTexture.current) return
  const start = {
    x: position.current.x + handOffset.x,
    y: position.current.y + handOffset.y,
  }
  console.log(start)
  const gravity = 0.6
  const flightTime = 50
  const vx = (target.x - start.x) / flightTime
  const vy =
    (target.y - start.y - 0.5 * gravity * flightTime * flightTime) /
    flightTime
    console.log(start)
  projectileRef.current = {
    dx:target.x,
    dy:target.y,
    x: start.x,
    y: start.y,
    vx,
    vy,
    gravity,
    rotation: 0,
    texture: heldObjectTexture.current,
    alive: true,
  }
  console.log(projectileRef.current)
  setIsHolding(false)
}

useEffect(() => {
  const onKey = (e: KeyboardEvent) => {
    if (e.code === "Space" && !isMoving.current) {
      console.log("pressed")
      throwToTarget({ x: 320, y: 220 })
    }
  }
  console.log("adding listener")

  window.addEventListener("keydown", onKey)
  return () => window.removeEventListener("keydown", onKey)
}, [])

  return (
    <pixiContainer x={position.current.x}
      y={position.current.y}>
      <pixiSprite
        texture={frameTexture.current}
        scale={0.8}
        anchor={{ x: 0.25, y: 0.5 }}
      />
      {isHolding && heldObjectTexture.current && (
           <pixiSprite 
              texture={heldObjectTexture.current}
              x={handOffset.x}
              y={handOffset.y} 
              anchor={0.5}
              scale={0.005}
           />
        )}
    </pixiContainer>
  )
}