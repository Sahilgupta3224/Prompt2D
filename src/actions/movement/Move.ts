import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, checkCanMove, handleMovement, moveByAngle, reachedDestination, angleToDirection } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";
type MoveParams = { destination: { x: number; y: number }; };

export const MoveAction: ActionDefinition<MoveParams> = {

  enter: (entity) => {
    entity.state.direction = null
    entity.state.targetPosition = null
    entity.state.moveStart = { x: entity.x, y: entity.y };
    entity.state.isMoving = true;
  },
  update: (entity, { destination }, delta) => {
    if (!entity.state.direction) {
      const angle = calculateAngle(
        { x: entity.x, y: entity.y },
        destination
      )

      entity.state.direction = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      }
      entity.currentanim = angleToDirection(angle)
      console.log(entity.currentanim)
    }
    if (!entity.state.targetPosition) {
      const nextStep = moveByAngle(
        { x: entity.x, y: entity.y },
        entity.state.direction,
        MOVE_SPEED,
        delta
      )

      if (checkCanMove(nextStep)) {
        entity.state.targetPosition = nextStep
      }
    }
    if (entity.state.targetPosition) {
      const { position: newPosition, completed } = handleMovement(
        { x: entity.x, y: entity.y },
        entity.state.targetPosition,
        MOVE_SPEED,
        delta
      )
      entity.x = newPosition.x
      entity.y = newPosition.y
      if (completed) {
        entity.state.targetPosition = null
      }
    }
    if (reachedDestination({ x: entity.x, y: entity.y }, destination)) {
      return true;
    }
    return false;
  },

  exit: (entity) => {
    entity.state.isMoving = false
    delete entity.state.direction
    delete entity.state.targetPosition
    delete entity.state.moveStart
  }
};