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
    enter: (entity, { object, target }) => {
        entity.state.givePhase = "moving";
        entity.state.isMoving = true;

        if (!object.parent || object.parent !== entity) {
            object.parent = entity;
            object.localOffset = object.localOffset ?? { x: 0, y: 0 };
            entity.state.grabbedObject = object;
        }

        const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: target.x, y: target.y });
        entity.currentanim = angleToDirection(angle);
    },

    update: (entity, { object, target, reachDistance, moveSpeed = MOVE_SPEED }, dt) => {
        if (entity.state.givePhase === "moving") {
            const angle = calculateAngle({ x: entity.x, y: entity.y }, { x: target.x, y: target.y });
            const speed = moveSpeed * dt;

            entity.x += Math.cos(angle) * speed;
            entity.y += Math.sin(angle) * speed;
            entity.currentanim = angleToDirection(angle);

            if (reachedDestination({ x: entity.x, y: entity.y }, { x: target.x, y: target.y }, reachDistance)) {
                entity.state.givePhase = "transferred";
                entity.state.isMoving = false;

                delete entity.state.grabbedObject;

                object.parent = target;
                object.localOffset = { x: 0, y: 0 };
                target.state.grabbedObject = object;

                return true;
            }
        }

        return false;
    },

    exit: (entity) => {
        entity.state.isMoving = false;
        delete entity.state.givePhase;
    },
};
