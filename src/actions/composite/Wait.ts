import type { ActionDefinition } from "../../types/Action";

type WaitParams = {
    duration: number; // in ms
};

export const WaitAction: ActionDefinition<WaitParams> = {
    enter: (_entity, { duration }, _ctx, s) => {
        s.elapsed = 0;
        s.duration = Math.max(0, duration);
    },

    update: (_entity, _, dt, _ctx, s) => {
        if (s.duration === 0) return true;
        s.elapsed += dt * (1000 / 60);
        return s.elapsed >= s.duration;
    },
};
