import type { Entity } from "../types/Entity";

export function playAnimation(entity: Entity, anim: string) {
    entity.currentanim = anim;
    entity.animMode = "loop";
    entity.animFinished = false;
}

export function playAnimationOnce(entity: Entity, anim: string) {
    entity.currentanim = anim;
    entity.animMode = "once";
    entity.animFinished = false;
}

export function stopAnimation(entity: Entity) {
    entity.animMode = "static";
}

export function freezeFrame(entity: Entity) {
    entity.animMode = "freeze";
}

export function setPose(entity: Entity, poseName: string) {
    entity.currentanim = poseName;
    entity.animMode = "static";
    entity.animFinished = false;
}