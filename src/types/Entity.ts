import { Container, Sprite, Texture } from "pixi.js";

export interface Entity{
    x:number,
    y:number,
    vx:number,
    vy:number,
    scale:number,
    parent?: Entity | null
    localOffset?: { x: number; y: number }
    // sprite: React.MutableRefObject<Sprite | null>
    currentanim: string,
    state: Record<string, any>;
    sprite: React.RefObject<Sprite | null>;
    container: React.RefObject<Container | null>;
    texture?: Texture | null;
}