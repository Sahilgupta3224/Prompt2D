import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, angleToRunDirection } from "../../helpers/common";
import { playAnimation, stopAnimation } from "../../helpers/animationTools";
import { MOVE_SPEED, GAME_WIDTH, GAME_HEIGHT } from "../../constants/game-world";
import type { Entity } from "../../types/Entity";

type FleeParams = {
    target?: Entity;
    targetId?: string;
    speed?: number;
    duration?: number;
};

const BOUNDARY_PADDING = 40;
const MAX_DURATION = 10000;
const MAX_SPEED = 20;

export const FleeAction: ActionDefinition<FleeParams> = {
    enter: (entity, params, ctx, s) => {
        if (!entity) {
            s.aborted = true;
            return;
        }

        const { target, targetId, speed, duration } = params;
        let resolvedTarget: Entity | undefined;
        if (typeof target === 'object' && target !== null && 'x' in target && 'y' in target) {
            resolvedTarget = target;
        } else if (typeof target === 'string') {
            resolvedTarget = ctx.registry.get(target);
        } else if (targetId) {
            resolvedTarget = ctx.registry.get(targetId);
        }
        if (!resolvedTarget) {
            s.aborted = true;
            return;
        }
        s.target = resolvedTarget;
        s.elapsed = 0;
        const requestedSpeed = speed ?? MOVE_SPEED * 1.5; 
        s.speed = Math.max(0, Math.min(MAX_SPEED, requestedSpeed));
        s.duration = Math.max(0, Math.min(MAX_DURATION, duration ?? 3000));
        s.previousAnim = entity.currentanim;
        s.previousMode = entity.animMode;
        entity.state.isMoving = true;
    },

    update: (entity, _params, dt, _ctx, s) => {
        if (s.aborted || !entity || !s.target) return true;

        s.elapsed += dt * (1000 / 60);
        if (s.elapsed >= s.duration) return true;
        const targetPos = { x: s.target.x, y: s.target.y };
        const entityPos = { x: entity.x, y: entity.y };
        if (isNaN(targetPos.x) || isNaN(targetPos.y) || isNaN(entityPos.x) || isNaN(entityPos.y)) {
            return true;
        }
        const angle = calculateAngle(targetPos, entityPos);
        let nextX = entity.x + Math.cos(angle) * s.speed * dt;
        let nextY = entity.y + Math.sin(angle) * s.speed * dt;
        nextX = Math.max(BOUNDARY_PADDING, Math.min(GAME_WIDTH - BOUNDARY_PADDING, nextX));
        nextY = Math.max(BOUNDARY_PADDING, Math.min(GAME_HEIGHT - BOUNDARY_PADDING, nextY));
        entity.x = nextX;
        entity.y = nextY;

        playAnimation(entity, angleToRunDirection(angle));
        return false;
    },

    exit: (entity, _p, _ctx, _s) => {
        if (!entity) return;
        entity.state.isMoving = false;
        stopAnimation(entity);
    },
};
