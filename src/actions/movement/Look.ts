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
    enter: (entity, { target, direction, angle, instant = false }) => {
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

        if (!entity.state.rotation) {
            entity.state.rotation = 0;
        }

        entity.state.lookTargetAngle = targetAngle;
        entity.state.lookInstant = instant;

        if (instant) {
            entity.state.rotation = targetAngle;
            const sprite = entity.sprite.current;
            if (sprite) {
                sprite.rotation = targetAngle;
            }
        }
    },

    update: (entity, { instant = false }, delta) => {
        if (instant) return true;

        const targetAngle = entity.state.lookTargetAngle;
        const currentAngle = entity.state.rotation || 0;

        // Calculate shortest rotation direction
        let angleDiff = targetAngle - currentAngle;

        // Normalize to -PI to PI range
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

        // Smooth rotation (5 degrees per frame scaled by delta)
        const rotationSpeed = (5 * Math.PI / 180) * delta;

        if (Math.abs(angleDiff) < rotationSpeed) {
            entity.state.rotation = targetAngle;
        } else {
            entity.state.rotation += Math.sign(angleDiff) * rotationSpeed;
        }

        // Update sprite rotation
        const sprite = entity.sprite.current;
        if (sprite) {
            sprite.rotation = entity.state.rotation;
        }

        return Math.abs(angleDiff) < 0.01; // Complete when close enough
    },

    exit: (entity) => {
        delete entity.state.lookTargetAngle;
        delete entity.state.lookInstant;
    },
};
