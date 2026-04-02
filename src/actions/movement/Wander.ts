import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, angleToDirection } from "../../helpers/common";
import { MOVE_SPEED, GAME_WIDTH, GAME_HEIGHT, OFFSET_X, OFFSET_Y } from "../../constants/game-world";
import { stopAnimation, playAnimation } from "../../helpers/animationTools";

const ARRIVAL_THRESHOLD = 5;
const MAX_WANDER_MS = 20000;

interface WanderParams {
    destination: { x: number; y: number };
    speed?: number;
    // HandMovement?: boolean;
}

export const WanderAction: ActionDefinition<WanderParams> = {
    enter(entity, params, _ctx, state) {
        state.aborted = false;
        if (!entity) {
            state.aborted = true;
            return;
        }
        if (
            !params.destination ||
            typeof params.destination.x !== "number" ||
            typeof params.destination.y !== "number" ||
            isNaN(params.destination.x as number) ||
            isNaN(params.destination.y as number)
        ) {
            console.warn("[Wander] Invalid destination, aborting");
            state.aborted = true;
            return;
        }
        state.targetX = Math.max(OFFSET_X, Math.min(OFFSET_X + GAME_WIDTH, Number(params.destination.x)));
        state.targetY = Math.max(OFFSET_Y, Math.min(OFFSET_Y + GAME_HEIGHT, Number(params.destination.y)));

        const dx = state.targetX - entity.x;
        const dy = state.targetY - entity.y;
        if (Math.sqrt(dx * dx + dy * dy) < ARRIVAL_THRESHOLD) {
            state.aborted = true;
            return;
        }

        state.elapsed = 0;
        state.startX = entity.x;
        state.startY = entity.y;

        const rawSpeed = typeof params.speed === "number" ? Number(params.speed) : MOVE_SPEED * 0.5;
        state.speed = Math.max(0.1, Math.min(10, rawSpeed));

        entity.state.isMoving = true;

        // if (params.HandMovement !== false) {
        //     entity.animMode = "loop";
        // }
    },

    update(entity, _params, dt, _ctx, state) {
        if (state.aborted) return true;
        if (!entity) return true;

        state.elapsed += dt * (1000 / 60);
        if (state.elapsed >= MAX_WANDER_MS) {
            console.warn("[Wander] Timeout reached, aborting");
            return true;
        }

        const dx = state.targetX - entity.x;
        const dy = state.targetY - entity.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ARRIVAL_THRESHOLD) {
            entity.x = state.targetX;
            entity.y = state.targetY;
            return true;
        }

        const angle = calculateAngle(
            { x: entity.x, y: entity.y },
            { x: state.targetX, y: state.targetY }
        );
        playAnimation(entity, angleToDirection(angle));

        const step = state.speed * dt;
        if (step >= dist) {
            entity.x = state.targetX;
            entity.y = state.targetY;
            return true;
        }

        entity.x += Math.cos(angle) * step;
        entity.y += Math.sin(angle) * step;
        return false;
    },

    exit(entity) {
        if (!entity) return;
        entity.state.isMoving = false;
        stopAnimation(entity);
    }
};