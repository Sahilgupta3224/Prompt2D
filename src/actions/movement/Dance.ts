import type { ActionDefinition } from "../../types/Action";
// type DanceParams = {};

export const DanceAction: ActionDefinition<void> = {

    enter: (entity) => {
        entity.currentanim = "DANCE"
        entity.state.isMoving = true;
    },
    update: (entity, _, delta) => {
        return false;
    },

    exit: (entity) => {
        entity.currentanim = "STILL"
        entity.state.isMoving = false
    }
};