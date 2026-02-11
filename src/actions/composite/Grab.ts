import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";
type GrabParams = { object: Entity, localOffset: { x: number; y: number } };

export const GrabAction: ActionDefinition<GrabParams> = {

  enter: (entity, { object, localOffset }) => {
    console.log(object)
    object.parent = entity;
    object.localOffset = localOffset;
    console.log(object.parent)
  },
  update: () => {
    return false;
  },

  exit: (entity, { object }) => {
    delete object.parent;
    delete object.localOffset;
  }
};