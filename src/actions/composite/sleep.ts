import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";
import { playAnimationOnce, stopAnimation } from "../../helpers/animationTools";

type SleepParams = {
  duration?: number;
};

export const SleepAction: ActionDefinition<SleepParams> = {
  enter: (entity, { duration }, _ctx, s) => {
    s.timer = 0;
    s.duration = duration ?? 3000;
    s.previousAnim = entity.currentanim;
    entity.state.isMoving = false;
    entity.state.isSleeping = true;
    entity.currentanim = "SIT";
    entity.animMode = "loop";
  },
  update: (entity, _params, dt, _ctx, s) => {
    s.timer += dt;
    entity.state.isSleeping = true;
    if (s.timer >= s.duration) {
      return true;
    }
    return false;
  },
  exit: (entity, _params, _ctx, _s) => {
    entity.state.isSleeping = false;
    stopAnimation(entity);
  },
};