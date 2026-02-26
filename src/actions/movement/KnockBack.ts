import type { ActionDefinition } from "../../types/Action";

type KnockBackParams = {
    direction: { x: number, y: number }
    strength: number
    duration?: number
    friction?: number
};

export const KnockBackAction: ActionDefinition<KnockBackParams> = {
    enter: (entity, { direction, strength, duration, friction }, _ctx, s) => {
        const len = Math.hypot(direction.x, direction.y) || 1;
        const nx = direction.x / len;
        const ny = direction.y / len;
        s.vx = nx * strength;
        s.vy = ny * strength;
        s.friction = friction || 0.9;
        s.duration = duration || 500;
        s.startTime = Date.now();
        if (Math.abs(nx) > Math.abs(ny)) {
            entity.currentanim = nx > 0 ? "RIGHT" : "LEFT";
        } else {
            entity.currentanim = ny > 0 ? "DOWN" : "UP";
        }
    },

    update: (entity, _, delta, _ctx, s) => {
        const elapsed = Date.now() - s.startTime;
        const speed = Math.hypot(s.vx, s.vy);
        if (speed < 0.1 || elapsed > s.duration) {
            return true;
        }
        entity.x += s.vx * delta;
        entity.y += s.vy * delta;
        s.vx *= s.friction;
        s.vy *= s.friction;
        return false;
    },
};
