import { Container, Sprite, Texture } from "pixi.js";
import type { ShapeName } from "../helpers/shapeFactory";

export interface EntityState {
    isMoving?: boolean;
    isJumping?: boolean;
    heldObjectId?: string;
    isSitting?: boolean;
    hp?: number;
    isHit?: boolean;
    [key: string]: unknown;
}

export interface Entity {
    id: string,
    x: number,
    y: number,
    vx: number,
    vy: number,
    scale: number,
    zIndex: number,
    parent?: Entity | null
    localOffset?: { x: number; y: number } | null
    currentanim: string,
    state: EntityState;
    sprite: React.RefObject<Sprite | null>;
    container: React.RefObject<Container | null>;
    texture?: Texture | null;
    attachmentPoint?: string;
    attachmentConfig?: Record<string, Record<string, { x: number, y: number } | { x: number, y: number }[]>>;
    currentFrame?: number;
    animMode?: "loop" | "once" | "static" | "freeze";
    animFinished?: boolean;
    isObject?: boolean;
    shape?: ShapeName;
    color?: string;
}