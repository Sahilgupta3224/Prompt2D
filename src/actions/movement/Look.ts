import type { ActionDefinition } from "../../types/Action";
import type { Entity } from "../../types/Entity";
import { calculateAngle } from "../../helpers/common";

type LookParams = {
    target?: Entity | { x: number; y: number };
    direction?: { x: number; y: number };
    angle?: number;
    instant?: boolean;
};

export const LookAction: ActionDefinition<LookParams> = {
    enter: (entity, { target, direction, angle, instant = false }, _ctx, s) => {
        let targetAngle: number;

        if (angle !== undefined) {
            targetAngle = angle;
        } else if (direction) {
            targetAngle = Math.atan2(direction.y, direction.x);
        } else if (target) {
            const targetPos = "x" in target && "y" in target
                ? { x: target.x, y: target.y }
                : target;
            targetAngle = calculateAngle({ x: entity.x, y: entity.y }, targetPos);
        } else {
            throw new Error("Look action requires target, direction, or angle");
        }

        const sprite = entity.sprite.current;
        s.currentRotation = sprite ? sprite.rotation : 0;
        s.targetAngle = targetAngle;
        s.instant = instant;

        if (instant && sprite) {
            sprite.rotation = targetAngle;
        }
    },

    update: (entity, { instant = false }, delta, _ctx, s) => {
        if (instant) return true;

        const currentAngle = s.currentRotation || 0;

        let angleDiff = s.targetAngle - currentAngle;

        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

        const rotationSpeed = (5 * Math.PI / 180) * delta;

        if (Math.abs(angleDiff) < rotationSpeed) {
            s.currentRotation = s.targetAngle;
        } else {
            s.currentRotation += Math.sign(angleDiff) * rotationSpeed;
        }

        const sprite = entity.sprite.current;
        if (sprite) {
            sprite.rotation = s.currentRotation;
        }

        return Math.abs(angleDiff) < 0.01;
    },
};
