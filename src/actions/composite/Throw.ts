import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";

type ThrowParams = {
    object: Entity;
    target: { x: number; y: number };
    arcHeight: number;
    gravity?: number;
};

export const ThrowAction: ActionDefinition<ThrowParams> = {
    enter: (entity, { object, target, arcHeight, gravity = 2000 }) => {
        object.parent = null;
        delete object.localOffset;
        delete object.attachmentPoint;
        delete entity.state.grabbedObject;

        const startX = object.x;
        const startY = object.y;
        const endX = target.x;
        const endY = target.y;
        const peakY = Math.min(startY, endY) - arcHeight;
        const vy = -Math.sqrt(2 * gravity * (startY - peakY));
        const tUp = -vy / gravity;
        const tDown = Math.sqrt(2 * (endY - peakY) / gravity);
        const t = tUp + tDown;
        const vx = (endX - startX) / t;

        object.vx = vx;
        object.vy = vy;
        entity.state.throwGravity = gravity;
        entity.state.throwElapsed = 0;
        entity.state.throwDuration = t;
        entity.state.throwTarget = target;
    },

    update: (entity, { object }, dt) => {
        const dtSeconds = dt / 60;

        entity.state.throwElapsed += dtSeconds;

        object.vy += entity.state.throwGravity * dtSeconds;
        object.x += object.vx * dtSeconds;
        object.y += object.vy * dtSeconds;

        if (entity.state.throwElapsed >= entity.state.throwDuration) {
            object.x = entity.state.throwTarget.x;
            object.y = entity.state.throwTarget.y;
            object.vx = 0;
            object.vy = 0;
            return true;
        }

        return false;
    },

    exit: (entity) => {
        delete entity.state.throwGravity;
        delete entity.state.throwElapsed;
        delete entity.state.throwDuration;
        delete entity.state.throwTarget;
    },
};
