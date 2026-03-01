import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";

type GrabParams = {
  object: Entity;
  localOffset?: { x: number; y: number };
  attachmentPoint?: string;
};

export const GrabAction: ActionDefinition<GrabParams> = {
  enter: (entity, { object, localOffset = { x: 0, y: 0 }, attachmentPoint }) => {
    if (!object) {
      return;
    }

    if (object.parent && object.parent !== entity) {
      delete object.parent.state.heldObjectId;
      // parent state se bhi hatana h object ko
    }

    if (entity.state.heldObjectId && entity.state.heldObjectId !== object.id) {
      // dusre object ki state se bhi hatana h entity ko
    }

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

  exit: () => {
  },
};