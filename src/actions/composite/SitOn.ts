import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, angleToDirection, reachedDestination, handleMovement, moveByAngle, checkCanMove } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";
import { playAnimation, playAnimationOnce, freezeFrame } from "../../helpers/animationTools";

type SitOnParams = {
    seat: { x: number; y: number };
    moveSpeed?: number;
    facing?: "SITUP" | "SITDOWN" | "SITLEFT" | "SITRIGHT";
};

const MAX_MOVE_MS = 15000;
const MAX_SIT_TRANSITION_MS = 5000;

export const SitOnAction: ActionDefinition<SitOnParams> = {
    enter: (entity, { seat, facing }, _ctx, s) => {
        if (!entity || !seat || typeof seat.x !== "number" || typeof seat.y !== "number") {
            s.aborted = true;
            return;
        }
        if (isNaN(seat.x) || isNaN(seat.y) || isNaN(entity.x) || isNaN(entity.y)) {
            s.aborted = true;
            return;
        }

        s.moveElapsed = 0;
        s.sitElapsed = 0;
        s.phase = "moving";
        s.direction = null;
        s.targetPosition = null;

        if (reachedDestination({ x: entity.x, y: entity.y }, seat, 5)) {
            s.phase = "sitTransition";
            entity.state.isSitting = true;
            const angle0 = calculateAngle({ x: entity.x, y: entity.y }, seat);
            const sitAnim0 = facing ?? `SIT${angleToDirection(angle0).replace("MOVE", "")}`;
            playAnimationOnce(entity, sitAnim0);
            return;
        }
        entity.state.isMoving = true;
        const angle = calculateAngle({ x: entity.x, y: entity.y }, seat);
        s.sitAnim = facing ?? `SIT${angleToDirection(angle).replace("MOVE", "")}`;
    },

    update: (entity, { seat, moveSpeed = MOVE_SPEED, facing }, dt, _ctx, s) => {
        if (s.aborted || !seat) return true;

        if (s.phase === "moving") {
            s.moveElapsed += dt * (1000 / 60);
            if (s.moveElapsed >= MAX_MOVE_MS) {
                entity.x = seat.x;
                entity.y = seat.y;
                entity.state.isMoving = false;
                entity.state.isSitting = true;
                s.phase = "sitTransition";
                const sitAnim = facing ?? s.sitAnim ?? "SITDOWN";
                playAnimationOnce(entity, sitAnim);
                return false;
            }

            if (reachedDestination({ x: entity.x, y: entity.y }, seat)) {
                entity.x = seat.x;
                entity.y = seat.y;
                entity.state.isMoving = false;
                entity.state.isSitting = true;
                s.phase = "sitTransition";
                const sitAnim = facing ?? s.sitAnim ?? "SITDOWN";
                playAnimationOnce(entity, sitAnim);
                return false;
            }

            if (!s.direction) {
                const angle = calculateAngle(
                    { x: entity.x, y: entity.y },
                    seat
                );
                s.direction = {
                    x: Math.cos(angle),
                    y: Math.sin(angle),
                };
                playAnimation(entity, angleToDirection(angle));
            }
            if (!s.targetPosition) {
                const nextStep = moveByAngle(
                    { x: entity.x, y: entity.y },
                    s.direction,
                    moveSpeed,
                    dt
                );
                if (checkCanMove(nextStep)) {
                    s.targetPosition = nextStep;
                }
            }

            if (s.targetPosition) {
                const { position: newPosition, completed } = handleMovement(
                    { x: entity.x, y: entity.y },
                    s.targetPosition,
                    moveSpeed,
                    dt
                );
                entity.x = newPosition.x;
                entity.y = newPosition.y;
                if (completed) {
                    s.targetPosition = null;
                    s.direction = null;
                }
            }

            return false;
        }

        if (s.phase === "sitTransition") {
            s.sitElapsed += dt * (1000 / 60);
            if (entity.animFinished || s.sitElapsed >= MAX_SIT_TRANSITION_MS) {
                freezeFrame(entity);
                return true;
            }
        }

        return false;
    },

    exit: (entity) => {
        entity.state.isSitting = false;
        entity.state.isMoving = false;
        delete entity.animFinished;
        freezeFrame(entity);
    },
};