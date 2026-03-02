import type { ActionDefinition } from "../../types/Action";
import { playAnimationOnce, stopAnimation } from "../../helpers/animationTools";

type AnyParams = {
  Name: string;
  time?: number;
};

export const AnyAction: ActionDefinition<AnyParams> = {
  enter: (entity, { Name }, _ctx, s) => {
    s.elapsed = 0;
    playAnimationOnce(entity, Name);
  },

  update: (_entity, { time }, dt, _ctx, s) => {
    if (time !== undefined) {
      s.elapsed += dt * (1000 / 60);
      return s.elapsed >= time;
    }
    return true;
  },

  exit: (entity) => {
    stopAnimation(entity);
  },
};