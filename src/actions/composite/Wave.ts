import type { ActionDefinition } from "../../types/Action";
import { calculateAngle } from "../../helpers/common";
import { playAnimationOnce, stopAnimation } from "../../helpers/animationTools";

type WaveParams = {
    target?: import("../../types/Entity").Entity;
    direction?: "UP" | "DOWN" | "LEFT" | "RIGHT";
    waves?: number;
};

const WAVE_FRAME_DURATION = 400;

export const WaveAction: ActionDefinition<WaveParams> = {
    enter: (entity, { target, direction, waves = 3 }, _ctx, s) => {
        s.elapsed = 0;
        s.waveCount = 0;
        s.totalWaves = waves;
        s.previousAnim = entity.currentanim;
        s.previousMode = entity.animMode;
        s.phase = "wave";
        s.cycleElapsed = 0;
        let dir: string;
        if (target) {
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
            dir = direction ?? "DOWN";
        }

        s.dir = dir;
        playAnimationOnce(entity, `THRUST${dir}`);
    },

    update: (entity, _params, dt, _ctx, s) => {
        const dtMs = dt * (1000 / 60);
        s.elapsed += dtMs;
        s.cycleElapsed += dtMs;

        if (s.phase === "wave") {
            if (entity.animFinished || s.cycleElapsed >= WAVE_FRAME_DURATION) {
                s.waveCount++;
                s.cycleElapsed = 0;

                if (s.waveCount >= s.totalWaves) {
                    return true;
                }
                if (s.waveCount % 2 === 0) {
                    playAnimationOnce(entity, `THRUST${s.dir}`);
                } else {
                    entity.currentanim = `IDLE${s.dir}`;
                    entity.animMode = "static";
                    entity.animFinished = false;
                }
            }
        }

        return false;
    },

    exit: (entity, _p, _ctx, s) => {
        if (s.previousAnim) entity.currentanim = s.previousAnim;
        if (s.previousMode) entity.animMode = s.previousMode;
        else stopAnimation(entity);
    },
};
