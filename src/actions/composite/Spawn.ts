import type { ActionDefinition } from "../../types/Action";
import type { ShapeName } from "../../helpers/shapeFactory";
import { GAME_WIDTH, GAME_HEIGHT, OFFSET_X, OFFSET_Y } from "../../constants/game-world";

type SpawnParams = {
    entityId: string;
    x: number;
    y: number;
    scale?: number;
    isObject?: boolean;
    shape?: ShapeName;
    color?: string;
};

export const SpawnAction: ActionDefinition<SpawnParams> = {
    enter: (_entity, { entityId, x, y, scale, isObject, shape, color }, ctx, s) => {
        s.aborted = false;

        if (!entityId || typeof entityId !== "string" || entityId.trim().length === 0) {
            console.warn("[Spawn] Invalid entityId, aborting");
            s.aborted = true;
            return;
        }

        if (ctx.registry.has(entityId)) {
            console.warn(`[Spawn] Entity "${entityId}" already exists, skipping`);
            s.aborted = true;
            return;
        }

        let safeX = typeof x === "number" && !isNaN(x) ? x : OFFSET_X + GAME_WIDTH / 2;
        let safeY = typeof y === "number" && !isNaN(y) ? y : OFFSET_Y + GAME_HEIGHT / 2;
        safeX = Math.max(OFFSET_X, Math.min(OFFSET_X + GAME_WIDTH, safeX));
        safeY = Math.max(OFFSET_Y, Math.min(OFFSET_Y + GAME_HEIGHT, safeY));
        const safeScale = typeof scale === "number" && !isNaN(scale)
            ? Math.max(0.1, Math.min(10, scale))
            : 1;

        ctx.registry.createEntity({
            id: entityId,
            x: safeX,
            y: safeY,
            scale: safeScale,
            isObject,
            shape,
            color,
        });
    },

    update: (_entity, _params, _dt, _ctx, _s) => {
        return true;
    },

    exit: () => {},
};
