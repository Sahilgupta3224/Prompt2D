import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, checkCanMove, handleMovement, moveByAngle, reachedDestination, angleToDirection } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";
import { playAnimation, stopAnimation } from "../../helpers/animationTools";

type MoveParams = { destination: { x: number; y: number }; speed?: number };

const MAX_DURATION = 20000;

export const MoveAction: ActionDefinition<MoveParams> = {
  enter: (entity, { destination }, _ctx, s) => {
    if (!entity || !destination) {
      s.finished = true;
      return;
    }

    if (isNaN(destination.x) || isNaN(destination.y) || isNaN(entity.x) || isNaN(entity.y)) {
      console.warn("[Move] NaN coordinates detected, skipping move");
      s.finished = true;
      return;
    }

    if (reachedDestination({ x: entity.x, y: entity.y }, destination, 2)) {
      s.finished = true;
      return;
    }

    s.finished = false;
    s.elapsed = 0;
    s.direction = null;
    s.targetPosition = null;
    s.moveStart = { x: entity.x, y: entity.y };
    entity.state.isMoving = true;
  },

  update: (entity, { destination, speed = MOVE_SPEED }, delta, _ctx, s) => {
    if (s.finished || !entity || !destination) return true;

    s.elapsed += delta * (1000 / 60);
    if (s.elapsed >= MAX_DURATION) {
      console.warn("[Move] Action timed out");
      return true;
    }
    if (reachedDestination({ x: entity.x, y: entity.y }, destination, 2)) {
      entity.x = destination.x;
      entity.y = destination.y;
      return true;
    }
    if (!s.direction) {
      const angle = calculateAngle(
        { x: entity.x, y: entity.y },
        destination
      );
      s.direction = {
        x: Math.cos(angle),
        y: Math.sin(angle),
      };
      playAnimation(entity, angleToDirection(angle));
    }
    if (!s.targetPosition) {
      const nextStep = moveByAngle(
        { x: entity.x, y: entity.y },
        s.direction,
        speed,
        delta
      );
      if (checkCanMove(nextStep)) {
        s.targetPosition = nextStep;
      } else {
        return true;
      }
    }

    if (s.targetPosition) {
      const { position: newPosition, completed } = handleMovement(
        { x: entity.x, y: entity.y },
        s.targetPosition,
        speed,
        delta
      );
      entity.x = newPosition.x;
      entity.y = newPosition.y;
      if (completed) {
        s.targetPosition = null;
      }
    }
    return false;
  },

  exit: (entity) => {
    if (!entity) return;
    entity.state.isMoving = false;
    delete entity.animMode;
    stopAnimation(entity);
  }
};