import type { ActionDefinition } from "../../types/Action";

type FadeParams = {
    targetAlpha: number;
    duration?: number;
    easing?: "linear" | "easeInOut" | "easeIn" | "easeOut";
};

export const FadeAction: ActionDefinition<FadeParams> = {
    enter: (entity, { targetAlpha, duration = 1000 }) => {
        if (entity.state.alpha === undefined) {
            const sprite = entity.sprite.current;
            entity.state.alpha = sprite ? sprite.alpha : 1;
        }

        entity.state.fadeStart = entity.state.alpha;
        entity.state.fadeTarget = Math.max(0, Math.min(1, targetAlpha));
        entity.state.fadeDuration = duration;
        entity.state.fadeStartTime = Date.now();

        if (duration === 0) {
            entity.state.alpha = entity.state.fadeTarget;
        }
    },

    update: (entity, { duration = 1000, easing = "linear" }) => {
        if (duration === 0) return true;

        const elapsed = Date.now() - entity.state.fadeStartTime;
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
                t = p < 0.5? 2 * p * p: -1 + (4 - 2 * p) * p;
                break;
        }

        const { fadeStart, fadeTarget } = entity.state;
        entity.state.alpha = fadeStart + (fadeTarget - fadeStart) * t;
        const sprite = entity.sprite.current;
        if (sprite) {
            sprite.alpha = entity.state.alpha;
        }

        return p >= 1;
    },

    exit: (entity) => {
        delete entity.state.fadeStart;
        delete entity.state.fadeTarget;
        delete entity.state.fadeDuration;
        delete entity.state.fadeStartTime;
    },
};
