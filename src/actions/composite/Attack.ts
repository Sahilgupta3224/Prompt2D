import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";
import { calculateAngle, angleToDirection } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";
import { playAnimationOnce } from "../../helpers/animationTools";

type AttackParams = {
    target: Entity;
    weapon: "gun" | "melee";
    damage?: number;
    range?: number;
    moveSpeed?: number;
};

const ATTACK_FRAMES = 7;
const MELEE_RANGE = 40;
const GUN_RANGE = 300;
const FRAME_SPEED = 0.15;

export const AttackAction: ActionDefinition<AttackParams> = {
    enter: (entity, { weapon, range }, _ctx, s) => {
        s.phase = "approach";
        s.range = range ?? (weapon === "melee" ? MELEE_RANGE : GUN_RANGE);
        s.frameTimer = 0;
        s.frame = 0;
        s.previousAnim = entity.currentanim;
        entity.state.isMoving = weapon === "melee";
    },

    update: (entity, { target, weapon, damage = 10, moveSpeed = MOVE_SPEED }, dt, _ctx, s) => {
        const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: target.x, y: target.y });
        const dir = angleToDirection(angle);

        if (s.phase === "approach") {
            const dx = target.x - entity.x;
            const dy = target.y - entity.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (weapon === "melee" && dist > s.range) {
                const speed = moveSpeed * dt;
                entity.x += Math.cos(angle) * speed;
                entity.y += Math.sin(angle) * speed;
                entity.currentanim = dir;
                return false;
            }

            entity.currentanim = dir;
            s.phase = "animating";
            entity.state.isMoving = false;
            return false;
        }

        if (s.phase === "animating") {
            s.frameTimer += FRAME_SPEED;
            if (s.frameTimer >= 1) {
                s.frameTimer = 0;
                s.frame++;

                if (s.frame === 4) {
                    target.state.hp = ((target.state.hp as number) ?? 100) - damage;
                    target.state.isHit = true;
                    playAnimationOnce(target, "HIT");
                }

                if (s.frame >= ATTACK_FRAMES) {
                    return true;
                }
            }
            return false;
        }

        return false;
    },

    exit: (entity, _params, _ctx, s) => {
        if (s.previousAnim) {
            entity.currentanim = s.previousAnim;
        }
        entity.state.isMoving = false;
    },
};
