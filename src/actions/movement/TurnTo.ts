import { angleToIdleDirection } from "../../helpers/common";
import type { ActionDefinition } from "../../types/Action";
import { stopAnimation } from "../../helpers/animationTools";

type TurnToParams = { 
    direction?: "UP" | "DOWN" | "LEFT" | "RIGHT" | "IDLEUP" | "IDLEDOWN" | "IDLELEFT" | "IDLERIGHT"; 
    angle?: number; 
};

export const TurnToAction: ActionDefinition<TurnToParams> = {
  enter: (entity, params) => {
    if (!entity || !params) return;

    if (params.angle !== undefined && !isNaN(params.angle)) {
      entity.currentanim = angleToIdleDirection(params.angle);
    } else if (params.direction) {
      let dir = params.direction;
      if (!dir.startsWith("IDLE")) {
          dir = `IDLE${dir}` as any;
      }
      entity.currentanim = dir;
    }
    entity.animMode = "static";
    entity.state.isMoving = false;
  },

  update: () => true,

  exit: (entity) => {
    if (!entity) return;
    if (entity.animMode === "static") {
        entity.animFinished = true;
    }
    stopAnimation(entity)
  },
};