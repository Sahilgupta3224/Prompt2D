import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";

type GrabParams = {
  object: Entity;
  localOffset?: { x: number; y: number };
  attachmentPoint?: string;
};

export const GrabAction: ActionDefinition<GrabParams> = {
  enter: (entity, { object, localOffset, attachmentPoint }) => {
    object.parent = entity;
    object.localOffset = localOffset;

    if (attachmentPoint) {
      object.attachmentPoint = attachmentPoint;
    }

    entity.state.heldObjectId = object.id;
  },

  update: () => {
    return true;
  },
};