// need to  edit this, will use freezeframe after setting currentanimation

import { angleToIdleDirection, calculateAngle } from "../../helpers/common";
import type { Entity } from "../../types/Entity";
import type { ActionDefinition } from "../../types/Action";

type TurnTowardParams = { 
    target?: Entity | { x: number; y: number }; 
    targetId?: string;
};

export const TurnTowardsAction: ActionDefinition<TurnTowardParams> = {
  enter: (entity, params, ctx) => {
    if (!entity || !params) return;

    const { target, targetId } = params;
    let resolvedTarget: { x: number; y: number } | undefined;
    if (typeof target === 'object' && target !== null && 'x' in target && 'y' in target) {
        resolvedTarget = target;
    } else if (typeof target === 'string') {
        resolvedTarget = ctx.registry.get(target);
    } else if (targetId) {
        resolvedTarget = ctx.registry.get(targetId);
    }
    if (!resolvedTarget) return;
    const tx = resolvedTarget.x;
    const ty = resolvedTarget.y;
    if (isNaN(tx) || isNaN(ty) || isNaN(entity.x) || isNaN(entity.y)) {
        return;
    }
    const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: tx, y: ty });
    entity.currentanim = angleToIdleDirection(angle);
    entity.animMode = "static";
    entity.state.isMoving = false;
  },

  update: () => true,

  exit: (entity) => {
    if (!entity) return;
    if (entity.animMode === "static") {
        entity.animFinished = true;
    }
  },
};