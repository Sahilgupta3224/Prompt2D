import type { ActionDefinition } from "../../types/Action";

type SetStateParams = { values: Record<string, any> };

export const SetStateAction: ActionDefinition<SetStateParams> = {
    enter: (entity, { values }) => {
        Object.assign(entity.state, values);
    },

    update: () => {
        return true;
    },

    exit: () => { },
};
