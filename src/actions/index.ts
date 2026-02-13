import type { ActionDefinition } from "../types/Action";
import { GrabAction } from "./composite/Grab";
import { ThrowAction } from "./composite/Throw";
import { PickUpAction } from "./composite/PickUp";
import { GiveAction } from "./composite/Give";
import { DetachAction } from "./composite/Detach";
import { SetStateAction } from "./composite/SetState";
import { SitOnAction } from "./composite/SitOn";
import { WaitAction } from "./composite/Wait";
import { MovePathAction } from "./movement/MovePath";
import { FollowAction } from "./movement/Follow";
import { LookAction } from "./movement/Look";
import { FaceDirectionAction } from "./movement/FaceDirection";
import { JumpAction } from "./physics/Jump";
import { ApplyForceAction } from "./physics/ApplyForce";
import { MoveAction } from "./movement/Move";

export const ACTION_REGISTRY: Record<string, ActionDefinition<any>> = {
    move: MoveAction,
    grab: GrabAction,
    throw: ThrowAction,
    pickUp: PickUpAction,
    give: GiveAction,
    detach: DetachAction,
    setState: SetStateAction,
    sitOn: SitOnAction,
    wait: WaitAction,
    movePath: MovePathAction,
    follow: FollowAction,
    look: LookAction,
    faceDirection: FaceDirectionAction,
    jump: JumpAction,
    applyForce: ApplyForceAction,
};
