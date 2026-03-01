import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";
import { calculateAngle, angleToDirection, reachedDestination } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";
import { playAnimation, stopAnimation, freezeFrame } from "../../helpers/animationTools";

type PickUpParams = {
    object: Entity;
    localOffset?: { x: number; y: number };
    attachmentPoint?: string;
    reachDistance?: number;
    moveSpeed?: number;
};

export const PickUpAction: ActionDefinition<PickUpParams> = {
    enter: (entity, { object }, _ctx, s) => {
        if (object.parent && object.parent !== entity) {
            delete object.parent.state.heldObjectId;
            object.parent = null;
            delete object.localOffset;
            delete object.attachmentPoint;
        }

        s.phase = "moving";
        entity.state.isMoving = true;

        const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: object.x, y: object.y });
        playAnimation(entity, angleToDirection(angle));
    },

    update: (entity, { object, localOffset = { x: 0, y: 0 }, attachmentPoint, reachDistance, moveSpeed = MOVE_SPEED }, dt, _ctx, s) => {

        if (s.phase !== "moving") return false;

        if (object.parent && object.parent !== entity) {
            return true;
        }

        const angle = calculateAngle(
            { x: entity.x, y: entity.y },
            { x: object.x, y: object.y }
        );
        const speed = moveSpeed * dt;

        entity.x += Math.cos(angle) * speed;
        entity.y += Math.sin(angle) * speed;
        playAnimation(entity, angleToDirection(angle));

        if (reachedDestination({ x: entity.x, y: entity.y }, { x: object.x, y: object.y }, reachDistance)) {
            entity.state.isMoving = false;
            s.phase = "grabbed";

            object.parent = entity;
            object.localOffset = localOffset;
            if (attachmentPoint) {
                object.attachmentPoint = attachmentPoint;
            }
            entity.state.heldObjectId = object.id;

            stopAnimation(entity);
            return true;
        }

        return false;
    },

    exit: (entity) => {
        entity.state.isMoving = false;
        stopAnimation(entity);
    },
};
