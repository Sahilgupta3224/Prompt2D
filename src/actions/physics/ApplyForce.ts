import type { ActionDefinition } from "../../types/Action"; //GOOD

type ApplyForceParams = {
    force: { x: number; y: number };
    duration?: number; 
    continuous?: boolean;
};
export const ApplyForceAction: ActionDefinition<ApplyForceParams> = {
    enter: (entity, { force, duration, continuous = false }) => {
        if (!entity.vx) entity.vx = 0;
        if (!entity.vy) entity.vy = 0;

        entity.state.appliedForce = force;
        entity.state.forceDuration = duration;
        entity.state.forceContinuous = continuous;
        entity.state.forceStartTime = Date.now();

        if (!continuous) {
            entity.vx += force.x;
            entity.vy += force.y;
        }
    },

    update: (entity, { force, duration, continuous = false }, delta) => {
        if (continuous) {
            entity.vx += force.x * delta * 0.1;
            entity.vy += force.y * delta * 0.1;
        }
        entity.x += entity.vx * delta;
        entity.y += entity.vy * delta;
        const dampingFactor = Math.pow(0.95, delta);
        entity.vx *= dampingFactor;
        entity.vy *= dampingFactor;

        if (duration !== undefined) {
            const elapsed = Date.now() - entity.state.forceStartTime;
            if (elapsed >= duration) {
                return true;
            }
        }

        if (!continuous && !duration) {
            const speed = Math.sqrt(entity.vx * entity.vx + entity.vy * entity.vy);
            return speed < 0.1; 
        }

        return false;
    },

    exit: (entity) => {
        delete entity.state.appliedForce;
        delete entity.state.forceDuration;
        delete entity.state.forceContinuous;
        delete entity.state.forceStartTime;
    },
};
