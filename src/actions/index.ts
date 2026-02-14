import type { ActionDefinition } from "../types/Action";
import { GrabAction } from "./composite/Grab";
import { ThrowAction } from "./composite/Throw";
import { PickUpAction } from "./composite/PickUp";
import { GiveAction } from "./composite/Give";
import { DetachAction } from "./composite/Detach";
import { SetStateAction } from "./composite/SetState";
import { SitOnAction } from "./composite/SitOn";
import { WaitAction } from "./composite/Wait";
import { SpeakAction } from "./composite/Speak";
import { EmoteAction } from "./composite/Emote";
import { SpawnAction } from "./composite/Spawn";
import { DespawnAction } from "./composite/Despawn";
import { MovePathAction } from "./movement/MovePath";
import { FollowAction } from "./movement/Follow";
import { LookAction } from "./movement/Look";
import { FaceDirectionAction } from "./movement/FaceDirection";
import { JumpAction } from "./physics/Jump";
import { ApplyForceAction } from "./physics/ApplyForce";
import { MoveAction } from "./movement/Move";
import { FadeAction } from "./effects/index";
import { RotateAction } from "./effects/index";
import { OscillateAction } from "./effects/index";
import { ShakeAction } from "./effects/index";

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
    speak: SpeakAction,
    emote: EmoteAction,
    spawn: SpawnAction,
    despawn: DespawnAction,
    movePath: MovePathAction,
    follow: FollowAction,
    look: LookAction,
    faceDirection: FaceDirectionAction,
    jump: JumpAction,
    applyForce: ApplyForceAction,
    Fade: FadeAction,
    Rotate: RotateAction,
    Oscillate: OscillateAction,
    Shake: ShakeAction
};