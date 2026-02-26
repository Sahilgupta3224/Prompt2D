import type { ActionDefinition } from "../../types/Action";

type ApplyForceParams = {
    force: { x: number; y: number };
    duration?: number;
    continuous?: boolean;
};
export const ApplyForceAction: ActionDefinition<ApplyForceParams> = {
    enter: (entity, { force, duration, continuous = false }, _ctx, s) => {
        if (!entity.vx) entity.vx = 0;
        if (!entity.vy) entity.vy = 0;

        s.force = force;
        s.duration = duration;
        s.continuous = continuous;
        s.startTime = Date.now();

        if (!continuous) {
            entity.vx += force.x;
            entity.vy += force.y;
        }
    },

    update: (entity, { force, duration, continuous = false }, delta, _ctx, s) => {
        if (continuous) {
            entity.vx += force.x * delta * 0.1;
            entity.vy += force.y * delta * 0.1;
        }
        entity.x += entity.vx * delta;
        entity.y += entity.vy * delta;
        const dampingFactor = Math.pow(0.95, delta);
        entity.vx *= dampingFactor;
        entity.vy *= dampingFactor;

        if (duration !== undefined) {
            const elapsed = Date.now() - s.startTime;
            if (elapsed >= duration) {
                return true;
            }
        }

        if (!continuous && !duration) {
            const speed = Math.sqrt(entity.vx * entity.vx + entity.vy * entity.vy);
            return speed < 0.1;
        }

        return false;
    },
};
