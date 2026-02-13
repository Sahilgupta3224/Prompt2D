import type { Entity } from "../types/Entity";

class EntityRegistryClass {
    private entities: Map<string, Entity> = new Map();

    register(id: string, entity: Entity): void {
        this.entities.set(id, entity);
    }

    get(id: string): Entity | undefined {
        return this.entities.get(id);
    }

    remove(id: string): void {
        this.entities.delete(id);
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

export const EntityRegistry = new EntityRegistryClass();
