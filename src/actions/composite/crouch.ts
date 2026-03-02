import type { ActionDefinition } from "../../types/Action";

interface CrouchParams {
  duration?: number;
}

export const CrouchAction: ActionDefinition<CrouchParams> = {

  enter(entity, params, ctx, state) {
    state.phase="turn";
    state.elapsed=0;
    state.duration=params.duration??1000;
    state.turnTime=100; 
    state.originalScale = entity.scale;
    // first face right
    entity.currentanim = "STEADYRIGHT";
    entity.animMode = "once";
  },

  update(entity, params, dt, ctx, state) {

    state.elapsed += dt;
    if (state.phase === "turn") {
      if (state.elapsed >= state.turnTime) {
        state.phase = "crouch";
        state.elapsed = 0;
        entity.currentanim = "CROUCH";
        entity.animMode = "once";
        entity.scale *= 0.9;
        entity.state.isMoving = false;
      }
      return false;
    }
    if (state.phase === "crouch") {
      if (state.elapsed >= state.duration) {
        return true;
      }

      return false;
    }

    return true;
  },

  exit(entity, params, ctx, state) {
    entity.scale = state.originalScale;
    entity.animMode = "loop";
  }
};