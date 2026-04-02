import type { ActionDefinition } from "../../types/Action";
import { calculateAngle } from "../../helpers/common";
import { playAnimationOnce, stopAnimation } from "../../helpers/animationTools";
import type { Entity } from "../../types/Entity";

type WaveParams = {
    target: Entity;
    direction?: "UP" | "DOWN" | "LEFT" | "RIGHT";
    waves?: number;
};

const WAVE_FRAME_DURATION = 400;
const MAX_WAVES = 20;
const MAX_WAVE_MS = 15000;

export const WaveAction: ActionDefinition<WaveParams> = {
    enter: (entity, { target, direction, waves = 3 }, _ctx, s) => {
        s.aborted = false;
        if (!entity) {
            s.aborted = true;
            return;
        }

        s.elapsed = 0;
        s.totalElapsed = 0;
        s.waveCount = 0;

        s.totalWaves = Math.max(1, Math.min(MAX_WAVES, typeof waves === "number" ? waves : 3));

        s.previousAnim = entity.currentanim;
        s.previousMode = entity.animMode;
        s.phase = "wave";
        s.cycleElapsed = 0;
        let dir: string;
        if (target && typeof target.x === "number" && typeof target.y === "number") {
            const angle = calculateAngle(
                { x: entity.x, y: entity.y },
                { x: target.x, y: target.y }
            );
            const cardinal = angle >= -Math.PI / 4 && angle < Math.PI / 4 ? "RIGHT"
                : angle >= Math.PI / 4 && angle < 3 * Math.PI / 4 ? "DOWN"
                    : angle >= -3 * Math.PI / 4 && angle < -Math.PI / 4 ? "UP"
                        : "LEFT";
            dir = cardinal;
        } else {
            const validDirections = ["UP", "DOWN", "LEFT", "RIGHT"];
            dir = direction && validDirections.includes(direction) ? direction : "DOWN";
        }

        s.dir = dir;
        playAnimationOnce(entity, `SLASH${dir}`);
    },

    update: (entity, _params, dt, _ctx, s) => {
        if (s.aborted) return true;
        if (!entity) return true;

        const dtMs = dt * (1000 / 60);
        s.elapsed += dtMs;
        s.totalElapsed += dtMs;
        s.cycleElapsed += dtMs;
        if (s.totalElapsed >= MAX_WAVE_MS) {
            console.warn("[Wave] Timeout reached, completing");
            return true;
        }

        if (s.phase === "wave") {
            if (entity.animFinished || s.cycleElapsed >= WAVE_FRAME_DURATION) {
                s.waveCount++;
                s.cycleElapsed = 0;

                if (s.waveCount >= s.totalWaves) {
                    return true;
                }
                if (s.waveCount % 2 === 0) {
                    playAnimationOnce(entity, `SLASH${s.dir}`);
                } else {
                    entity.currentanim = `IDLE${s.dir}`;
                    entity.animMode = "static";
                    entity.animFinished = false;
                }
            }
        }

        return false;
    },

    exit: (entity, _p, _ctx, _s) => {
        if (entity) {
            stopAnimation(entity);
        }
    },
};
