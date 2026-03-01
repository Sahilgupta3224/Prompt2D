import type { ActionDefinition } from "../../types/Action";
import { stopAnimation } from "../../helpers/animationTools";

type ApplyForceParams = {
    force: { x: number; y: number };
    duration?: number; 
    continuous?: boolean;
    damping?: number;                   
    maxSpeed?: number;
};
export const ApplyForceAction: ActionDefinition<ApplyForceParams> = {
    enter: (entity, { force, continuous = false, damping = 0.85 }, _ctx, s) => {
        if (entity.vx === undefined) entity.vx = 0;
        if (entity.vy === undefined) entity.vy = 0;

        s.elapsed = 0;
        s.damping = Math.max(0, Math.min(1, damping));

        if (!continuous) {
            entity.vx += force.x;
            entity.vy += force.y;
        }
    },

    update: (entity, { force, duration, continuous = false, maxSpeed }, dt, _ctx, s) => {
        const dtSeconds = dt / 60;
        s.elapsed += dt * (1000 / 60);

        if (continuous) {
            entity.vx += force.x * dtSeconds;
            entity.vy += force.y * dtSeconds;
        }
        if (maxSpeed !== undefined) {
            const speed = Math.hypot(entity.vx, entity.vy);
            if (speed > maxSpeed) {
                const scale = maxSpeed / speed;
                entity.vx *= scale;
                entity.vy *= scale;
            }
        }
        entity.x += entity.vx * dtSeconds;
        entity.y += entity.vy * dtSeconds;
        const damp = Math.pow(s.damping, dtSeconds);
        entity.vx *= damp;
        entity.vy *= damp;
        if (duration !== undefined && s.elapsed >= duration) {
            return true;
        }
        if (!continuous && duration === undefined) {
            const speed = Math.hypot(entity.vx, entity.vy);
            return speed < 0.5;
        }
        return false;
    },

    exit: (entity) => {
        entity.vx = 0;
        entity.vy = 0;
        stopAnimation(entity);
    },
};
