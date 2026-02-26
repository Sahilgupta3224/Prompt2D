import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";

type FollowParams = {
    target: Entity;
    offset?: { x: number; y: number };
    smoothing?: number;
    maintainDistance?: number;
};

export const FollowAction: ActionDefinition<FollowParams> = {
    enter: (entity) => {
        entity.state.isMoving = true;
    },

    update: (entity, { target, offset = { x: 0, y: 0 }, smoothing = 0.9, maintainDistance }, delta) => {
        if (!target) {
            return true;
        }
        const targetX = target.x + offset.x;
        const targetY = target.y + offset.y;
        if (maintainDistance !== undefined) {
            const dx = targetX - entity.x;
            const dy = targetY - entity.y;
            const currentDistance = Math.sqrt(dx * dx + dy * dy);

            if (currentDistance <= maintainDistance) {
                return false;
            }
        }
        const lerpFactor = 1 - Math.pow(smoothing, delta);
        entity.x += (targetX - entity.x) * lerpFactor;
        entity.y += (targetY - entity.y) * lerpFactor;
        return false;
    },

    exit: (entity) => {
        entity.state.isMoving = false;
    },
};
