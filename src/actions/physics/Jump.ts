import type { ActionDefinition } from "../../types/Action"; //GOOD

type JumpParams = {
    height: number;
    distance?: number;
    duration?: number; 
    gravity?: number;
};

export const JumpAction: ActionDefinition<JumpParams> = {
    enter: (entity, { height, distance = 0, duration = 600, gravity = 1 }) => {
        entity.state.jumpPreviousAnim = entity.currentanim;
        entity.currentanim = "JUMP";

        entity.state.jumpStartY = entity.y;
        entity.state.jumpStartX = entity.x;
        entity.state.jumpHeight = height;
        entity.state.jumpDistance = distance;
        entity.state.jumpDuration = duration;
        entity.state.jumpGravity = gravity;
        entity.state.jumpStartTime = Date.now();
        entity.state.jumpProgress = 0;
        entity.state.isJumping = true;
        entity.state.jumpInitialVelocity = Math.sqrt(2 * gravity * height * 60); 
    },

    update: (entity, { height, distance = 0, duration = 600, gravity = 1 }, delta) => {
        const elapsed = Date.now() - entity.state.jumpStartTime;
        const progress = Math.min(elapsed / duration, 1);
        entity.state.jumpProgress = progress;

        if (distance !== 0) {
            entity.x = entity.state.jumpStartX + distance * progress;
        }

        const t = progress * 2;
        let verticalOffset: number;

        if (t <= 1) {
            verticalOffset = -height * (2 * t - t * t);
        } else {
            const fallT = t - 1;
            verticalOffset = -height * (1 - fallT * fallT * gravity);
        }

        entity.y = entity.state.jumpStartY + verticalOffset;

        return progress >= 1;
    },

    exit: (entity) => {
        if (entity.state.jumpPreviousAnim) {
            entity.currentanim = entity.state.jumpPreviousAnim;
        }

        entity.state.isJumping = false;
        delete entity.state.jumpStartY;
        delete entity.state.jumpStartX;
        delete entity.state.jumpHeight;
        delete entity.state.jumpDistance;
        delete entity.state.jumpDuration;
        delete entity.state.jumpGravity;
        delete entity.state.jumpStartTime;
        delete entity.state.jumpProgress;
        delete entity.state.jumpInitialVelocity;
        delete entity.state.jumpPreviousAnim;
    },
};
