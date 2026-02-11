import type { ActionDefinition } from "../../types/Action";

type KnockBackParams = {
    direction: { x: number, y: number }
    strength: number
    duration?: number
    friction?: number
};

export const KnockBackAction: ActionDefinition<KnockBackParams> = {
    enter: (entity, { direction, strength, duration, friction }) => {
        entity.state.currentanim = "KNOCKED"
        const len = Math.hypot(direction.x, direction.y) || 1;
        const nx = direction.x / len;
        const ny = direction.y / len;
        entity.state.vx = nx * strength;
        entity.state.vy = ny * strength;
        entity.state.friction = friction || 0.9;
        entity.state.duration = duration || 500;
        entity.state.startTime = Date.now();
        if (Math.abs(nx) > Math.abs(ny)) {
            entity.currentanim = nx > 0 ? "RIGHT" : "LEFT";
        } else {
            entity.currentanim = ny > 0 ? "DOWN" : "UP";
        }
    },

    update: (entity, _, delta) => {
        const elapsed = Date.now() - entity.state.startTime;
        const speed = Math.hypot(entity.vx, entity.vy);
        if (speed<0.1 || elapsed > entity.state.duration) {
            entity.state.vx = 0;
            entity.state.vy = 0;
            return true;
        }
        entity.x += entity.state.vx * delta;
        entity.y += entity.state.vy * delta;
        entity.state.vx *= entity.state.friction;
        entity.state.vy *= entity.state.friction;
        return false;
    },

    exit: (entity) => {
        delete entity.state.vx;
        delete entity.state.vy;
        delete entity.state.friction;
        delete entity.state.duration;
        delete entity.state.startTime;
    },
};
