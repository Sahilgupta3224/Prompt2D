import type { Entity } from "./Entity";
import type { EntityRegistry } from "../core/EntityRegistry";

export interface ActionContext {
  registry: EntityRegistry;
}

export interface ActionDefinition<TParams = void> {
  enter?: (entity: Entity, params: TParams, ctx: ActionContext) => void;
  update: (entity: Entity, params: TParams, dt: number, ctx: ActionContext) => boolean;
  exit?: (entity: Entity, params: TParams, ctx: ActionContext) => void;
}