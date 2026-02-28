//need to work more on this

import type { ActionDefinition } from "../../types/Action";
import type { ShapeName } from "../../helpers/shapeFactory";

type SpawnParams = {
    entityId: string;
    x: number;
    y: number;
    scale?: number;
    isObject?: boolean;
    shape?: ShapeName;
    color?: string;
};

export const SpawnAction: ActionDefinition<SpawnParams> = {
    enter: (_entity, { entityId, x, y, scale, isObject, shape, color }, ctx) => {
        if (!entityId || typeof entityId !== "string") {
            return;
        }

        if (ctx.registry.has(entityId)) {
            return;
        }

        ctx.registry.createEntity({
            id: entityId,
            x,
            y,
            scale,
            isObject,
            shape,
            color,
        });
    },

    update: () => {
        return true;
    },

    exit: () => { },
};
