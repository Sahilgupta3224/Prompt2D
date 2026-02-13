import type { ActionDefinition } from "../../types/Action";

type WaitParams = {
    duration: number; 
};

export const WaitAction: ActionDefinition<WaitParams> = {
    enter: (entity, { duration }) => {
        entity.state.waitElapsed = 0;
        entity.state.waitDuration = duration;
    },

    update: (entity, _, dt) => {
        entity.state.waitElapsed += dt * (1000 / 60);

        if (entity.state.waitElapsed >= entity.state.waitDuration) {
            return true;
        }

        return false;
    },

    exit: (entity) => {
        delete entity.state.waitElapsed;
        delete entity.state.waitDuration;
    },
};
