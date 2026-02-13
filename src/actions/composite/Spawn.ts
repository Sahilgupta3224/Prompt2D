import type { ActionDefinition } from "../../types/Action";
import { EntityRegistry } from "../../core/EntityRegistry";

type SpawnParams = {
    entityId: string;
    x: number;
    y: number;
    scale?: number;
};

export const SpawnAction: ActionDefinition<SpawnParams> = {
    enter: (entity, { entityId, x, y, scale }) => {
        const registry: EntityRegistry | undefined = entity.state.__registry__;
        if (!registry) return;
        if (registry.has(entityId)) return;
        registry.createEntity({ id: entityId, x, y, scale });
    },

    update: () => {
        return true;
    },

    exit: () => { },
};
