import type { ActionDefinition } from "../../types/Action";

type ShakeParams = {
    intensity: number;
    duration?: number;
    frequency?: number;
    axis?: "x" | "y" | "both";
};

export const ShakeAction: ActionDefinition<ShakeParams> = {
    enter: (entity, { intensity, duration, frequency = 10, axis = "both" }, _ctx, s) => {
        s.center = { x: entity.x, y: entity.y };
        s.intensity = intensity;
        s.duration = duration;
        s.frequency = frequency;
        s.axis = axis;
        s.startTime = Date.now();
        s.lastUpdate = 0;
    },

    update: (entity, { intensity, duration, frequency = 10, axis = "both" }, delta, _ctx, s) => {
        const elapsed = Date.now() - s.startTime;

        if (duration !== undefined && elapsed >= duration) {
            entity.x = s.center.x;
            entity.y = s.center.y;
            return true;
        }
        const updateInterval = 1000 / frequency;
        s.lastUpdate += delta * 16.67;

        if (s.lastUpdate >= updateInterval) {
            s.lastUpdate = 0;

            const offsetX = (Math.random() - 0.5) * 2 * intensity;
            const offsetY = (Math.random() - 0.5) * 2 * intensity;

            if (axis === "x" || axis === "both") {
                entity.x = s.center.x + offsetX;
            }
            if (axis === "y" || axis === "both") {
                entity.y = s.center.y + offsetY;
            }
        }

        return false;
    },

    exit: (entity, _params, _ctx, s) => {
        if (s.center) {
            entity.x = s.center.x;
            entity.y = s.center.y;
        }
    },
};
