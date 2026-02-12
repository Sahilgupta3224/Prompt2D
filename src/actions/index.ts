import type { ActionDefinition } from "../types/Action";
import { GrabAction } from "./composite/Grab";
import { ThrowAction } from "./composite/Throw";
import { PickUpAction } from "./composite/PickUp";
import { GiveAction } from "./composite/Give";
import { MovePathAction } from "./movement/MovePath";
import { FollowAction } from "./movement/Follow";
import { LookAction } from "./movement/Look";
import { JumpAction } from "./physics/Jump";
import { ApplyForceAction } from "./physics/ApplyForce";
import { MoveAction } from "./movement/Move";
import { DetachAction } from "./composite/Detach";

export const ACTION_REGISTRY: Record<string, ActionDefinition<any>> = {
    move: MoveAction,
    grab: GrabAction,
    throw: ThrowAction,
    pickUp: PickUpAction,
    give: GiveAction,
    movePath: MovePathAction,
    follow: FollowAction,
    look: LookAction,
    jump: JumpAction,
    applyForce: ApplyForceAction,
    detach: DetachAction,
};