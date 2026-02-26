import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, angleToDirection, reachedDestination } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";
import { playAnimation, playAnimationOnce } from "../../helpers/animationTools";

type SitOnParams = {
    seat: { x: number; y: number };
    moveSpeed?: number;
};

export const SitOnAction: ActionDefinition<SitOnParams> = {
    enter: (entity, _params, _ctx, s) => {
        s.phase = "moving";
        entity.state.isMoving = true;
    },

    update: (entity, { seat, moveSpeed = MOVE_SPEED }, dt, _ctx, s) => {
        if (s.phase === "moving") {
            const angle = calculateAngle({ x: entity.x, y: entity.y }, seat);
            const speed = moveSpeed * dt;

            entity.x += Math.cos(angle) * speed;
            entity.y += Math.sin(angle) * speed;
            playAnimation(entity, angleToDirection(angle));

            if (reachedDestination({ x: entity.x, y: entity.y }, seat, 5)) {
                entity.x = seat.x;
                entity.y = seat.y;
                s.phase = "sitTransition";
                entity.state.isMoving = false;
                entity.state.isSitting = true;
                playAnimationOnce(entity, "SIT");
            }
            return false;
        }

        if (s.phase === "sitTransition") {
            if (entity.animFinished) {
                s.phase = "sitting";
                return true;
            }
        }

        return false;
    },

    exit: (entity) => {
        entity.state.isSitting = false;
        entity.state.isMoving = false;
        entity.animMode = "freeze";
        delete entity.animFinished;
    },
};
