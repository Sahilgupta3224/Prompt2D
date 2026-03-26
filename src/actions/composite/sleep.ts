import type { ActionDefinition } from "../../types/Action";
import { stopAnimation } from "../../helpers/animationTools";

type SleepParams = {
  duration?: number;
};

const MIN_DURATION = 100;
const MAX_DURATION = 30000;

export const SleepAction: ActionDefinition<SleepParams> = {
  enter: (entity, { duration }, _ctx, s) => {
    if (!entity) {
      s.aborted = true;
      return;
    }
    const rawDuration = duration ?? 3000;
    s.duration = Math.max(MIN_DURATION, Math.min(MAX_DURATION, rawDuration));
    s.timer = 0;
    s.previousAnim = entity.currentanim;
    s.previousMode = entity.animMode;

    entity.state.isMoving = false;
    entity.state.isSleeping = true;

    const container = entity.container.current;
    if (container) {
      s.originalRotation = container.rotation ?? 0;
      container.rotation = Math.PI / 2;
    }

    entity.currentanim = "IDLELEFT";
    entity.animMode = "loop";
  },

  update: (entity, _params, dt, _ctx, s) => {
    if (s.aborted) return true;

    if (!entity) return true;

    s.timer += dt * (1000 / 60);
    entity.state.isSleeping = true;

    if (s.timer >= s.duration) {
      return true;
    }
    return false;
  },

  exit: (entity, _params, _ctx, s) => {
    if (!entity) return;
    entity.state.isSleeping = false;

    const container = entity.container.current;
    if (container && s.originalRotation !== undefined) {
      container.rotation = s.originalRotation;
    }

    if (s.previousAnim) {
      entity.currentanim = s.previousAnim;
    }
    stopAnimation(entity);
  },
};