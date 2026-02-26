import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";
import { calculateAngle, angleToDirection, reachedDestination } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";

type GiveParams = {
    object: Entity;
    target: Entity;
    reachDistance?: number;
    moveSpeed?: number;
};

export const GiveAction: ActionDefinition<GiveParams> = {
    enter: (entity, { object, target }, _ctx, s) => {
        s.phase = "moving";
        entity.state.isMoving = true;

        if (!object.parent || object.parent !== entity) {
            object.parent = entity;
            object.localOffset = object.localOffset ?? { x: 0, y: 0 };
            entity.state.heldObjectId = object.id;
        }

        const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: target.x, y: target.y });
        entity.currentanim = angleToDirection(angle);
    },

    update: (entity, { object, target, reachDistance, moveSpeed = MOVE_SPEED }, dt, _ctx, s) => {
        if (s.phase === "moving") {
            const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: target.x, y: target.y });
            const speed = moveSpeed * dt;

            entity.x += Math.cos(angle) * speed;
            entity.y += Math.sin(angle) * speed;
            entity.currentanim = angleToDirection(angle);

            if (reachedDestination({ x: entity.x, y: entity.y }, { x: target.x, y: target.y }, reachDistance)) {
                s.phase = "transferred";
                entity.state.isMoving = false;

                delete entity.state.heldObjectId;

                object.parent = target;
                object.localOffset = { x: 0, y: 0 };
                target.state.heldObjectId = object.id;

                return true;
            }
        }

        return false;
    },

    exit: (entity) => {
        entity.state.isMoving = false;
    },
};
