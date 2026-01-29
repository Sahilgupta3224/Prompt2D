import { Sprite } from "pixi.js";

export interface Object{
    x:number,
    y:number,
    vx:number,
    vy:number,
    scale:number,
    sprite: React.MutableRefObject<Sprite | null>
    currentanim: string,
    state: Record<string, any>;
}