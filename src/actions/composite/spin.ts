import type { ActionDefinition } from "../../types/Action";

interface SpinParams {
  duration?: number;
  rotations?: number;
}

export const SpinAction: ActionDefinition<SpinParams> = {

  enter(entity, params, ctx, state) {
    state.elapsed = 0;
    state.duration = params.duration ?? 1500;
    state.rotations = params.rotations ?? 2;
  },

  update(entity, params, dt, ctx, state) {
    state.elapsed += dt;
    const t = Math.min(state.elapsed / state.duration, 1);
    const totalRotation =
      state.rotations * Math.PI * 2;
    if (entity.container.current) {
      entity.container.current.rotation =
        totalRotation * t;
    }
    entity.currentanim = "spin";
    return t >= 1;
  },
  exit(entity) {
    if (entity.container.current) {
      entity.container.current.rotation = 0;
    }
    entity.currentanim = "idle";
  }
};