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