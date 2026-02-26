import type { Entity } from "./Entity";
import type { EntityRegistry } from "../core/EntityRegistry";

export interface ActionContext {
  registry: EntityRegistry;
}

export type ActionState = Record<string, any>;

export interface ActionDefinition<TParams = void> {
  enter?: (entity: Entity, params: TParams, ctx: ActionContext, actionState: ActionState) => void;
  update: (entity: Entity, params: TParams, dt: number, ctx: ActionContext, actionState: ActionState) => boolean;
  exit?: (entity: Entity, params: TParams, ctx: ActionContext, actionState: ActionState) => void;
}