import type { ActionDefinition } from "../../types/Action";
import { EntityRegistry } from "../../core/EntityRegistry";

type DespawnParams = {
    entityId: string;
};

export const DespawnAction: ActionDefinition<DespawnParams> = {
    enter: (entity, { entityId }) => {
        const registry: EntityRegistry | undefined = entity.state.__registry__;
        if (!registry) return;

        const target = registry.get(entityId);
        if (target) {
            const container = target.container.current;
            if (container && container.parent) {
                container.parent.removeChild(container);
            }
            registry.remove(entityId);
        }
    },

    update: () => {
        return true;
    },

    exit: () => { },
};
