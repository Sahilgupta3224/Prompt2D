import type { ActionDefinition } from "../../types/Action";
import { stopAnimation, playAnimation } from "../../helpers/animationTools";
import { calculateAngle, angleToDirection, handleMovement } from "../../helpers/common";

interface CrawlParams {
  destination: { x: number; y: number };
  duration?: number;
}

export const CrawlAction: ActionDefinition<CrawlParams> = {

  enter(entity, params, ctx, state) {
    console.log(entity)
    state.aborted = false;
    if (!params.destination) {
      state.aborted = true;
      return;
    }
    state.elapsed = 0;
    entity.state.isMoving = true;

    // JUGAADU HACK: Rotate the container so the character is lying completely flat on their belly!
    const container = entity.container.current;
    if (container) {
      state.originalRotation = container.rotation ?? 0;

      // We calculate angle to know which way to tilt.
      const angle = calculateAngle({ x: entity.x, y: entity.y }, params.destination);
      const isMovingLeft = Math.cos(angle) < 0;

      // If moving left, tilt to the left (-90 deg). If right, tilt right (+90 deg).
      container.rotation = isMovingLeft ? -Math.PI / 2 : Math.PI / 2;
    }
  },

  update(entity, params, dt, ctx, state) {
    if (state.aborted) return true;
    console.log(entity.x, entity.y)
    // We use a much slower crawling speed (e.g. 0.5 instead of usual 2)
    const crawlSpeed = 0.5;

    // Play normal walk animation, but because they are rotated on their side, it looks like crawling!
    const angle = calculateAngle({ x: entity.x, y: entity.y }, params.destination);
    playAnimation(entity, angleToDirection(angle));

    // Handle physical movement
    const { position, completed } = handleMovement(
      { x: entity.x, y: entity.y },
      params.destination,
      crawlSpeed,
      dt
    );

    entity.x = position.x;
    entity.y = position.y;

    // Add a tiny vertical struggling wiggle (the inch-worm effect)
    state.elapsed += dt;
    const wiggle = Math.abs(Math.sin(state.elapsed * 0.1)) * 3;
    entity.localOffset = { x: 0, y: -wiggle }; // Pushes them up and down locally

    if (completed) {
      // Reached destination
      return true;
    }

    return false;
  },

  exit(entity, _p, _ctx, state) {
    entity.state.isMoving = false;
    entity.localOffset = { x: 0, y: 0 };

    // RESTORE the character so they stand back up
    const container = entity.container.current;
    if (container && state.originalRotation !== undefined) {
      container.rotation = state.originalRotation;
    }

    stopAnimation(entity);
  }
};