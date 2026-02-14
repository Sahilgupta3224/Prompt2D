import type { ActionDefinition } from "../../types/Action";

type ShakeParams = {
    intensity: number;
    duration?: number;
    frequency?: number;
    axis?: "x" | "y" | "both";
};

export const ShakeAction: ActionDefinition<ShakeParams> = {
    enter: (entity, { intensity, duration, frequency = 10, axis = "both" }) => {
        entity.state.shakeCenter = { x: entity.x, y: entity.y };
        entity.state.shakeIntensity = intensity;
        entity.state.shakeDuration = duration;
        entity.state.shakeFrequency = frequency;
        entity.state.shakeAxis = axis;
        entity.state.shakeStartTime = Date.now();
        entity.state.shakeLastUpdate = 0;
    },

    update: (entity, { intensity, duration, frequency = 10, axis = "both" }, delta) => {
        const elapsed = Date.now() - entity.state.shakeStartTime;

        if (duration !== undefined && elapsed >= duration) {
            entity.x = entity.state.shakeCenter.x;
            entity.y = entity.state.shakeCenter.y;
            return true;
        }
        const updateInterval = 1000 / frequency;
        entity.state.shakeLastUpdate += delta * 16.67;

        if (entity.state.shakeLastUpdate >= updateInterval) {
            entity.state.shakeLastUpdate = 0;

            const { shakeCenter } = entity.state;
            const offsetX = (Math.random() - 0.5) * 2 * intensity;
            const offsetY = (Math.random() - 0.5) * 2 * intensity;

            if (axis === "x" || axis === "both") {
                entity.x = shakeCenter.x + offsetX;
            }
            if (axis === "y" || axis === "both") {
                entity.y = shakeCenter.y + offsetY;
            }
        }

        return false;
    },

    exit: (entity) => {
        if (entity.state.shakeCenter) {
            entity.x = entity.state.shakeCenter.x;
            entity.y = entity.state.shakeCenter.y;
        }
        delete entity.state.shakeCenter;
        delete entity.state.shakeIntensity;
        delete entity.state.shakeDuration;
        delete entity.state.shakeFrequency;
        delete entity.state.shakeAxis;
        delete entity.state.shakeStartTime;
        delete entity.state.shakeLastUpdate;
    },
};
