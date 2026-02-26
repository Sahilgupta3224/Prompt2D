import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";

type ThrowParams = {
    object: Entity;
    target: { x: number; y: number };
    arcHeight: number;
    gravity?: number;
};

export const ThrowAction: ActionDefinition<ThrowParams> = {
    enter: (entity, { object, target, arcHeight, gravity = 2000 }, _ctx, s) => {
        object.parent = null;
        delete object.localOffset;
        delete object.attachmentPoint;
        delete entity.state.heldObjectId;

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
        s.gravity = gravity;
        s.elapsed = 0;
        s.duration = t;
        s.target = target;
    },

    update: (_entity, { object }, dt, _ctx, s) => {
        const dtSeconds = dt / 60;

        s.elapsed += dtSeconds;

        object.vy += s.gravity * dtSeconds;
        object.x += object.vx * dtSeconds;
        object.y += object.vy * dtSeconds;

        if (s.elapsed >= s.duration) {
            object.x = s.target.x;
            object.y = s.target.y;
            object.vx = 0;
            object.vy = 0;
            return true;
        }

        return false;
    },
};
