import type { ActionDefinition } from "../../types/Action";
import { stopAnimation } from "../../helpers/animationTools";

interface SpinParams {
  duration?: number;
  rotations?: number;
}

const MIN_DURATION = 100;
const MAX_DURATION = 15000;
const MAX_ROTATIONS = 20;

export const SpinAction: ActionDefinition<SpinParams> = {

  enter(entity, params, _ctx, state) {
    state.aborted = false;
    if (!entity || !entity.container?.current) {
      state.aborted = true;
      return;
    }

    state.elapsed = 0;
    const rawDuration = params.duration ?? 1500;
    state.duration = Math.max(MIN_DURATION, Math.min(MAX_DURATION, rawDuration));
    const rawRotations = params.rotations ?? 2;
    state.rotations = Math.max(1, Math.min(MAX_ROTATIONS, rawRotations));
    state.originalRotation = entity.container.current.rotation ?? 0;
  },

  update(entity, _params, dt, _ctx, state) {
    if (state.aborted) return true;
    if (!entity.container?.current) {
      state.aborted = true;
      return true;
    }

    state.elapsed += dt * (1000 / 60);
    const t = Math.min(state.elapsed / state.duration, 1);
    const totalRotation = state.rotations * Math.PI * 2;

    entity.container.current.rotation = (state.originalRotation ?? 0) + totalRotation * t;
    return t >= 1;
  },

  exit(entity, _p, _ctx, state) {
    if (entity?.container?.current) {
      entity.container.current.rotation = state?.originalRotation ?? 0;
    }
    if (entity) {
      stopAnimation(entity);
    }
  }
};