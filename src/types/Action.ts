import type { Entity } from "./Entity";

export interface ActionDefinition<TParams = void> {
  enter?: (entity: Entity, params: TParams) => void;
  update: (entity: Entity, params: TParams, dt: number) => boolean;
  exit?: (entity: Entity, params: TParams) => void;
}