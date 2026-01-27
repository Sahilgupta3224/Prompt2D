import type { ActionDefinition } from "../types/Action";
import type { Entity } from "../types/Entity";

type MoveParams = { x: number, y: number };

export const MoveAction: ActionDefinition<MoveParams> = {
  
  enter: (entity) => {
    entity.state.moveStart = { x: entity.x, y: entity.y };
    entity.state.isMoving = true;
  },

  update: (entity, { x, y }, dt) => {
    const dx = x - entity.x;
    const dy = y - entity.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 5) return true;

    const speed = 5 * dt;
    entity.x += (dx / dist) * speed;
    entity.y += (dy / dist) * speed;
    
    return false;
  },

  exit: (entity) => {
    entity.state.isMoving = false;
  }
};