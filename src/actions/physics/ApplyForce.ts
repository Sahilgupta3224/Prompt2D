import type { ActionDefinition } from "../../types/Action";
import { playAnimation, stopAnimation } from "../../helpers/animationTools";
import { MOVE_SPEED } from "../../constants/game-world";

type ApplyForceParams = {
    force: { x: number; y: number };
    duration?: number;
    continuous?: boolean;
    damping?: number; 
    maxSpeed?: number;
    mode?: "push" | "pull" | "none";
    walkSpeed?: number;
};

export const ApplyForceAction: ActionDefinition<ApplyForceParams> = {
    enter: (entity, { force, continuous = false, damping = 0.85, mode = "none", walkSpeed = MOVE_SPEED }, _ctx, s) => {
        s.elapsed = 0;
        s.previousAnim = entity.currentanim;
        s.previousMode = entity.animMode;

        if (mode === "push" || mode === "pull") {
            const len = Math.hypot(force.x, force.y);
            s.walkDirX = len > 0 ? force.x / len : 1;
            s.walkDirY = len > 0 ? force.y / len : 0;
            s.walkSpeed = Math.max(0, walkSpeed);
            s.mode = mode;
            const side = s.walkDirX < 0 ? "LEFT" : "RIGHT";
            playAnimation(entity, mode === "pull" ? `PULL${side}` : `PUSH${side}`);
        } else {
            s.mode = "none";
            s.damping = Math.max(0, Math.min(1, damping));
            if (entity.vx === undefined) entity.vx = 0;
            if (entity.vy === undefined) entity.vy = 0;
            if (!continuous) {
                entity.vx += force.x;
                entity.vy += force.y;
            }
        }
    },

    update: (entity, { force, duration, continuous = false, maxSpeed }, dt, _ctx, s) => {
        const dtSeconds = dt / 60;
        s.elapsed += dt * (1000 / 60);

        if (s.mode === "push" || s.mode === "pull") {
            entity.x += s.walkDirX * s.walkSpeed * dt;
            entity.y += s.walkDirY * s.walkSpeed * dt;
        } else {
            if (continuous) {
                entity.vx += force.x * dtSeconds;
                entity.vy += force.y * dtSeconds;
            }

            if (maxSpeed !== undefined) {
                const speed = Math.hypot(entity.vx, entity.vy);
                if (speed > maxSpeed) {
                    const scale = maxSpeed / speed;
                    entity.vx *= scale;
                    entity.vy *= scale;
                }
            }
            entity.x += entity.vx * dtSeconds;
            entity.y += entity.vy * dtSeconds;
            const damp = Math.pow(s.damping, dtSeconds);
            entity.vx *= damp;
            entity.vy *= damp;
            if (!continuous && duration === undefined) {
                return Math.hypot(entity.vx, entity.vy) < 0.5;
            }
        }

        if (duration !== undefined && s.elapsed >= duration) return true;
        return false;
    },

    exit: (entity, _p, _ctx, s) => {
        entity.vx = 0;
        entity.vy = 0;
        if (s.previousAnim) entity.currentanim = s.previousAnim;
        if (s.previousMode) entity.animMode = s.previousMode;
        else stopAnimation(entity);
    },
};
