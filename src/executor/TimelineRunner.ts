import type { Entity } from "../types/Entity";
import type { ActionContext } from "../types/Action";
import type { TimelineNode, NodeState, ActionNode, SequenceNode, ParallelNode, LoopNode } from "../types/Timeline";
import { ACTION_REGISTRY } from "../actions";
import { EntityRegistry } from "../core/EntityRegistry";

export class TimelineRunner {
    private rootNode: TimelineNode;
    private rootState: NodeState;
    private entity: Entity;
    private ctx: ActionContext;

    constructor(plan: TimelineNode, entity: Entity, registry: EntityRegistry) {
        this.rootNode = plan;
        this.entity = entity;
        this.ctx = { registry };
        this.rootState = this.createState(plan);
    }

    private createState(node: TimelineNode): NodeState {
        const state: NodeState = { completed: false, active: true };

        switch (node.type) {
            case "sequence":
                state.sequenceIndex = 0;
                state.childrenStates = node.children.map(c => this.createState(c));
                if (state.childrenStates.length > 0) {
                    state.childrenStates[0].active = true;
                    for (let i = 1; i < state.childrenStates.length; i++) {
                        state.childrenStates[i].active = false;
                    }
                } else {
                    state.completed = true;
                }
                break;

            case "parallel":
                state.childrenStates = node.children.map(c => this.createState(c));
                break;

            case "loop":
                state.loopCounter = 0;
                state.childState = this.createState(node.child);
                break;

            case "action":
                state.actionState = {};
                break;
        }

        return state;
    }

    public update(dt: number): boolean {
        if (this.rootState.completed) return true;

        this.processNode(this.rootNode, this.rootState, dt);

        return this.rootState.completed;
    }

    private processNode(node: TimelineNode, state: NodeState, dt: number) {
        if (state.completed || !state.active) return;

        switch (node.type) {
            case "action":
                this.processAction(node as ActionNode, state, dt);
                break;
            case "sequence":
                this.processSequence(node as SequenceNode, state, dt);
                break;
            case "parallel":
                this.processParallel(node as ParallelNode, state, dt);
                break;
            case "loop":
                this.processLoop(node as LoopNode, state, dt);
                break;
        }
    }

    private processAction(node: ActionNode, state: NodeState, dt: number) {
        const actionDef = ACTION_REGISTRY[node.name];
        if (!actionDef) {
            console.warn(`Action '${node.name}' not found.`);
            state.completed = true;
            return;
        }

        const targetEntity = node.entityId
            ? this.ctx.registry.get(node.entityId) ?? this.entity
            : this.entity;

        const resolvedParams = this.ctx.registry.resolveParams(node.params ?? {});
        const aState = state.actionState;

        if (!aState.started) {
            actionDef.enter?.(targetEntity, resolvedParams, this.ctx, aState);
            aState.started = true;
        }

        const isComplete = actionDef.update(targetEntity, resolvedParams, dt, this.ctx, aState);

        if (isComplete) {
            actionDef.exit?.(targetEntity, resolvedParams, this.ctx, aState);
            state.completed = true;
        }
    }

    private processSequence(node: SequenceNode, state: NodeState, dt: number) {
        while (!state.completed) {
            const idx = state.sequenceIndex || 0;
            if (idx >= node.children.length) {
                state.completed = true;
                break;
            }

            const currentChild = node.children[idx];
            const childState = state.childrenStates![idx];

            childState.active = true;
            this.processNode(currentChild, childState, dt);

            if (childState.completed) {
                childState.active = false;
                state.sequenceIndex = (state.sequenceIndex || 0) + 1;

                if (state.sequenceIndex >= node.children.length) {
                    state.completed = true;
                }
                // Continue the while loop to start the next child in the same frame!
            } else {
                // Current child is still working, exit the loop for this frame.
                break;
            }
        }
    }

    private processParallel(node: ParallelNode, state: NodeState, dt: number) {
        let allComplete = true;

        node.children.forEach((child, i) => {
            const childState = state.childrenStates![i];
            if (!childState.completed) {
                this.processNode(child, childState, dt);
                if (!childState.completed) {
                    allComplete = false;
                }
            }
        });

        if (allComplete) {
            state.completed = true;
        }
    }

    private processLoop(node: LoopNode, state: NodeState, dt: number) {
        const child = node.child;
        const childState = state.childState!;

        this.processNode(child, childState, dt);

        if (childState.completed) {
            state.loopCounter!++;
            if (node.iterations !== -1 && state.loopCounter! >= node.iterations) {
                state.completed = true;
            } else {
                state.childState = this.createState(child);
            }
        }
    }
}
