import type { ActionDefinition } from "../../types/Action";

type SpawnParams = {
    entityId: string;
    x: number;
    y: number;
    scale?: number;
};

export const SpawnAction: ActionDefinition<SpawnParams> = {
    enter: (_entity, { entityId, x, y, scale }, ctx) => {
        if (ctx.registry.has(entityId)) return;
        ctx.registry.createEntity({ id: entityId, x, y, scale });
    },

    update: () => {
        return true;
    },

    exit: () => { },
};
