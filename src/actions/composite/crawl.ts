import type { ActionDefinition } from "../../types/Action";

interface CrawlParams {
  destination: { x: number; y: number };
  duration?: number;
}

export const CrawlAction: ActionDefinition<CrawlParams> = {

  enter(entity, params, ctx, state) {
    state.elapsed = 0;
    state.startX = entity.x;
    state.startY = entity.y;
    state.dx = params.destination.x-entity.x;
    state.dy = params.destination.y-entity.y;
    state.duration = params.duration??2000;
    entity.state.isMoving=true;
    entity.scale*=0.9;//lower down coz tilt difficult
  },

  update(entity, params, dt, ctx, state) {
    state.elapsed += dt;
    const t = Math.min(state.elapsed / state.duration, 1);
    entity.x = state.startX + state.dx * t;
    entity.y = state.startY + state.dy * t;
    entity.y += Math.sin(t*20)*2;
    entity.currentanim = "crawl";
    return t >1; 
  },

  exit(entity) {
    entity.state.isMoving =false;
    entity.scale/=0.9;
    entity.currentanim = "idle";
  }
};