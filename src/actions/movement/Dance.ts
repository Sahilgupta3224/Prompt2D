import type { ActionDefinition } from "../../types/Action";
import { playAnimation, stopAnimation } from "../../helpers/animationTools";

export const DanceAction: ActionDefinition<void> = {
    enter: (entity) => {
        playAnimation(entity, "DANCE");
        entity.state.isMoving = true;
    },

    update: () => false,

    exit: (entity) => {
        entity.state.isMoving = false;
        stopAnimation(entity);
    },
};