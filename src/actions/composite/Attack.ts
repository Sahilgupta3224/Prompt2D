import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";
import { calculateAngle, angleToDirection } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";
import { playAnimation, playAnimationOnce, stopAnimation } from "../../helpers/animationTools";

type AttackParams = {
    target: Entity;
    weapon: "gun" | "melee";
    damage?: number;
    range?: number;
    moveSpeed?: number;
};

const MELEE_RANGE = 60;
const GUN_RANGE = 300;
const FRAME_DURATION = 100; 

export const AttackAction: ActionDefinition<AttackParams> = {
    enter: (entity, { weapon, range }, _ctx, s) => {
        s.phase = "approach";
        s.range = range ?? (weapon === "melee" ? MELEE_RANGE : GUN_RANGE);
        s.frameTimer = 0;
        s.hitDealt = false;
        s.previousAnim = entity.currentanim;
        s.previousMode = entity.animMode;
        entity.state.isMoving = weapon === "melee";
    },

    update: (entity, { target, weapon, damage = 10, moveSpeed = MOVE_SPEED }, dt, _ctx, s) => {
        if (!target) return true;

        const dx = target.x - entity.x;
        const dy = target.y - entity.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: target.x, y: target.y });

        if (s.phase === "approach") {
            if (weapon === "melee" && dist > s.range) {
                const speed = moveSpeed * dt;
                entity.x += Math.cos(angle) * speed;
                entity.y += Math.sin(angle) * speed;
                playAnimation(entity, angleToDirection(angle));
                return false;
            }

            stopAnimation(entity);
            entity.state.isMoving = false;
            s.phase = "strike";
            s.frameTimer = 0;
            return false;
        }

        if (s.phase === "strike") {
            s.frameTimer += dt * (1000 / 60);

            if (!s.hitDealt && s.frameTimer >= FRAME_DURATION * 3) {
                s.hitDealt = true;
                if (typeof target.state.hp !== "number") {
                    target.state.hp = 100;
                }
                target.state.hp -= damage;
                target.state.isHit = true;
                playAnimationOnce(target, "HIT");
            }

            if (s.frameTimer >= FRAME_DURATION * 7) {
                target.state.isHit = false;
                return true;
            }
        }

        return false;
    },

    exit: (entity, _p, _ctx, s) => {
        entity.state.isMoving = false;
        if (s.previousAnim) {
            entity.currentanim = s.previousAnim;
        }
        if (s.previousMode) {
            entity.animMode = s.previousMode;
        } else {
            stopAnimation(entity);
        }
    },
};
