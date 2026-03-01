//also handled reverse attatchment in this, need to do this in all primitives

import type { ActionDefinition } from "../../types/Action";

type DespawnParams = {
    entityId: string;
};

export const DespawnAction: ActionDefinition<DespawnParams> = {
    enter: (_entity, { entityId }, ctx) => {
        if (!entityId || typeof entityId !== "string") {
            return;
        }

        const target = ctx.registry.get(entityId);
        if (!target) {
            return;
        }

        if (target.state.heldObjectId) {
            const held = ctx.registry.get(target.state.heldObjectId as string);
            if (held) {
                held.parent = null;
                delete held.localOffset;
                delete held.attachmentPoint;
            }
            delete target.state.heldObjectId;
        }

        for (const e of ctx.registry.getAll()) {
            if (e.parent === target) {
                e.parent = null;
                delete e.localOffset;
                delete e.attachmentPoint;
            }
        }

        const container = target.container.current;
        if (container && container.parent) {
            container.parent.removeChild(container);
            container.destroy({ children: true });
        }

        ctx.registry.remove(entityId);
    },

    update: () => true,
};
