import type { ActionDefinition } from "../types/Action";
import { GrabAction } from "./composite/index";
import { ThrowAction } from "./composite/index";
import { PickUpAction } from "./composite/index";
import { GiveAction } from "./composite/index";
import { DetachAction } from "./composite/index";
import { SetStateAction } from "./composite/index";
import { SitOnAction } from "./composite/index";
import { WaitAction } from "./composite/index";
import { SpeakAction } from "./composite/index";
import { EmoteAction } from "./composite/index";
import { SpawnAction } from "./composite/index";
import { DespawnAction } from "./composite/index";
import { AttackAction } from "./composite/index";
import { MovePathAction } from "./movement/index";
import { FollowAction } from "./movement/index";
import { LookAction } from "./movement/index";
import { FaceDirectionAction } from "./movement/index";
import { MoveAction } from "./movement/index";
import { TurnToAction } from "./movement/index";
import { TurnTowardsAction } from "./movement/index";
import { KnockBackAction } from "./movement/index";
import { AnyAction } from "./movement/index";
import { DanceAction } from "./movement/index";
import { JumpAction } from "./physics/index";
import { ApplyForceAction } from "./physics/index";
import { FadeAction } from "./effects/index";
import { RotateAction } from "./effects/index";
import { OscillateAction } from "./effects/index";
import { ShakeAction } from "./effects/index";
import { SpinAction } from "./composite/spin";
import { SleepAction } from "./composite/sleep";
import { CrawlAction } from "./composite/crawl";
export const ACTION_REGISTRY: Record<string, ActionDefinition<any>> = {
    sleep:SleepAction,
    spin:SpinAction,
    crawl:CrawlAction,
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
    faceDirection: FaceDirectionAction,
    jump: JumpAction,
    applyForce: ApplyForceAction,
    fade: FadeAction,
    rotate: RotateAction,
    oscillate: OscillateAction,
    shake: ShakeAction,
    any: AnyAction,
    dance: DanceAction,
    turnTo: TurnToAction,
    turnTowards: TurnTowardsAction,
    knockBack: KnockBackAction,
};