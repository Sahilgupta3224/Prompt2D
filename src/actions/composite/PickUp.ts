import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";
import { calculateAngle, angleToDirection, reachedDestination } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";

type PickUpParams = {
    object: Entity;
    localOffset?: { x: number; y: number };
    attachmentPoint?: string;
    reachDistance?: number;
    moveSpeed?: number;
};

export const PickUpAction: ActionDefinition<PickUpParams> = {
    enter: (entity, { object }) => {
        entity.state.pickupPhase = "moving";
        entity.state.pickupTarget = object;
        entity.state.isMoving = true;

        const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: object.x, y: object.y });
        entity.currentanim = angleToDirection(angle);
    },

    update: (entity, { object, localOffset = { x: 0, y: 0 }, attachmentPoint, reachDistance , moveSpeed = MOVE_SPEED }, dt) => {
        if (entity.state.pickupPhase === "moving") {
            const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: object.x, y: object.y });
            const speed = moveSpeed * dt;

            entity.x += Math.cos(angle) * speed;
            entity.y += Math.sin(angle) * speed;
            entity.currentanim = angleToDirection(angle);

            if (reachedDestination({ x: entity.x, y: entity.y }, { x: object.x, y: object.y }, reachDistance)) {
                entity.state.pickupPhase = "grabbed";
                entity.state.isMoving = false;

                object.parent = entity;
                object.localOffset = localOffset;
                if (attachmentPoint) {
                    object.attachmentPoint = attachmentPoint;
                }
                entity.state.grabbedObject = object;

                return true;
            }
        }

        return false;
    },

    exit: (entity) => {
        entity.state.isMoving = false;
        delete entity.state.pickupPhase;
        delete entity.state.pickupTarget;
    },
};
