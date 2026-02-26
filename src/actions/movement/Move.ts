import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, checkCanMove, handleMovement, moveByAngle, reachedDestination, angleToDirection } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";
type MoveParams = { destination: { x: number; y: number }; };
import { playAnimation } from "../../helpers/animationTools";

export const MoveAction: ActionDefinition<MoveParams> = {

  enter: (entity, _params, _ctx, s) => {
    s.direction = null;
    s.targetPosition = null;
    s.moveStart = { x: entity.x, y: entity.y };
    entity.state.isMoving = true;
  },
  update: (entity, { destination }, delta, _ctx, s) => {
    if (!s.direction) {
      const angle = calculateAngle(
        { x: entity.x, y: entity.y },
        destination
      )

      s.direction = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      }
      playAnimation(entity, angleToDirection(angle));
    }
    if (!s.targetPosition) {
      const nextStep = moveByAngle(
        { x: entity.x, y: entity.y },
        s.direction,
        MOVE_SPEED,
        delta
      )

      if (checkCanMove(nextStep)) {
        s.targetPosition = nextStep
      }
    }
    if (s.targetPosition) {
      const { position: newPosition, completed } = handleMovement(
        { x: entity.x, y: entity.y },
        s.targetPosition,
        MOVE_SPEED,
        delta
      )
      entity.x = newPosition.x
      entity.y = newPosition.y
      if (completed) {
        s.targetPosition = null
      }
    }
    if (reachedDestination({ x: entity.x, y: entity.y }, destination)) {
      return true;
    }
    return false;
  },

  exit: (entity) => {
    entity.state.isMoving = false;
    delete entity.animMode;
  }
};