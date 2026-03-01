import type { ActionDefinition } from "../../types/Action";

type RotateParams = {
    angle: number;
    duration?: number;
    loop?: boolean;
    speed?: number;
    easing?: "linear" | "easeIn" | "easeOut" | "easeInOut";
};


function applyEasing(p: number, easing: RotateParams["easing"]): number {
    switch (easing) {
        case "easeIn": return p * p;
        case "easeOut": return p * (2 - p);
        case "easeInOut": return p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        default: return p;
    }
}

export const RotateAction: ActionDefinition<RotateParams> = {
    enter: (entity, { angle, duration = 0, loop = false, speed = 90 }, _ctx, s) => {
        const sprite = entity.sprite.current;
        const startRad = sprite ? sprite.rotation : 0;
        const targetRad = angle * (Math.PI / 180);

        s.startAngle = startRad;
        s.targetAngle = targetRad;
        s.elapsed = 0;
        s.duration = Math.max(0, duration);
        s.loop = loop;
        s.speedPerFrame = (speed * (Math.PI / 180)) / 60;

        if (!loop && s.duration === 0 && sprite) {
            sprite.rotation = targetRad;
        }
    },

    update: (entity, { easing = "linear", loop = false }, dt, _ctx, s) => {
        const sprite = entity.sprite.current;
        if (!sprite) return true;

        if (loop) {
            sprite.rotation += s.speedPerFrame * dt;
            return false;
        }

        if (s.duration === 0) return true;

        s.elapsed += dt * (1000 / 60);
        const p = Math.min(s.elapsed / s.duration, 1);
        const t = applyEasing(p, easing);

        sprite.rotation = s.startAngle + (s.targetAngle - s.startAngle) * t;

        return p >= 1;
    },

    exit: (entity, { loop = false }, _ctx, s) => {
        if (!loop) {
            const sprite = entity.sprite.current;
            if (sprite && s.targetAngle !== undefined) {
                sprite.rotation = s.targetAngle;
            }
        }
    },
};
