import type { ActionDefinition } from "../../types/Action";
import type { EntityState } from "../../types/Entity";

type SetStateParams = { values: Partial<EntityState> };

export const SetStateAction: ActionDefinition<SetStateParams> = {
    enter: (entity, { values }) => {
        if (!values || typeof values !== "object") {
            return;
        }
        Object.assign(entity.state, values);
    },

    update: () => {
        return true;
    },

    exit: () => { },
};
