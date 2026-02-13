import type { SceneDefinition } from "../types/Scene";
import type { Entity } from "../types/Entity";
import { EntityRegistry } from "./EntityRegistry";
import { TimelineRunner } from "../executor/TimelineRunner";

export class SceneRunner {
    readonly registry: EntityRegistry;
    private runner: TimelineRunner;
    private primaryEntity: Entity;
    private completed = false;

    constructor(scene: SceneDefinition, registry?: EntityRegistry) {
        this.registry = registry ?? new EntityRegistry();

        for (const def of scene.entities) {
            const entity = this.registry.createFromDefinition(def);
            entity.state.__registry__ = this.registry;
        }

        const primary = this.registry.get(scene.entities[0].id);
        if (!primary) {
            throw new Error(`Primary entity "${scene.entities[0].id}" could not be created`);
        }
        this.primaryEntity = primary;

        this.runner = new TimelineRunner(scene.timeline, this.primaryEntity, this.registry);
    }

    update(dt: number): boolean {
        if (this.completed) return true;
        this.completed = this.runner.update(dt);
        return this.completed;
    }

    isCompleted(): boolean {
        return this.completed;
    }

    getRegistry(): EntityRegistry {
        return this.registry;
    }

    getPrimaryEntity(): Entity {
        return this.primaryEntity;
    }

    destroy(): void {
        for (const [id] of this.registry.getAllEntries()) {
            const entity = this.registry.get(id);
            if (entity) {
                const container = entity.container.current;
                if (container && container.parent) {
                    container.parent.removeChild(container);
                }
            }
        }
        this.registry.clear();
    }
}
