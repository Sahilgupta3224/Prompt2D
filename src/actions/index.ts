import type { ActionDefinition } from "../types/Action";
import { GrabAction } from "./composite/Grab";
import { MovePathAction } from "./movement/MovePath";
import { FollowAction } from "./movement/Follow";
import { LookAction } from "./movement/Look";
import { JumpAction } from "./physics/Jump";
import { ApplyForceAction } from "./physics/ApplyForce";
import { MoveAction } from "./movement/Move";

export const ACTION_REGISTRY: Record<string, ActionDefinition<any>> = {
    move: MoveAction,
    grab: GrabAction,
    movePath: MovePathAction,
    follow: FollowAction,
    look: LookAction,
    jump: JumpAction,
    applyForce: ApplyForceAction,
};