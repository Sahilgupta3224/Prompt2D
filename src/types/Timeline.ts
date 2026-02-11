export type TimelineNode =
    ActionNode
    | SequenceNode
    | ParallelNode
    | LoopNode;

export interface ActionNode {
    type: "action";
    name: string;
    params: any;
    id?: string;
}

export interface SequenceNode {
    type: "sequence";
    children: TimelineNode[];
    id?: string;
}

export interface ParallelNode {
    type: "parallel";
    children: TimelineNode[];
    id?: string;
}

export interface LoopNode {
    type: "loop";
    iterations: number;
    child: TimelineNode;
    id?: string;
}

export interface NodeState {
    completed: boolean;
    active: boolean;
    sequenceIndex?: number;
    loopCounter?: number;
    childrenStates?: NodeState[];
    childState?: NodeState;
    actionState?: any;
}
