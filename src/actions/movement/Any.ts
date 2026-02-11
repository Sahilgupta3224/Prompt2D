import type { ActionDefinition } from "../../types/Action";

type AnyParams = {Name: string, time: Number}
export const AnyAction: ActionDefinition<AnyParams> = {
  enter: (entity,{Name}) => {
    switch (Name) {
        case "CROUCH":
            entity.currentanim = "CROUCH";
            break;
        default:
            entity.currentanim = "STILL";
            break;
    }
    entity.state.isCrouching = true;
    entity.state.ActionStartTime = Date.now();
  },
  update: (entity,{time}) => {
    if(time){
        if(Date.now()-entity.state.ActionStartTime==time){
            return true;
        }
    }
    return false;
  },
  exit: (entity) => {
    entity.state.isCrouching = false;
  },
};