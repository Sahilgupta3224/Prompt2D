import type { ActionDefinition } from "../types/Action";
import type { Entity } from "../types/Entity";
type GrabParams = { object:Entity, localOffset:{ x: number; y: number }};

export const GrabAction: ActionDefinition<GrabParams> = {

  enter: (entity,{object, localOffset}) => {
    object.parent = entity;
    object.localOffset = localOffset;
  },
  update: () => {
    return true;
  },

  exit: (entity,{object}) => {
    delete object.parent;
    delete object.localOffset;
  }
};