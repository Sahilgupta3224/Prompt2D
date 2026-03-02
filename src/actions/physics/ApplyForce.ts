// have to attach object to entity, move the entity, detach objcet from entity after end of action

import type { ActionDefinition } from "../../types/Action";
import { playAnimation, stopAnimation } from "../../helpers/animationTools";

type ApplyForceParams = {
    force: { x: number; y: number };
    duration?: number;
    continuous?: boolean;
    damping?: number;
    maxSpeed?: number;
    mode?: "push" | "pull" | "none";
};

function getPushPullAnim(mode: "push" | "pull" | "none", forceX: number): string | null {
    if (mode === "none") return null;
    const side = forceX < 0 ? "LEFT" : "RIGHT";
    return mode === "pull" ? `PULL${side}` : `PUSH${side}`;
}

export const ApplyForceAction: ActionDefinition<ApplyForceParams> = {
    enter: (entity, { force, continuous = false, damping = 0.85, mode = "none" }, _ctx, s) => {
        if (entity.vx === undefined) entity.vx = 0;
        if (entity.vy === undefined) entity.vy = 0;
        s.elapsed = 0;
        s.damping = Math.max(0, Math.min(1, damping));
        s.previousAnim = entity.currentanim;
        s.previousMode = entity.animMode;
        const anim = getPushPullAnim(mode, force.x);
        if (anim) {
            playAnimation(entity, anim);
        }
        if (!continuous) {
            entity.vx += force.x;
            entity.vy += force.y;
        }
    },

    update: (entity, { force, duration, continuous = false, maxSpeed }, dt, _ctx, s) => {
        const dtSeconds = dt / 60;
        s.elapsed += dt * (1000 / 60);

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
        if (duration !== undefined && s.elapsed >= duration) return true;
        if (!continuous && duration === undefined) {
            return Math.hypot(entity.vx, entity.vy) < 0.5;
        }

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
