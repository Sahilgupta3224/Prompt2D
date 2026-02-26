import type { ActionDefinition } from "../../types/Action";

type OscillateParams = {
    amplitude: number,
    frequency?: number,
    axis?: "x" | "y" | "both",
    duration?: number
};

export const OscillateAction: ActionDefinition<OscillateParams> = {
    enter: (entity, { amplitude, frequency = 1, axis = "both", duration }, _ctx, s) => {
        s.center = { x: entity.x, y: entity.y };
        s.amplitude = { x: amplitude, y: amplitude };
        s.frequency = frequency;
        s.axis = axis;
        s.duration = duration;
        s.startTime = Date.now();
        s.phase = 0;
    },

    update: (entity, { frequency = 1, axis = "both", duration }, delta, _ctx, s) => {
        const elapsed = Date.now() - s.startTime;
        if (duration !== undefined && elapsed >= duration) {
            entity.x = s.center.x;
            entity.y = s.center.y;
            return true;
        }

        s.phase += 2 * Math.PI * frequency * delta * 0.016;

        if (axis === "x" || axis === "both") {
            entity.x = s.center.x + s.amplitude.x * Math.sin(s.phase);
        }
        if (axis === "y" || axis === "both") {
            entity.y = s.center.y + s.amplitude.y * Math.sin(s.phase);
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
