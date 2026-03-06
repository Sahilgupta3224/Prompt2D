import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, angleToRunDirection, angleToIdleDirection } from "../../helpers/common";
import { playAnimation, stopAnimation } from "../../helpers/animationTools";
import { MOVE_SPEED, GAME_WIDTH, GAME_HEIGHT } from "../../constants/game-world";

type FleeParams = {
    target: import("../../types/Entity").Entity;
    speed?: number;
    duration?: number;
};

const BOUNDARY_PADDING = 40;

export const FleeAction: ActionDefinition<FleeParams> = {
    enter: (entity, { speed }, _ctx, s) => {
        s.elapsed = 0;
        s.speed = speed ?? MOVE_SPEED * 1.3;
        s.previousAnim = entity.currentanim;
        s.previousMode = entity.animMode;
        entity.state.isMoving = true;
    },

    update: (entity, { target, duration = 3000 }, dt, _ctx, s) => {
        if (!target) return true;

        s.elapsed += dt * (1000 / 60);
        if (s.elapsed >= duration) return true;
        const angle = calculateAngle(
            { x: target.x, y: target.y },
            { x: entity.x, y: entity.y }
        );
        let nextX = entity.x + Math.cos(angle) * s.speed * dt;
        let nextY = entity.y + Math.sin(angle) * s.speed * dt;
        nextX = Math.max(BOUNDARY_PADDING, Math.min(GAME_WIDTH - BOUNDARY_PADDING, nextX));
        nextY = Math.max(BOUNDARY_PADDING, Math.min(GAME_HEIGHT - BOUNDARY_PADDING, nextY));
        entity.x = nextX;
        entity.y = nextY;
        playAnimation(entity, angleToRunDirection(angle));
        return false;
    },

    exit: (entity, _p, _ctx, s) => {
        entity.state.isMoving = false;
        if (s.previousAnim) {
            const angle = 0;
            entity.currentanim = angleToIdleDirection(angle);
        }
        if (s.previousMode) entity.animMode = s.previousMode;
        else stopAnimation(entity);
    },
};
