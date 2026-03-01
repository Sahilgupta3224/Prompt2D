import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";

type DetachParams = {
  object: Entity;
};

export const DetachAction: ActionDefinition<DetachParams> = {
  enter: (entity, { object }) => {
    if (!object) {
      return;
    }

    if (object.parent && object.parent !== entity) {
      delete object.parent.state.heldObjectId;
    } else {
      delete entity.state.heldObjectId;
    }

    object.parent = null;
    delete object.localOffset;
    delete object.attachmentPoint;
  },

  update: () => {
    return true;
  },

  exit: () => {
  },
};