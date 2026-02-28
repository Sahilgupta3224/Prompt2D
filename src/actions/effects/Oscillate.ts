import type { ActionDefinition } from "../../types/Action";

type OscillateParams = {
    amplitude: number;
    amplitudeY?: number;
    frequency?: number;
    axis?: "x" | "y" | "both";
    duration?: number;
};

export const OscillateAction: ActionDefinition<OscillateParams> = {
    enter: (entity, { amplitude, amplitudeY, frequency = 1, axis = "both", duration }, _ctx, s) => {
        s.center = { x: entity.x, y: entity.y };
        s.ampX = amplitude;
        s.ampY = amplitudeY ?? amplitude;
        s.frequency = frequency;
        s.axis = axis;
        s.duration = duration;
        s.elapsed = 0;
        s.phase = 0;
    },

    update: (entity, { frequency = 1, axis = "both", duration }, dt, _ctx, s) => {
        const dtSeconds = dt / 60;
        s.elapsed += dtSeconds * 1000;

        if (duration !== undefined && s.elapsed >= duration) {
            entity.x = s.center.x;
            entity.y = s.center.y;
            return true;
        }
        s.phase += 2 * Math.PI * frequency * dtSeconds;
        const phase = s.phase;
        if (axis === "x" || axis === "both") {
            entity.x =  s.center.x + s.ampX * Math.sin(phase);
        }
        if (axis === "y" || axis === "both") {
            entity.y = s.center.y + s.ampY * Math.cos(s.phase);
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
