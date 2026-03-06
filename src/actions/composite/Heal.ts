import type { ActionDefinition } from "../../types/Action";
import { calculateAngle, angleToAttackDirection, angleToDirection } from "../../helpers/common";
import { playAnimationOnce, stopAnimation } from "../../helpers/animationTools";
import { MOVE_SPEED } from "../../constants/game-world";

type HealParams = {
    target: import("../../types/Entity").Entity;
    amount?: number;
    duration?: number;
    range?: number;
    moveSpeed?: number;
};

const HEAL_RANGE = 80;
const CAST_DURATION = 1200;

export const HealAction: ActionDefinition<HealParams> = {
    enter: (entity, { range, moveSpeed }, _ctx, s) => {
        s.phase = "approach";
        s.elapsed = 0;
        s.castTimer = 0;
        s.range = range ?? HEAL_RANGE;
        s.moveSpeed = moveSpeed ?? MOVE_SPEED;
        s.previousAnim = entity.currentanim;
        s.previousMode = entity.animMode;
        s.healed = false;
    },

    update: (entity, { target, amount = 30, duration = CAST_DURATION }, dt, _ctx, s) => {
        if (!target) return true;

        const dx = target.x - entity.x;
        const dy = target.y - entity.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = calculateAngle(
            { x: entity.x, y: entity.y },
            { x: target.x, y: target.y }
        );

        if (s.phase === "approach") {
            if (dist > s.range) {
                entity.x += Math.cos(angle) * s.moveSpeed * dt;
                entity.y += Math.sin(angle) * s.moveSpeed * dt;
                entity.state.isMoving = true;
                entity.currentanim = angleToDirection(angle);
                entity.animMode = "loop";
                return false;
            }
            entity.state.isMoving = false;
            s.phase = "cast";
            s.castTimer = 0;
            playAnimationOnce(entity, angleToAttackDirection(angle, "spell"));
            target.state.isMagic = true;
            return false;
        }

        if (s.phase === "cast") {
            s.castTimer += dt * (1000 / 60);

            if (!s.healed && s.castTimer >= duration * 0.5) {
                s.healed = true;
                if (typeof target.state.hp !== "number") {
                    target.state.hp = 100;
                }
                target.state.hp = Math.min(100, target.state.hp + amount);
                target.state.isHealing = true;
            }

            if (s.castTimer >= duration) {
                return true;
            }
        }

        return false;
    },

    exit: (entity, { target }, _ctx, s) => {
        entity.state.isMoving = false;
        if (target) {
            target.state.isMagic = false;
            target.state.isHealing = false;
        }
        if (s.previousAnim) entity.currentanim = s.previousAnim;
        if (s.previousMode) entity.animMode = s.previousMode;
        else stopAnimation(entity);
    },
};
