import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, checkCanMove, handleMovement, moveByAngle, reachedDestination, angleToDirection } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";

type MovePathParams = {
    path: Array<{ x: number; y: number }>;
    speed?: number;
    loop?: boolean;
};

export const MovePathAction: ActionDefinition<MovePathParams> = {
    enter: (entity, { path, speed = MOVE_SPEED, loop = false }, _ctx, s) => {
        s.waypoints = [...path];
        s.currentIndex = 0;
        s.speed = speed;
        s.loop = loop;
        s.direction = null;
        s.targetPosition = null;
        entity.state.isMoving = true;
    },

    update: (entity, { speed = MOVE_SPEED }, delta, _ctx, s) => {
        if (s.currentIndex >= s.waypoints.length) {
            if (s.loop) {
                s.currentIndex = 0;
                s.direction = null;
                s.targetPosition = null;
            } else {
                return true;
            }
        }

        const currentDestination = s.waypoints[s.currentIndex];

        if (reachedDestination({ x: entity.x, y: entity.y }, currentDestination)) {
            s.currentIndex++;
            s.direction = null;
            s.targetPosition = null;

            if (s.currentIndex >= s.waypoints.length && !s.loop) {
                return true;
            }

            return false;
        }

        if (!s.direction) {
            const angle = calculateAngle(
                { x: entity.x, y: entity.y },
                currentDestination
            );
            s.direction = {
                x: Math.cos(angle),
                y: Math.sin(angle),
            };
            entity.currentanim = angleToDirection(angle);
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
        entity.state.isMoving = false;
    },
};
