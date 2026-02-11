import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, checkCanMove, handleMovement, moveByAngle, reachedDestination, angleToDirection} from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";

type MovePathParams = {
    path: Array<{ x: number; y: number }>;
    speed?: number;
    loop?: boolean;
};

export const MovePathAction: ActionDefinition<MovePathParams> = {
    enter: (entity, { path, speed = MOVE_SPEED, loop = false }) => {
        entity.state.pathWaypoints = [...path];
        entity.state.pathCurrentIndex = 0;
        entity.state.pathSpeed = speed;
        entity.state.pathLoop = loop;
        entity.state.direction = null;
        entity.state.targetPosition = null;
        entity.state.isMoving = true;
    },

    update: (entity, { speed = MOVE_SPEED }, delta) => {
        const { pathWaypoints, pathCurrentIndex, pathLoop } = entity.state;

        if (pathCurrentIndex >= pathWaypoints.length) {
            if (pathLoop) {
                entity.state.pathCurrentIndex = 0;
                entity.state.direction = null;
                entity.state.targetPosition = null;
            } else {
                return true;
            }
        }

        const currentDestination = pathWaypoints[entity.state.pathCurrentIndex];

        if (reachedDestination({ x: entity.x, y: entity.y }, currentDestination)) {
            entity.state.pathCurrentIndex++;
            entity.state.direction = null;
            entity.state.targetPosition = null;

            if (entity.state.pathCurrentIndex >= pathWaypoints.length && !pathLoop) {
                return true;
            }

            return false;
        }

        if (!entity.state.direction) {
            const angle = calculateAngle(
                { x: entity.x, y: entity.y },
                currentDestination
            );
            entity.state.direction = {
                x: Math.cos(angle),
                y: Math.sin(angle),
            };
            entity.currentanim = angleToDirection(angle)
            console.log(entity.currentanim)
        }

        if (!entity.state.targetPosition) {
            const nextStep = moveByAngle(
                { x: entity.x, y: entity.y },
                entity.state.direction,
                speed,
                delta
            );

            if (checkCanMove(nextStep)) {
                entity.state.targetPosition = nextStep;
            }
        }

        if (entity.state.targetPosition) {
            const { position: newPosition, completed } = handleMovement(
                { x: entity.x, y: entity.y },
                entity.state.targetPosition,
                speed,
                delta
            );
            entity.x = newPosition.x;
            entity.y = newPosition.y;
            if (completed) {
                entity.state.targetPosition = null;
            }
        }

        return false;
    },

    exit: (entity) => {
        entity.state.isMoving = false;
        delete entity.state.pathWaypoints;
        delete entity.state.pathCurrentIndex;
        delete entity.state.pathSpeed;
        delete entity.state.pathLoop;
        delete entity.state.direction;
        delete entity.state.targetPosition;
    },
};
