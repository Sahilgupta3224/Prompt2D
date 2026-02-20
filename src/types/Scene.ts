import type { TimelineNode } from "./Timeline";
import type { BackgroundName } from "../helpers/assets";
import type { ShapeName } from "../helpers/shapeFactory";

export interface EntityDefinition {
    id: string;
    type?: "character" | "object" | "prop";
    position: { x: number; y: number };
    scale?: number;
    spriteSheet?: string;
    frameWidth?: number;
    frameHeight?: number;
    isObject?: boolean;
    shape?: ShapeName;
    color?: string;
    animations?: Record<string, { row: number; frames: number }>;
    attachments?: Record<string, Record<string, { x: number; y: number } | { x: number; y: number }[]>>;
}

export interface SceneDefinition {
    id: string;
    name?: string;
    background?: BackgroundName;
    entities: EntityDefinition[];
    timeline: TimelineNode;
}
