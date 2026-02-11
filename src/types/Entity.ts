import { Container, Sprite, Texture } from "pixi.js";

export interface Entity {
    x: number,
    y: number,
    vx: number,
    vy: number,
    scale: number,
    parent?: Entity | null
    localOffset?: { x: number; y: number }
    currentanim: string,
    state: Record<string, any>;
    sprite: React.RefObject<Sprite | null>;
    container: React.RefObject<Container | null>;
    texture?: Texture | null;
    attachmentPoint?: string;
    attachmentConfig?: Record<string, Record<string, { x: number, y: number } | { x: number, y: number }[]>>;
    currentFrame?: number;
}