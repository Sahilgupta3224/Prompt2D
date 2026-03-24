import type { ActionDefinition } from "../../types/Action";

type ShakeParams = {
    intensity: number;
    duration?: number;
    frequency?: number;
    axis?: "x" | "y" | "both";
    decay?: boolean;
};

export const ShakeAction: ActionDefinition<ShakeParams> = {
    enter: (entity, { intensity, duration, frequency = 10, axis = "both", decay = false }, _ctx, s) => {
        s.intensity = intensity;
        s.duration = duration;
        s.frequency = frequency;
        s.axis = axis;
        s.decay = decay;
        s.elapsed = 0;
        s.timeSinceLastShake = 0;
        if (!entity.localOffset) {
            entity.localOffset = { x: 0, y: 0 };
        }
    },

    update: (entity, { frequency = 10, axis = "both", duration, decay = false }, dt, _ctx, s) => {
        const dtMs = dt * (1000 / 60); 
        s.elapsed += dtMs;
        s.timeSinceLastShake += dtMs;

        if (!entity.localOffset) {
            entity.localOffset = { x: 0, y: 0 };
        }

        if (duration !== undefined && s.elapsed >= duration) {
            entity.localOffset = { x: 0, y: 0 };
            return true;
        }
        const updateInterval = 1000 / frequency;

        if (s.timeSinceLastShake >= updateInterval) {
            s.timeSinceLastShake = 0;
            let currentIntensity = s.intensity;
            if (decay && duration !== undefined && duration > 0) {
                currentIntensity *= (1 - Math.min(s.elapsed / duration, 1));
            }
            const offsetX = (Math.random() * 2 - 1) * currentIntensity;
            const offsetY = (Math.random() * 2 - 1) * currentIntensity;
            if (axis === "x" || axis === "both") {
                entity.localOffset.x = offsetX;
            }
            if (axis === "y" || axis === "both") {
                entity.localOffset.y = offsetY;
            }
        }

        return false;
    },

    exit: (entity, _params, _ctx, _s) => {
        entity.localOffset = { x: 0, y: 0 };
    },
};
