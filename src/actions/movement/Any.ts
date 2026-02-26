import type { ActionDefinition } from "../../types/Action";

type AnyParams = { Name: string, time: Number }
export const AnyAction: ActionDefinition<AnyParams> = {
  enter: (entity, { Name }, _ctx, s) => {
    switch (Name) {
      case "CROUCH":
        entity.currentanim = "CROUCH";
        break;
      default:
        entity.currentanim = "STILL";
        break;
    }
    s.startTime = Date.now();
  },
  update: (_entity, { time }, _dt, _ctx, s) => {
    if (time) {
      if (Date.now() - s.startTime >= time) {
        return true;
      }
    }
    return false;
  },
};