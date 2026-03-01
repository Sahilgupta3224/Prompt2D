import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";
import { calculateAngle, angleToDirection, reachedDestination } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";
import { playAnimation, stopAnimation } from "../../helpers/animationTools";

type GiveParams = {
    object: Entity;
    target: Entity;
    reachDistance?: number;
    moveSpeed?: number;
};

export const GiveAction: ActionDefinition<GiveParams> = {
    enter: (entity, { object, target }, _ctx, s) => {
        if (!target) {
            s.aborted = true;
            return;
        }

        s.phase = "moving";
        s.aborted = false;

        if (!object.parent || object.parent !== entity) {
            if (object.parent) {
                delete object.parent.state.heldObjectId;
                // original parent se object remove karne ka code likhna h
            }
            object.parent = entity;
            object.localOffset = object.localOffset ?? { x: 0, y: 0 };
            entity.state.heldObjectId = object.id;
        }

        entity.state.isMoving = true;
        const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: target.x, y: target.y });
        playAnimation(entity, angleToDirection(angle));
    },

    update: (entity, { object, target, reachDistance = 60, moveSpeed = MOVE_SPEED }, dt, _ctx, s) => {
        if (s.aborted) return true;
        if (!target) return true; // need to write these base cases in every primitive
        if (s.phase === "moving") {
            const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: target.x, y: target.y });
            const speed = moveSpeed * dt;

            entity.x += Math.cos(angle) * speed;
            entity.y += Math.sin(angle) * speed;
            playAnimation(entity, angleToDirection(angle));

            if (reachedDestination({ x: entity.x, y: entity.y }, { x: target.x, y: target.y }, reachDistance)) {
                s.phase = "transferred";
                entity.state.isMoving = false;

                delete entity.state.heldObjectId;
                object.parent = null;
                delete object.localOffset;
                // delete object.attachmentPoint;

                object.parent = target;
                object.localOffset = { x: 0, y: 0 };
                target.state.heldObjectId = object.id;

                stopAnimation(entity);
                return true;
            }
        }

        return false;
    },

    exit: (entity) => {
        entity.state.isMoving = false;
        stopAnimation(entity);
    },
};
