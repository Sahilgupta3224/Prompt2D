import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, angleToDirection, angleToIdleDirection } from "../../helpers/common";
import { playAnimation, stopAnimation } from "../../helpers/animationTools";
import { MOVE_SPEED } from "../../constants/game-world";

type PatrolParams = {
    pointA: { x: number; y: number };
    pointB: { x: number; y: number };
    speed?: number;
    laps?: number;
    pauseAtEnds?: number;
};

const ARRIVAL_THRESHOLD = 5;

export const PatrolAction: ActionDefinition<PatrolParams> = {
    enter: (entity, { pointA, pointB, speed, laps = 2, pauseAtEnds = 300 }, _ctx, s) => {
        s.speed = speed ?? MOVE_SPEED;
        s.totalLaps = laps;
        s.lapsCompleted = 0;
        s.pauseDuration = pauseAtEnds;
        s.pauseTimer = 0;
        s.isPausing = false;
        s.previousAnim = entity.currentanim;
        s.previousMode = entity.animMode;
        s.points = [
            { x: pointA.x, y: pointA.y },
            { x: pointB.x, y: pointB.y },
        ];
        s.currentTarget = 0;

        entity.state.isMoving = true;
    },

    update: (entity, _params, dt, _ctx, s) => {
        if (s.isPausing) {
            s.pauseTimer += dt * (1000 / 60);
            if (s.pauseTimer >= s.pauseDuration) {
                s.isPausing = false;
                s.pauseTimer = 0;
            }
            return false;
        }

        const target = s.points[s.currentTarget];
        const dx = target.x - entity.x;
        const dy = target.y - entity.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ARRIVAL_THRESHOLD) {
            entity.x = target.x;
            entity.y = target.y;
            s.currentTarget = s.currentTarget === 0 ? 1 : 0;
            if (s.currentTarget === 0) {
                s.lapsCompleted++;
                if (s.totalLaps !== -1 && s.lapsCompleted >= s.totalLaps) {
                    return true;
                }
            }
            if (s.pauseDuration > 0) {
                s.isPausing = true;
                s.pauseTimer = 0;
                const nextTarget = s.points[s.currentTarget];
                const idleAngle = calculateAngle(
                    { x: entity.x, y: entity.y },
                    { x: nextTarget.x, y: nextTarget.y }
                );
                entity.currentanim = angleToIdleDirection(idleAngle);
                entity.animMode = "loop";
            }

            return false;
        }
        const angle = calculateAngle(
            { x: entity.x, y: entity.y },
            { x: target.x, y: target.y }
        );

        entity.x += Math.cos(angle) * s.speed * dt;
        entity.y += Math.sin(angle) * s.speed * dt;

        playAnimation(entity, angleToDirection(angle));
        return false;
    },

    exit: (entity, _p, _ctx, s) => {
        entity.state.isMoving = false;
        if (s.previousAnim) entity.currentanim = s.previousAnim;
        if (s.previousMode) entity.animMode = s.previousMode;
        else stopAnimation(entity);
    },
};
