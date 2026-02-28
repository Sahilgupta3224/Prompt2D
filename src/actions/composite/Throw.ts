// character ka hand move hona chahiye, animation change krna hai uske liye

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
        if (!object) {
            s.aborted = true;
            return;
        }
        s.aborted = false;

        object.parent = null;
        delete object.localOffset;
        delete object.attachmentPoint;
        delete entity.state.heldObjectId;

        const startX = object.x;
        const startY = object.y;
        const endX = target.x;
        const endY = target.y;
        const peakY = Math.min(startY, endY) - arcHeight;
        const deltaYUp = startY - peakY;
        if (deltaYUp <= 0) {
            s.vx = endX - startX
            s.vy = 0;
            s.gravity = 0;
            s.duration = 1;
        }
        else {
            const vy = -Math.sqrt(2 * gravity * (startY - peakY));
            const tUp = Math.abs(vy) / gravity;
            const tDown = (endY - peakY) > 0 ? Math.sqrt(2 * (endY - peakY) / gravity) : Math.abs(vy) / gravity;
            const t = tUp + tDown;
            s.vx = (endX - startX) / t;
            s.vy = vy;
            s.gravity = gravity;
            s.duration = t;
        }

        object.vx = s.vx;
        object.vy = s.vy;
        s.elapsed = 0;
        s.startX = startX;
        s.startY = startY;
        s.target = { x: target.x, y: target.y };
    },

    update: (_entity, { object }, dt, _ctx, s) => {
        if (s.aborted) return true;
        if (!object) return true;
        const dtSeconds = dt / 60;

        s.elapsed += dtSeconds;

        
        if (s.elapsed >= s.duration) {
            object.x = s.target.x;
            object.y = s.target.y;
            object.vx = 0;
            object.vy = 0;
            return true;
        }
        object.vy += s.gravity * dtSeconds;
        object.x += object.vx * dtSeconds;
        object.y += object.vy * dtSeconds;

        return false;
    },

    exit: () => {
    },
};
