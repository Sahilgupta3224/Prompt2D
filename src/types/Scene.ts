import type { TimelineNode } from "./Timeline";

export interface EntityDefinition {
    id: string;
    type?: "character" | "object" | "prop";
    position: { x: number; y: number };
    scale?: number;
    spriteSheet?: string;
    frameWidth?: number;
    frameHeight?: number;
    animations?: Record<string, { row: number; frames: number }>;
    attachments?: Record<string, Record<string, { x: number; y: number } | { x: number; y: number }[]>>;
}

export interface SceneDefinition {
    id: string;
    name?: string;
    background?: string;
    entities: EntityDefinition[];
    timeline: TimelineNode;
}
