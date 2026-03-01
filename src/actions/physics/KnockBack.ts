import type { ActionDefinition } from "../../types/Action";
import { playAnimationOnce, freezeFrame } from "../../helpers/animationTools";
import { angleToDirection } from "../../helpers/common";

type KnockBackParams = {
    direction: { x: number; y: number };
    strength: number;
    duration?: number;
    friction?: number;
};

export const KnockBackAction: ActionDefinition<KnockBackParams> = {
    enter: (entity, { direction, strength, duration = 500, friction = 0.85 }, _ctx, s) => {
        const len = Math.hypot(direction.x, direction.y);
        const nx = len > 0 ? direction.x / len : 0;
        const ny = len > 0 ? direction.y / len : -1;
        s.vx = nx * Math.max(0, strength);
        s.vy = ny * Math.max(0, strength);
        s.friction = Math.max(0, Math.min(1, friction));
        s.duration = Math.max(0, duration);
        s.elapsed = 0;
        s.previousAnim = entity.currentanim;
        s.previousMode = entity.animMode;
        const angle = Math.atan2(ny, nx);
        playAnimationOnce(entity, angleToDirection(angle));
    },

    update: (entity, _, dt, _ctx, s) => {
        const dtSeconds = dt / 60;
        s.elapsed += dt * (1000 / 60);
        entity.x += s.vx * dtSeconds;
        entity.y += s.vy * dtSeconds;
        const friction = Math.pow(s.friction, dtSeconds);
        s.vx *= friction;
        s.vy *= friction;
        const speed = Math.hypot(s.vx, s.vy);
        if (s.elapsed >= s.duration || speed < 0.5) {
            return true;
        }

        return false;
    },

    exit: (entity, _p, _ctx, s) => {
        if (s.previousAnim) {
            entity.currentanim = s.previousAnim;
        }
        if (s.previousMode) {
            entity.animMode = s.previousMode;
        } else {
            freezeFrame(entity);
        }
    },
};
