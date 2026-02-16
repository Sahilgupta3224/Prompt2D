import type { EntityRegistry } from "../core/EntityRegistry";

export function serializeWorldState(registry: EntityRegistry): string {
    const entries = registry.getAllEntries();

    if (entries.length === 0) {
        return "No entities in the scene.";
    }

    const lines: string[] = [];

    for (const [id, entity] of entries) {
        const parts: string[] = [
            `position (${Math.round(entity.x)}, ${Math.round(entity.y)})`,
        ];

        if (entity.scale !== 1) {
            parts.push(`scale ${entity.scale}`);
        }
        if (entity.currentanim) {
            parts.push(`facing "${entity.currentanim}"`);
        }

        if (entity.parent) {
            const parentId = findEntityId(registry, entity.parent);
            if (parentId) {
                parts.push(`attached to ${parentId}`);
            }
        }

        if (entity.vx !== 0 || entity.vy !== 0) {
            parts.push(`velocity (${entity.vx.toFixed(1)}, ${entity.vy.toFixed(1)})`);
        }

        const notableState = extractNotableState(entity.state);
        if (notableState) {
            parts.push(notableState);
        }

        lines.push(`- ${id}: ${parts.join(", ")}`);
    }

    return lines.join("\n");
}

function findEntityId(registry: EntityRegistry, target: any): string | null {
    for (const [id, entity] of registry.getAllEntries()) {
        if (entity === target) return id;
    }
    return null;
}

function extractNotableState(state: Record<string, any>): string | null {
    const SKIP_KEYS = new Set([
        "__registry__",
        "__assetType__",
        "waitElapsed",
        "waitDuration",
        "fadeStart",
        "fadeTarget",
        "fadeDuration",
        "fadeStartTime",
        "rotateStart",
        "rotateTarget",
        "rotateDuration",
        "rotateStartTime",
        "oscillateCenter",
        "oscillateAmplitude",
        "oscillateFrequency",
        "oscillateAxis",
        "oscillateDuration",
        "oscillateStartTime",
        "oscillatePhase",
        "shakeCenter",
        "shakeIntensity",
        "shakeDuration",
        "shakeFrequency",
        "shakeAxis",
        "shakeStartTime",
        "shakeLastUpdate",
        "attackPhase",
        "attackRange",
        "attackFrameTimer",
        "attackFrame",
        "attackPreviousAnim",
    ]);

    const notable: string[] = [];

    for (const [key, value] of Object.entries(state)) {
        if (SKIP_KEYS.has(key)) continue;
        if (key.startsWith("_")) continue;
        if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
            notable.push(`${key}=${JSON.stringify(value)}`);
        }
    }

    if (notable.length === 0) return null;
    return `state: {${notable.join(", ")}}`;
}