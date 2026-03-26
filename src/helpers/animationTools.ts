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

export function playAnimationReverse(entity: Entity, anim: string) {
    entity.currentanim = anim;
    entity.animMode = "reverse";
    entity.animFinished = false;
}

export function stopAnimation(entity: Entity) {
    const anim = entity.currentanim;
    if (anim.endsWith("UP")) entity.currentanim = "IDLEUP";
    if (anim.endsWith("LEFT")) entity.currentanim = "IDLELEFT";
    if (anim.endsWith("DOWN")) entity.currentanim = "IDLEDOWN";
    if (anim.endsWith("RIGHT")) entity.currentanim = "IDLERIGHT";
    else entity.currentanim = "IDLEDOWN";
    entity.animMode = "static";
    entity.animFinished = true;
}

export function freezeFrame(entity: Entity) {
    entity.animMode = "freeze";
}

export function setPose(entity: Entity, poseName: string) {
    entity.currentanim = poseName;
    entity.animMode = "static";
    entity.animFinished = false;
}