import type { ActionDefinition } from "../types/Action";
import { CrawlAction, CrouchAction, SitOnAction, SleepAction } from "./body/index";
import { EmoteAction, FadeAction, OscillateAction, RotateAction, ShakeAction, SpeakAction } from "./effects/index";
import { AttackAction, DetachAction, GiveAction, GrabAction, HealAction, PickUpAction, ThrowAction, WaveAction } from "./interaction/index";
import { AnyAction, DanceAction, FaceDirectionAction, FleeAction, FollowAction, LookAction, MoveAction, MovePathAction, PatrolAction, TurnToAction, TurnTowardsAction, WanderAction } from "./movement/index";
import { ApplyForceAction, JumpAction, KnockBackAction, SpinAction } from "./physics/index";
import { DespawnAction, SetStateAction, SpawnAction, WaitAction } from "./scene/index";

export const ACTION_REGISTRY: Record<string, ActionDefinition<any>> = {
    sleep: SleepAction,
    wander: WanderAction,
    crouch: CrouchAction,  //bad
    spin: SpinAction,
    crawl: CrawlAction,  // bad
    move: MoveAction,
    grab: GrabAction,
    throw: ThrowAction,
    pickUp: PickUpAction,
    give: GiveAction,
    detach: DetachAction,
    setState: SetStateAction,
    sitOn: SitOnAction,
    wait: WaitAction,
    attack: AttackAction,
    speak: SpeakAction,
    emote: EmoteAction,
    spawn: SpawnAction,
    despawn: DespawnAction,
    movePath: MovePathAction,
    follow: FollowAction,
    look: LookAction,
    faceDirection: FaceDirectionAction,  //bad
    jump: JumpAction,
    applyForce: ApplyForceAction,
    fade: FadeAction,
    rotate: RotateAction,
    oscillate: OscillateAction,
    shake: ShakeAction,
    any: AnyAction,  //bad
    dance: DanceAction,
    turnTo: TurnToAction,
    turnTowards: TurnTowardsAction,
    knockBack: KnockBackAction,  //bad
    heal: HealAction,
    wave: WaveAction,
    flee: FleeAction,
    patrol: PatrolAction
};