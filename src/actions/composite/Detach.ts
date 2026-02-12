import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";

type DetachParams = {
  object: Entity;
};

export const DetachAction: ActionDefinition<DetachParams> = {
  enter: (entity, { object }) => {
    object.parent = null;
    delete object.localOffset;
    delete object.attachmentPoint;
    delete entity.state.grabbedObject
  },
  
  update: () => {
    return true;
  },

  exit: () => {
  },
};