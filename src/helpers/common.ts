import { GAME_HEIGHT, GAME_WIDTH, OFFSET_X, OFFSET_Y } from '../constants/game-world'
import type { IPosition } from '../types/common'

export const calculateCanvasSize = () => {
  const width = window.innerWidth
  const height = window.innerHeight
  return { width, height }
}

function _cardinal(angle: number): "UP" | "DOWN" | "LEFT" | "RIGHT" {
  const deg = angle * 180 / Math.PI
  if (deg >= -45 && deg < 45) return "RIGHT"
  if (deg >= 45 && deg < 135) return "DOWN"
  if (deg >= -135 && deg < -45) return "UP"
  return "LEFT"
}

export const angleToDirection = (angle: number): string => {
  return "MOVE" + _cardinal(angle)
}

export const angleToRunDirection = (angle: number): string => {
  return "RUN" + _cardinal(angle)
}

export const angleToIdleDirection = (angle: number): string => {
  return "IDLE" + _cardinal(angle)
}

export const angleToJumpDirection = (angle: number): string => {
  return "JUMP" + _cardinal(angle)
}

export const angleToSitDirection = (angle: number): string => {
  return "SIT" + _cardinal(angle)
}

export const angleToAttackDirection = (
  angle: number,
  weapon: "melee" | "punch" | "gun" | "thrust" | "spell" = "melee"
): string => {
  const dir = _cardinal(angle)
  switch (weapon) {
    case "punch": return "PUNCH" + dir
    case "gun": return "SHOOT" + dir
    case "thrust": return "THRUST" + dir
    case "spell": return "SPELLCAST" + dir
    default: return "SLASH" + dir  // melee
  }
}

export const angleToCombatIdleDirection = (angle: number): string => {
  return "COMBATIDLE" + _cardinal(angle)
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
  if (
    target.x < OFFSET_X ||
    target.y < OFFSET_Y ||
    target.x > OFFSET_X + GAME_WIDTH ||
    target.y > OFFSET_Y + GAME_HEIGHT
  ) {
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
  const step = moveSpeed * 32 * delta
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
