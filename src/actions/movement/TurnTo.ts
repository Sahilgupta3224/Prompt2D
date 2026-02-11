import { angleToDirection } from "../../helpers/common";
import type { ActionDefinition } from "../../types/Action";
type TurnToParams = { direction: "UP" | "DOWN" | "LEFT" | "RIGHT" } | { angle: number };

export const TurnToAction: ActionDefinition<TurnToParams> = {
  enter: (entity, params) => {
    if (!params) return;
    if ("angle" in params) {
      entity.currentanim = angleToDirection(params.angle);
    } else if ("direction" in params) {
      entity.currentanim = params.direction;
    }
  },
  update: () => true,
  exit: () => {},
};