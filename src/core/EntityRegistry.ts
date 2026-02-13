import { createRef } from "react";
import { Container, Sprite } from "pixi.js";
import type { Entity } from "../types/Entity";
import type { EntityDefinition } from "../types/Scene";

type ChangeListener = () => void;

export class EntityRegistry {
    private entities: Map<string, Entity> = new Map();
    private listeners: Set<ChangeListener> = new Set();

    register(id: string, entity: Entity): void {
        this.entities.set(id, entity);
        this.notify();
    }

    get(id: string): Entity | undefined {
        return this.entities.get(id);
    }

    remove(id: string): void {
        this.entities.delete(id);
        this.notify();
    }

    getAll(): Entity[] {
        return Array.from(this.entities.values());
    }

    getAllEntries(): [string, Entity][] {
        return Array.from(this.entities.entries());
    }

    has(id: string): boolean {
        return this.entities.has(id);
    }

    clear(): void {
        this.entities.clear();
        this.notify();
    }

    subscribe(listener: ChangeListener): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private notify(): void {
        for (const listener of this.listeners) {
            listener();
        }
    }

    createEntity(options: {
        id: string;
        x: number;
        y: number;
        scale?: number;
    }): Entity {
        const entity: Entity = {
            x: options.x,
            y: options.y,
            vx: 0,
            vy: 0,
            scale: options.scale ?? 1,
            sprite: createRef<Sprite | null>(),
            container: createRef<Container | null>(),
            texture: null,
            currentanim: "",
            state: {},
            parent: null,
        };
        this.register(options.id, entity);
        return entity;
    }

    createFromDefinition(def: EntityDefinition): Entity {
        const entity = this.createEntity({
            id: def.id,
            x: def.position.x,
            y: def.position.y,
            scale: def.scale,
        });
        if (def.attachments) {
            entity.attachmentConfig = def.attachments;
        }
        return entity;
    }

    resolveParams<T extends Record<string, any>>(params: T): T {
        const resolved = { ...params };

        for (const key of Object.keys(resolved)) {
            if (key.endsWith("Id") && typeof resolved[key] === "string") {
                const entityKey = key.slice(0, -2);
                const entity = this.get(resolved[key]);
                if (entity) {
                    (resolved as any)[entityKey] = entity;
                } else {
                    console.log("error");
                }
            }
        }

        return resolved;
    }
}

export const defaultRegistry = new EntityRegistry();
