import type { ActionDefinition } from "../../types/Action";
import { playAnimationOnce, stopAnimation } from "../../helpers/animationTools";

type JumpParams = {
    height: number;
    distance?: number;
    duration?: number; 
    gravity?: number;
};

export const JumpAction: ActionDefinition<JumpParams> = {
    enter: (entity, { height, distance = 0, duration = 600, gravity = 1 }, _ctx, s) => {
        s.height = Math.max(1, height);
        s.distance = distance;
        s.duration = Math.max(100, duration);
        s.gravity = Math.max(0.1, gravity);
        s.startX = entity.x;
        s.startY = entity.y;
        s.elapsed = 0;
        s.previousAnim = entity.currentanim;
        s.previousMode = entity.animMode;
        entity.state.isJumping = true;
        playAnimationOnce(entity, "JUMP");
    },

    update: (entity, _, dt, _ctx, s) => {
        s.elapsed += dt * (1000 / 60);
        const progress = Math.min(s.elapsed / s.duration, 1);
        if (s.distance !== 0) {
            entity.x = s.startX + s.distance * progress;
        }
        const t = progress * 2;
        let verticalOffset: number;

        if (t <= 1) {
            verticalOffset = -s.height * (2 * t - t * t);
        } else {
            const fall = t - 1;
            verticalOffset = -s.height * (1 - fall * fall * s.gravity);
        }
        entity.y = s.startY + verticalOffset;
        if (progress >= 1) {
            entity.y = s.startY;
            if (s.distance !== 0) {
                entity.x = s.startX + s.distance;
            }
            return true;
        }

        return false;
    },

    exit: (entity, _p, _ctx, s) => {
        entity.y = s.startY ?? entity.y;
        entity.state.isJumping = false;
        if (s.previousAnim) {
            entity.currentanim = s.previousAnim;
        }
        if (s.previousMode) {
            entity.animMode = s.previousMode;
        } else {
            stopAnimation(entity);
        }
    },
};
