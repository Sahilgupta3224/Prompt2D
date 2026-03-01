import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, angleToDirection, reachedDestination } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";
import { playAnimation, playAnimationOnce, freezeFrame} from "../../helpers/animationTools";

type SitOnParams = {
    seat: { x: number; y: number };
    moveSpeed?: number;
    facing?: "UP" | "DOWN" | "LEFT" | "RIGHT";
};

export const SitOnAction: ActionDefinition<SitOnParams> = {
    enter: (entity, { seat }, _ctx, s) => {
        s.phase = "moving";
        if (reachedDestination({ x: entity.x, y: entity.y }, seat, 5)) {
            s.phase = "sitTransition";
            entity.state.isSitting = true;
            playAnimationOnce(entity, "SIT");
            return;
        }

        entity.state.isMoving = true;
        const angle = calculateAngle({ x: entity.x, y: entity.y }, seat);
        playAnimation(entity, angleToDirection(angle));
    },

    update: (entity, { seat, moveSpeed = MOVE_SPEED, facing }, dt, _ctx, s) => {
        if (s.phase === "moving") {
            const angle = calculateAngle({ x: entity.x, y: entity.y }, seat);
            const speed = moveSpeed * dt;

            entity.x += Math.cos(angle) * speed;
            entity.y += Math.sin(angle) * speed;
            playAnimation(entity, angleToDirection(angle));

            if (reachedDestination({ x: entity.x, y: entity.y }, seat, 5)) {
                entity.x = seat.x;
                entity.y = seat.y;
                entity.state.isMoving = false;
                entity.state.isSitting = true;

                if (facing) {
                    entity.currentanim = facing;
                }

                s.phase = "sitTransition";
                playAnimationOnce(entity, "SIT");
            }
            return false;
        }

        if (s.phase === "sitTransition") {
            if (entity.animFinished) {
                freezeFrame(entity);
                return true;
            }
        }

        return false;
    },

    exit: (entity) => {
        entity.state.isSitting = false;
        entity.state.isMoving = false;
        delete entity.animFinished;
        freezeFrame(entity);
    },
};
