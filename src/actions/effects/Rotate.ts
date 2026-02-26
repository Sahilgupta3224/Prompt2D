import type { ActionDefinition } from "../../types/Action";

type RotateParams = {
    angle: number;
    duration?: number;
};

export const RotateAction: ActionDefinition<RotateParams> = {
    enter: (entity, { angle, duration = 0 }, _ctx, s) => {
        const sprite = entity.sprite.current;
        s.startAngle = sprite ? sprite.rotation : 0;
        s.targetAngle = angle;
        s.startTime = Date.now();

        if (duration === 0 && sprite) {
            sprite.rotation = angle;
        }
    },

    update: (entity, { angle, duration = 0 }, _dt, _ctx, s) => {
        if (duration === 0) return true;

        const elapsed = Date.now() - s.startTime;
        const progress = Math.min(elapsed / duration, 1);

        const deltaAngle = angle - s.startAngle;
        const rotation = s.startAngle + deltaAngle * progress;
        const sprite = entity.sprite.current;
        if (sprite) {
            sprite.rotation = rotation;
        }

        return progress >= 1;
    },
};
