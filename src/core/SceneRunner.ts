import type { SceneDefinition, EntityDefinition, SoundtrackName } from "../types/Scene";
import type { Entity } from "../types/Entity";
import { EntityRegistry } from "./EntityRegistry";
import { TimelineRunner } from "../executor/TimelineRunner";
import type { BackgroundName } from "../helpers/assets";
import { SoundtrackManager } from "../helpers/SoundtrackManager";
import { SceneDefSchema } from "../types/schemas";

const MIN_SPAWN_DISTANCE = 20;
const NUDGE_AMOUNT = 25;

function resolvePositionConflicts(defs: EntityDefinition[]): EntityDefinition[] {
    const resolved: EntityDefinition[] = [];

    for (const def of defs) {
        let x = def.position.x;
        let y = def.position.y;

        let hasConflict = true;
        while (hasConflict) {
            hasConflict = false;
            for (const placed of resolved) {
                const dx = x - placed.position.x;
                const dy = y - placed.position.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < MIN_SPAWN_DISTANCE) {
                    // having this just for the sake of testing
                    console.warn(
                        `[SceneRunner] Position conflict: entity "${def.id}" at (${x}, ${y}) ` +
                        `is too close to "${placed.id}" at (${placed.position.x}, ${placed.position.y}). ` +
                        `Nudging to (${placed.position.x + NUDGE_AMOUNT}, ${y}).`
                    );
                    x = placed.position.x + NUDGE_AMOUNT;
                    hasConflict = true;
                    break;
                }
            }
        }

        resolved.push({ ...def, position: { x, y } });
    }

    return resolved;
}

export class SceneRunner {
    readonly registry: EntityRegistry;
    private runner: TimelineRunner;
    private primaryEntity: Entity;
    private completed = false;
    private backgroundTexture?: BackgroundName;
    private soundtrackManager: SoundtrackManager;
    private chosenTrack: SoundtrackName;

    constructor(scene: SceneDefinition, registry?: EntityRegistry) {
        const validated = SceneDefSchema.safeParse(scene);
        if (!validated.success) {
            console.error("[SceneRunner] Invalid scene:", validated.error.issues);
            throw new Error("Invalid SceneDefinition");
        }

        this.registry = registry ?? new EntityRegistry();

        const safeEntities = resolvePositionConflicts(scene.entities);

        for (const def of safeEntities) {
            this.registry.createFromDefinition(def);
        }
        this.backgroundTexture = scene.background;
        const primary = this.registry.get(safeEntities[0].id);
        if (!primary) {
            throw new Error(`primary entity not found`);
        }
        this.primaryEntity = primary;
        this.runner = new TimelineRunner(scene.timeline, this.primaryEntity, this.registry);
        (window as any).__pixi_engine = this;  //need to remove later ( essential )
        this.soundtrackManager = new SoundtrackManager();
        this.chosenTrack = scene.soundtrack ?? "calm";
    }

    update(dt: number): boolean {
        if (this.completed){
            if(this.soundtrackManager){
                this.soundtrackManager.destroy();
                this.soundtrackManager = null as any;
            }
            return true;
        }
        this.completed = this.runner.update(dt);
        return this.completed;
    }

    startAudio(): void {
        // console.log("music started")
        this.soundtrackManager.play(this.chosenTrack);
    }

    isCompleted(): boolean {
        return this.completed;
    }

    getBackground(): BackgroundName | undefined {
        return this.backgroundTexture;
    }

    getRegistry(): EntityRegistry {
        return this.registry;
    }

    getObjects(): Entity[] {
        return this.registry.getAll().filter((e) => e.isObject);
    }

    getPrimaryEntity(): Entity {
        return this.primaryEntity;
    }

    destroy(): void {
        if (this.soundtrackManager) {
            this.soundtrackManager.destroy();
            this.soundtrackManager = null as any;
        }
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

