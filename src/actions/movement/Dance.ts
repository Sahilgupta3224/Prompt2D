import type { ActionDefinition } from "../../types/Action";
import { playAnimation, stopAnimation } from "../../helpers/animationTools";

type DanceParams = {
    duration?: number;
};

export const DanceAction: ActionDefinition<DanceParams> = {
    enter: (entity, { duration = 5000 }, _ctx, s) => {
        if (!entity) {
            s.aborted = true;
            return;
        }
        s.aborted = false;
        s.duration = Math.max(0, duration);
        s.elapsed = 0;
        s.cycleTimer = 0;
        s.directions = ["DOWN", "RIGHT", "UP", "LEFT"];
        s.dirIndex = 0;
        playAnimation(entity, `SPELLCAST${s.directions[s.dirIndex]}`);
        entity.state.isMoving = true;
    },

    update: (entity, _, dt, _ctx, s) => {
        if (s.aborted) return true;
        if (!entity) return true;
        const dtMs = dt * (1000 / 60);
        s.elapsed += dtMs;
        s.cycleTimer += dtMs;
        if (s.cycleTimer >= 500) {
            s.cycleTimer -= 500;
            s.dirIndex = (s.dirIndex + 1) % s.directions.length;
            playAnimation(entity, `SPELLCAST${s.directions[s.dirIndex]}`);
        }
        if (s.elapsed >= s.duration) {
            return true;
        }
        return false;
    },

    exit: (entity, _p, _ctx, _s) => {
        if (!entity) return;
        entity.state.isMoving = false;
        stopAnimation(entity);
    },
};