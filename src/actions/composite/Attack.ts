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
    enter: (entity, { weapon, range }) => {
        entity.state.attackPhase = "approach";
        entity.state.attackRange = range ?? (weapon === "melee" ? MELEE_RANGE : GUN_RANGE);
        entity.state.attackFrameTimer = 0;
        entity.state.attackFrame = 0;
        entity.state.attackPreviousAnim = entity.currentanim;
        entity.state.isAttacking = true;

        if (weapon === "melee") {
            entity.state.isMoving = true;
        }
    },

    update: (entity, { target, weapon, damage = 10, moveSpeed = MOVE_SPEED }, dt) => {
        const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: target.x, y: target.y });
        const dir = angleToDirection(angle);

        if (entity.state.attackPhase === "approach") {
            const dx = target.x - entity.x;
            const dy = target.y - entity.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (weapon === "melee" && dist > entity.state.attackRange) {
                const speed = moveSpeed * dt;
                entity.x += Math.cos(angle) * speed;
                entity.y += Math.sin(angle) * speed;
                entity.currentanim = dir;
                return false;
            }

            entity.currentanim = dir;
            entity.state.attackPhase = "animating";
            entity.state.isMoving = false;
            return false;
        }

        if (entity.state.attackPhase === "animating") {
            entity.state.attackFrameTimer += FRAME_SPEED;
            if (entity.state.attackFrameTimer >= 1) {
                entity.state.attackFrameTimer = 0;
                entity.state.attackFrame++;

                if (entity.state.attackFrame === 4) {
                    target.state.health = (target.state.health ?? 100) - damage;
                    target.state.lastHitBy = entity;
                    playAnimationOnce(target, "HIT");
                }

                if (entity.state.attackFrame >= ATTACK_FRAMES) {
                    return true;
                }
            }
            return false;
        }

        return false;
    },

    exit: (entity) => {
        if (entity.state.attackPreviousAnim) {
            entity.currentanim = entity.state.attackPreviousAnim;
        }
        entity.state.isAttacking = false;
        entity.state.isMoving = false;
        delete entity.state.attackPhase;
        delete entity.state.attackRange;
        delete entity.state.attackFrameTimer;
        delete entity.state.attackFrame;
        delete entity.state.attackPreviousAnim;
    },
};
