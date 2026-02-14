import type { ActionDefinition } from "../../types/Action";

type RotateParams = {
    Angle: number;
    duration?: number;
};

export const RotateAction: ActionDefinition<RotateParams> = {
    enter: (entity, { Angle, duration = 0 }) => {
        if (!entity.state.rotation) {
            entity.state.rotation = 0;
        }
        entity.state.rotateStart = entity.state.rotation;
        entity.state.rotateTarget = Angle;
        entity.state.rotateDuration = duration;
        entity.state.rotateStartTime = Date.now();

        if (duration === 0) {
            entity.state.rotation = Angle;
        }
    },

    update: (entity, { Angle, duration = 0 }) => {
        if (duration === 0) return true;

        const elapsed = Date.now() - entity.state.rotateStartTime;
        const progress = Math.min(elapsed / duration, 1);

        let t = progress;

        const startAngle = entity.state.rotateStart;
        const deltaAngle = Angle - startAngle;
        entity.state.rotation = startAngle + deltaAngle * t;
        console.log(entity.state.rotation);
        const sprite = entity.sprite.current;
        if (sprite) {
            sprite.rotation = entity.state.rotation;
        }

        return progress >= 1;
    },

    exit: (entity) => {
        console.log(entity.state.rotation)
        delete entity.state.rotateStart;
        delete entity.state.rotateTarget;
        delete entity.state.rotateDuration; 
        delete entity.state.rotateStartTime;
    },
};
