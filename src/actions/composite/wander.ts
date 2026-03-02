import type { ActionDefinition } from "../../types/Action";
import { calculateAngle,angleToDirection } from "../../helpers/common";
import { MOVE_SPEED } from "../../constants/game-world";

const ARRIVAL_THRESHOLD=5;
interface WanderParams{
    destination:{x:Number;y:Number};
    speed:Number;
    HandMovement:Boolean;
}

export const WanderAction:ActionDefinition<WanderParams>={
    enter(entity,params,ctx,state){
        state.elapsed=0;
        state.startX=entity.x;
        state.startY=entity.y;
        state.targetX=params.destination.x;
        state.targetY=params.destination.y;
        state.speed=params.speed??MOVE_SPEED*0.5
        entity.state.isMoving=true;
        if(params.HandMovement!==false){
            entity.animMode="loop";
        }
    },
    update(entity,params,dt,ctx,state){
         const dx=state.targetX-entity.x;
         const dy=state.targetY-entity.y;
         const dist=Math.sqrt(dx*dx+dy*dy);
         if(dist<ARRIVAL_THRESHOLD){
            return true;
         }
         const angle=calculateAngle(
            {
                x:entity.x,y:entity.y
            },
            {
                x:state.targetX,
                y:state.targetY
            }
         )
         const dir=angleToDirection(angle)
         entity.currentanim=dir;
         entity.x+=Math.cos(angle)*state.speed;
         entity.y+=Math.sin(angle)*state.speed;
         return false;
    },
    exit(entity){
       entity.state.isMoving=false;
       entity.animMode="static";
    }
}