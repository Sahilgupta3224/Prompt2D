import type { ActionDefinition } from "../../types/Action";

type FadeParams = {
    targetAlpha: number;
    duration?: number;
    easing?: "linear" | "easeInOut" | "easeIn" | "easeOut";
};

export const FadeAction: ActionDefinition<FadeParams> = {
    enter: (entity, { targetAlpha, duration = 1000 }, _ctx, s) => {
        const sprite = entity.sprite.current;
        s.startAlpha = sprite ? sprite.alpha : 1;
        s.targetAlpha = Math.max(0, Math.min(1, targetAlpha));
        s.startTime = Date.now();

        if (duration === 0) {
            const sp = entity.sprite.current;
            if (sp) sp.alpha = s.targetAlpha;
        }
    },

    update: (entity, { duration = 1000, easing = "linear" }, _dt, _ctx, s) => {
        if (duration === 0) return true;

        const elapsed = Date.now() - s.startTime;
        const p = Math.min(elapsed / duration, 1);

        let t = p;
        switch (easing) {
            case "easeIn":
                t = p * p;
                break;
            case "easeOut":
                t = p * (2 - p);
                break;
            case "easeInOut":
                t = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
                break;
        }

        const alpha = s.startAlpha + (s.targetAlpha - s.startAlpha) * t;
        const sprite = entity.sprite.current;
        if (sprite) {
            sprite.alpha = alpha;
        }

        return p >= 1;
    },
};
