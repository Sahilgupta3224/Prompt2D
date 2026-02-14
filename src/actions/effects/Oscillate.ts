import type { ActionDefinition } from "../../types/Action";

type OscillateParams = {
    amplitude: number,
    frequency?: number,
    axis?: "x" | "y" | "both",
    duration?: number
};

export const OscillateAction: ActionDefinition<OscillateParams> = {
    enter: (entity, { amplitude, frequency = 1, axis = "both", duration }) => {
        entity.state.oscillateCenter = { x: entity.x, y: entity.y };
        entity.state.oscillateAmplitude = { x: amplitude, y: amplitude };
        entity.state.oscillateFrequency = frequency;
        entity.state.oscillateAxis = axis;
        entity.state.oscillateDuration = duration;
        entity.state.oscillateStartTime = Date.now();
        entity.state.oscillatePhase = 0;
    },

    update: (entity, { frequency = 1, axis = "both", duration }, delta) => {
        const elapsed = Date.now() - entity.state.oscillateStartTime;
        if (duration !== undefined && elapsed >= duration) {
            entity.x = entity.state.oscillateCenter.x;
            entity.y = entity.state.oscillateCenter.y;
            return true;
        }

        entity.state.oscillatePhase += 2 * Math.PI * frequency * delta * 0.016;

        const { oscillateCenter, oscillateAmplitude } = entity.state;
        const phase = entity.state.oscillatePhase;

        if (axis === "x" || axis === "both") {
            entity.x = oscillateCenter.x + oscillateAmplitude.x * Math.sin(phase);
        }
        if (axis === "y" || axis === "both") {
            entity.y = oscillateCenter.y + oscillateAmplitude.y * Math.sin(phase);
        }
        console.log(entity.x)

        return false;
    },

    exit: (entity) => {
        if (entity.state.oscillateCenter) {
            entity.x = entity.state.oscillateCenter.x;
            entity.y = entity.state.oscillateCenter.y;
        }

        delete entity.state.oscillateCenter;
        delete entity.state.oscillateAmplitude;
        delete entity.state.oscillateFrequency;
        delete entity.state.oscillateAxis;
        delete entity.state.oscillateDuration;
        delete entity.state.oscillateStartTime;
        delete entity.state.oscillatePhase;
    },
};
