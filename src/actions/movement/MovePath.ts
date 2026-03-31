import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, checkCanMove, handleMovement, moveByAngle, reachedDestination, angleToDirection} from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";
import { playAnimation, stopAnimation } from "../../helpers/animationTools";

type MovePathParams = {
    path: Array<{ x: number; y: number }>;
    speed?: number;
    loop?: boolean;
};

const MAX_STUCK_DURATION = 30000;

export const MovePathAction: ActionDefinition<MovePathParams> = {
    enter: (entity, { path, speed = MOVE_SPEED, loop = false }, _ctx, s) => {
        if (!entity || !path || path.length === 0) {
            s.finished = true;
            return;
        }
        s.waypoints = path.filter(pt => typeof pt.x === "number" && typeof pt.y === "number" && !isNaN(pt.x) && !isNaN(pt.y));
        if (s.waypoints.length === 0) {
            s.finished = true;
            return;
        }
        s.currentIndex = 0;
        s.speed = Math.max(0, Math.min(20, speed));
        s.loop = loop;
        s.elapsedSinceProgress = 0;
        s.lastX = entity.x;
        s.lastY = entity.y;
        s.direction = null;
        s.targetPosition = null;
        entity.state.isMoving = true;
        s.finished = false;
    },

    update: (entity, _params, delta, _ctx, s) => {
        if (s.finished || !entity) return true;
        s.elapsedSinceProgress += delta * (1000 / 60);
        if (Math.hypot(entity.x - s.lastX, entity.y - s.lastY) > 0.1) {
            s.elapsedSinceProgress = 0;
            s.lastX = entity.x;
            s.lastY = entity.y;
        }
        if (s.elapsedSinceProgress >= MAX_STUCK_DURATION) {
            console.warn("[MovePath] Stalled for 30s, finishing.");
            return true;
        }
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
        if (reachedDestination({ x: entity.x, y: entity.y }, currentDestination, 3)) {
            s.currentIndex++;
            s.direction = null;
            s.targetPosition = null;
            if (s.currentIndex >= s.waypoints.length) {
                if (s.loop) {
                    s.currentIndex = 0;
                } else {
                    return true;
                }
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
            playAnimation(entity, angleToDirection(angle));
        }
        if (!s.targetPosition) {
            const nextStep = moveByAngle(
                { x: entity.x, y: entity.y },
                s.direction,
                s.speed,
                delta
            );
            if (checkCanMove(nextStep)) {
                s.targetPosition = nextStep;
            } else {
                s.currentIndex++;
                s.direction = null;
                s.targetPosition = null;
                return false;
            }
        }
        if (s.targetPosition) {
            const { position: newPosition, completed } = handleMovement(
                { x: entity.x, y: entity.y },
                s.targetPosition,
                s.speed,
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
        stopAnimation(entity);
    },
};
