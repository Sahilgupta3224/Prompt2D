import type { ActionDefinition } from "../../types/Action";

type DespawnParams = {
    entityId: string;
};

export const DespawnAction: ActionDefinition<DespawnParams> = {
    enter: (_entity, { entityId }, ctx) => {
        const target = ctx.registry.get(entityId);
        if (target) {
            const container = target.container.current;
            if (container && container.parent) {
                container.parent.removeChild(container);
            }
            ctx.registry.remove(entityId);
        }
    },

    update: () => {
        return true;
    },

    exit: () => { },
};
