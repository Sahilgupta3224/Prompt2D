import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, angleToDirection, reachedDestination } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";
import { playAnimation, playAnimationOnce } from "../../helpers/animationTools";

type SitOnParams = {
    seat: { x: number; y: number };
    // duration?: number;
    moveSpeed?: number;
};

export const SitOnAction: ActionDefinition<SitOnParams> = {
    enter: (entity) => {
        entity.state.sitPhase = "moving";
        entity.state.isMoving = true;
        entity.state.sitElapsed = 0;
    },

    update: (entity, { seat, moveSpeed = MOVE_SPEED }, dt) => {
        if (entity.state.sitPhase === "moving") {
            const angle = calculateAngle({ x: entity.x, y: entity.y }, seat);
            const speed = moveSpeed * dt;

            entity.x += Math.cos(angle) * speed;
            entity.y += Math.sin(angle) * speed;
            playAnimation(entity, angleToDirection(angle));

            if (reachedDestination({ x: entity.x, y: entity.y }, seat, 5)) {
                console.log("reached")
                entity.x = seat.x;
                entity.y = seat.y;
                entity.state.sitPhase = "sitTransition";
                entity.state.isMoving = false;
                entity.state.isSitting = true;
                playAnimationOnce(entity, "SIT");
            }
            return false;
        }

        if (entity.state.sitPhase === "sitTransition") {
            if (entity.animFinished) {
                console.log("khatam")
                entity.state.sitPhase = "sitting";
                return true;
            }
        }

        // if (entity.state.sitPhase === "sitting") {
        //     if (duration !== undefined) {
        //         entity.state.sitElapsed += dt * (1000 / 60);
        //         if (entity.state.sitElapsed >= duration) {
        //             return true;
        //         }
        //     }
        //     return false;
        // }

        return false;
    },

    exit: (entity) => {
        entity.state.isSitting = false;
        entity.state.isMoving = false;
        delete entity.state.sitPhase;
        delete entity.state.sitElapsed;
        entity.animMode = "freeze";
        delete entity.animFinished;
    },
};
