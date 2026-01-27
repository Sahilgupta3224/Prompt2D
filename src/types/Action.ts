import type { Entity } from "./Entity";

export interface ActionDefinition<TParams = any> {
  enter?: (entity: Entity, params: TParams) => void;
  update: (entity: Entity, params: TParams, dt: number) => boolean;
  exit?: (entity: Entity) => void;
}