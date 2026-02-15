import { angleToDirection, calculateAngle } from "../../helpers/common";
import type { Entity } from "../../types/Entity";
import type { ActionDefinition } from "../../types/Action";

type TurnTowardParams = { target: Entity | { x: number; y: number } };
export const TurnTowardsAction: ActionDefinition<TurnTowardParams> = {
  enter: (entity, { target }) => {
    if (!target) return;
    const tx =  target.x;
    const ty = target.y;
    const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: tx, y: ty });
    entity.currentanim = angleToDirection(angle);
  },
  update: () => true,
  exit: () => {},
};