import { COLLISION_MAP } from '../constants/collision-map'
import { COLS, TILE_SIZE } from '../constants/game-world'
import type { Direction, IPosition } from '../types/common'

export const calculateCanvasSize = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  return { width, height }
}

export const calculateNewTarget = (
  x: number,
  y: number,
  direction: Direction
): IPosition => {
  return {
    x:
      (x / TILE_SIZE) * TILE_SIZE +
      (direction === 'LEFT'
        ? -TILE_SIZE
        : direction === 'RIGHT'
        ? TILE_SIZE
        : 0),
    y:
      (y / TILE_SIZE) * TILE_SIZE +
      (direction === 'UP' ? -TILE_SIZE : direction === 'DOWN' ? TILE_SIZE : 0),
  }
}

export const moveByAngle = (
  current: IPosition,
  direction: { x: number; y: number },
  speed: number,
  delta: number
): IPosition => {
  return {
    x: current.x + direction.x * speed * delta,
    y: current.y + direction.y * speed * delta,
  }
}

export const reachedDestination = (
  current: IPosition,
  destination: IPosition,
  threshold = 2
) => {
  return (
    Math.hypot(
      destination.x - current.x,
      destination.y - current.y
    ) <= threshold
  )
}

export const checkCanMove = (target: IPosition) => {
  const row = Math.floor(target.y / TILE_SIZE)
  const col = Math.floor(target.x / TILE_SIZE)
  const index = COLS * row + col

  if (index < 0 || index >= COLLISION_MAP.length) {
    return false
  }

  return true
}

export const calculateAngle = (
  from: { x: number; y: number },
  to: { x: number; y: number }
) => {
  return Math.atan2(to.y - from.y, to.x - from.x)
}


export const moveTowards = (
  current: number,
  target: number,
  maxStep: number
) => {
  return (
    current +
    Math.sign(target - current) * Math.min(Math.abs(target - current), maxStep)
  )
}

export const continueMovement = (
  currentPosition: IPosition,
  targetPosition: IPosition,
  step: number
): IPosition => {
  return {
    x: moveTowards(currentPosition.x, targetPosition.x, step),
    y: moveTowards(currentPosition.y, targetPosition.y, step),
  }
}

export const handleMovement = (
  currentPosition: IPosition,
  targetPosition: IPosition,
  moveSpeed: number,
  delta: number
) => {
  // console.log(currentPosition)
  // console.log(targetPosition)
  const step = moveSpeed * TILE_SIZE * delta
  const distance = Math.hypot(
    targetPosition.x - currentPosition.x,
    targetPosition.y - currentPosition.y
  )

  if (distance <= step) {
    return {
      position: targetPosition,
      completed: true,
    }
  }

  return {
    position: continueMovement(currentPosition, targetPosition, step),
    completed: false,
  }
}
