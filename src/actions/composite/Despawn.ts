//also handled reverse attatchment in this, need to do this in all primitives

// despawn action tabhi run chahiye jab entity par kisi aur type ka action na ho rha ho
// can lock user if currently in action
import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";

type DespawnParams = {
    entity: Entity;
};

export const DespawnAction: ActionDefinition<DespawnParams> = {
    enter: (_entity, { entity }, ctx) => {
        if (!entity) {
            return;
        }

        const target = ctx.registry.get(entity.id);
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

        ctx.registry.remove(entity.id);
    },

    update: () => true,
};
