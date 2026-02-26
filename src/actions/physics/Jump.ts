import type { ActionDefinition } from "../../types/Action";

type JumpParams = {
    height: number;
    distance?: number;
    duration?: number;
    gravity?: number;
};

export const JumpAction: ActionDefinition<JumpParams> = {
    enter: (entity, { height, distance = 0, duration = 600, gravity = 1 }, _ctx, s) => {
        s.previousAnim = entity.currentanim;
        entity.currentanim = "JUMP";

        s.startY = entity.y;
        s.startX = entity.x;
        s.height = height;
        s.distance = distance;
        s.duration = duration;
        s.gravity = gravity;
        s.startTime = Date.now();
        entity.state.isJumping = true;
    },

    update: (entity, { height, distance = 0, duration = 600, gravity = 1 }, _delta, _ctx, s) => {
        const elapsed = Date.now() - s.startTime;
        const progress = Math.min(elapsed / duration, 1);

        if (distance !== 0) {
            entity.x = s.startX + distance * progress;
        }

        const t = progress * 2;
        let verticalOffset: number;

        if (t <= 1) {
            verticalOffset = -height * (2 * t - t * t);
        } else {
            const fallT = t - 1;
            verticalOffset = -height * (1 - fallT * fallT * gravity);
        }

        entity.y = s.startY + verticalOffset;

        return progress >= 1;
    },

    exit: (entity, _params, _ctx, s) => {
        if (s.previousAnim) {
            entity.currentanim = s.previousAnim;
        }
        entity.state.isJumping = false;
    },
};
