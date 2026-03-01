import type { ActionDefinition } from "../../types/Action";
import { freezeFrame } from "../../helpers/animationTools";

type FadeParams = {
    targetAlpha: number;
    duration?: number;
    easing?: "linear" | "easeInOut" | "easeIn" | "easeOut";
    freezeOnComplete?: boolean;
};

function applyEasing(p: number, easing: FadeParams["easing"]): number {
    switch (easing) {
        case "easeIn": return p * p;
        case "easeOut": return p * (2 - p);
        case "easeInOut": return p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        default: return p;
    }
}

export const FadeAction: ActionDefinition<FadeParams> = {
    enter: (entity, { targetAlpha, duration = 1000 }, _ctx, s) => {
        const sprite = entity.sprite.current;
        s.targetAlpha = Math.max(0, Math.min(1, targetAlpha));
        s.startAlpha = sprite ? sprite.alpha : 1;
        s.elapsed = 0;
        s.duration = Math.max(0, duration);
        if (s.duration === 0 && sprite) {
            sprite.alpha = s.targetAlpha;
        }
    },

    update: (entity, { easing = "linear", freezeOnComplete = false }, dt, _ctx, s) => {
        if (s.duration === 0) {
            if (freezeOnComplete) freezeFrame(entity);
            return true;
        }

        s.elapsed += dt * (1000 / 60);
        const p = Math.min(s.elapsed / s.duration, 1);
        const t = applyEasing(p, easing);
        const sprite = entity.sprite.current;
        if (sprite) {
            sprite.alpha = s.startAlpha + (s.targetAlpha - s.startAlpha) * t;
        }
        if (p >= 1) {
            if (freezeOnComplete) freezeFrame(entity);
            return true;
        }
        return false;
    },

    exit: (entity, _params, _ctx, s) => {
        const sprite = entity.sprite.current;
        if (sprite && s.targetAlpha !== undefined) {
            sprite.alpha = s.targetAlpha;
        }
    },
};
