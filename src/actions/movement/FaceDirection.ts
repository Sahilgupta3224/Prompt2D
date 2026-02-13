import type { ActionDefinition } from "../../types/Action";
import type { Direction } from "../../types/common";
import { playAnimation, stopAnimation } from "../../helpers/animationTools";

type FaceDirectionParams = {
    direction: Direction;
};

export const FaceDirectionAction: ActionDefinition<FaceDirectionParams> = {
    enter: (entity, { direction }) => {
        playAnimation(entity, direction);
        entity.state.faceDirectionSet = true;
    },

    update: (entity, { direction }) => {
        stopAnimation(entity);
        entity.currentanim = direction;
        return true;
    },

    exit: (entity) => {
        delete entity.state.faceDirectionSet;
    },
};
