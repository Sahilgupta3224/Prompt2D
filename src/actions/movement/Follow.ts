import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";
import { angleToDirection, angleToIdleDirection} from "../../helpers/common";
import { playAnimation, stopAnimation } from "../../helpers/animationTools";
import { MOVE_SPEED } from "../../constants/game-world";

type FollowParams = {
    target?: Entity;
    targetId?: string;
    offset?: { x: number; y: number };
    speed?: number;
    maintainDistance?: number;
    duration?: number;
};

const MAX_DURATION = 30000;
const MAX_SPEED = 20;

export const FollowAction: ActionDefinition<FollowParams> = {
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
        s.speed = Math.max(0, Math.min(MAX_SPEED, speed ?? MOVE_SPEED));
        s.duration = Math.max(0, Math.min(MAX_DURATION, duration ?? 10000));
        s.previousAnim = entity.currentanim;
        s.previousMode = entity.animMode;
        entity.state.isMoving = true;
    },

    update: (entity, { offset = { x: 0, y: 0 }, maintainDistance = 40 }, dt, _ctx, s) => {
        if (s.aborted || !entity || !s.target) return true;
        s.elapsed += dt * (1000 / 60);
        const targetX = s.target.x + offset.x;
        const targetY = s.target.y + offset.y;
        const dx = targetX - entity.x;
        const dy = targetY - entity.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (isNaN(targetX) || isNaN(targetY) || isNaN(entity.x) || isNaN(entity.y)) {
            return true;
        }
        if (dist <= maintainDistance) {
            const angle = Math.atan2(dy, dx);
            entity.currentanim = angleToIdleDirection(angle);
            entity.state.isMoving = false;  
        } else {
            const angle = Math.atan2(dy, dx);
            entity.x += Math.cos(angle) * s.speed * dt;
            entity.y += Math.sin(angle) * s.speed * dt;
            playAnimation(entity, angleToDirection(angle));
            entity.state.isMoving = true;
        }
        if (s.elapsed >= s.duration) return true;
        return false;
    },

    exit: (entity, _p, _ctx, _s) => {
        if (!entity) return;
        entity.state.isMoving = false;
        stopAnimation(entity);
    },
};
