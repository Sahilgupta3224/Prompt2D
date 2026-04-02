// character ka hand move hona chahiye, animation change krna hai uske liye

import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";
import { calculateAngle, angleToAttackDirection } from "../../helpers/common";
import { playAnimationOnce, stopAnimation } from "../../helpers/animationTools";

type ThrowParams = {
    object: Entity;
    target: { x: number; y: number };
    arcHeight: number;
    gravity?: number;
};

const MAX_ARC_HEIGHT = 500;
const MAX_GRAVITY = 10000;
const MIN_GRAVITY = 100;
const MAX_THROW_DURATION = 5;

export const ThrowAction: ActionDefinition<ThrowParams> = {
    enter: (entity, { object, target, arcHeight, gravity = 2000 }, _ctx, s) => {
        s.aborted = false;
        if (!entity || !object || !target) {
            s.aborted = true;
            return;
        }
        if (isNaN(target.x) || isNaN(target.y)) {
            console.warn("[Throw] Invalid target coordinates");
            s.aborted = true;
            return;
        }
        if (object.parent !== entity) {
            console.warn("[Throw] Object is not held by this entity");
            s.aborted = true;
            return;
        }
        if (entity.x === target.x && entity.y === target.y) {
            object.parent = null;
            delete object.localOffset;
            delete object.attachmentPoint;
            delete entity.state.heldObjectId;
            s.aborted = true;
            return;
        }
        s.previousAnim = entity.currentanim;
        s.previousMode = entity.animMode;
        const throwAngle = calculateAngle({ x: entity.x, y: entity.y }, target);
        playAnimationOnce(entity, angleToAttackDirection(throwAngle, "thrust"));
        object.parent = null;
        delete object.localOffset;
        delete object.attachmentPoint;
        delete entity.state.heldObjectId;

        const startX = object.x;
        const startY = object.y;
        const endX = target.x;
        const endY = target.y;

        const safeArcHeight = Math.max(0, Math.min(MAX_ARC_HEIGHT, isNaN(arcHeight) ? 50 : arcHeight));
        const safeGravity = Math.max(MIN_GRAVITY, Math.min(MAX_GRAVITY, isNaN(gravity) ? 2000 : gravity));
        const peakY = Math.min(startY, endY) - safeArcHeight;
        const deltaYUp = startY - peakY;

        if (deltaYUp <= 0) {
            s.vx = endX - startX
            s.vy = 0;
            s.gravity = 0;
            s.duration = 1;
        } 
        else {
            const vy = -Math.sqrt(2 * safeGravity * deltaYUp);
            const tUp = Math.abs(vy) / safeGravity;
            const tDown = (endY - peakY) > 0 ? Math.sqrt(2 * (endY - peakY) / safeGravity) : Math.abs(vy) / safeGravity;
            const t = tUp + tDown;

            const safeDuration = Math.min(t, MAX_THROW_DURATION);
            const timeScale = safeDuration / (t || 1);

            s.vx = (endX - startX) / safeDuration;
            s.vy = vy / timeScale;
            s.gravity = safeGravity * (1 / (timeScale * timeScale || 1));
            s.duration = safeDuration;
        }

        object.vx = s.vx;
        object.vy = s.vy;
        s.elapsed = 0;
        s.startX = startX;
        s.startY = startY;
        s.target = { x: target.x, y: target.y };
    },

    update: (_entity, { object }, dt, _ctx, s) => {
        if (s.aborted) return true;

        if (!object) {
            console.warn("[Throw] Object disappeared mid-flight");
            return true;
        }

        const dtSeconds = dt / 60;
        s.elapsed += dtSeconds;

        if (s.elapsed >= s.duration) {
            object.x = s.target.x;
            object.y = s.target.y;
            object.vx = 0;
            object.vy = 0;
            return true;
        }

        object.vy += s.gravity * dtSeconds;
        object.x += object.vx * dtSeconds;
        object.y += object.vy * dtSeconds;

        return false;
    },

    exit: (entity, _p, _ctx, _s) => {
        if (entity) {
            stopAnimation(entity);
        }
    },
};
