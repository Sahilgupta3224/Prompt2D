import type { ActionDefinition } from "../../types/Action";

type WaitParams = {
    duration: number;
};

export const WaitAction: ActionDefinition<WaitParams> = {
    enter: (_entity, { duration }, _ctx, s) => {
        s.elapsed = 0;
        s.duration = duration;
    },

    update: (_entity, _, dt, _ctx, s) => {
        s.elapsed += dt * (1000 / 60);
        return s.elapsed >= s.duration;
    },
};
