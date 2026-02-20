export interface ActionParamDoc {
    name: string;
    type: string;
    required: boolean;
    description: string;
}

export interface ActionDoc {
    name: string;
    description: string;
    params: ActionParamDoc[];
    notes?: string;
}

export const ACTION_MANIFEST: ActionDoc[] = [
    // ── Movement ──────────────────────────────
    {
        name: "move",
        description: "Move entity to exact coordinates",
        params: [
            { name: "destination", type: "{x: number, y: number}", required: true, description: "Target position" },
        ],
    },
    {
        name: "movePath",
        description: "Move entity along a series of waypoints",
        params: [
            { name: "path", type: "{x: number, y: number}[]", required: true, description: "Array of waypoints" },
            { name: "speed", type: "number", required: false, description: "Movement speed (default: normal)" },
            { name: "loop", type: "boolean", required: false, description: "Loop path forever (default: false)" },
        ],
    },
    {
        name: "follow",
        description: "Continuously follow another entity",
        params: [
            { name: "targetId", type: "string", required: true, description: "Entity ID to follow" },
            { name: "offset", type: "{x: number, y: number}", required: false, description: "Offset from target" },
            { name: "smoothing", type: "number", required: false, description: "0-1, lower = snappier (default: 0.1)" },
            { name: "maintainDistance", type: "number", required: false, description: "Stop when within this distance" },
        ],
        notes: "Runs forever unless inside a parallel with a timed action",
    },
    {
        name: "faceDirection",
        description: "Face a cardinal direction instantly",
        params: [
            { name: "direction", type: "\"UP\" | \"DOWN\" | \"LEFT\" | \"RIGHT\"", required: true, description: "Direction to face" },
        ],
    },
    {
        name: "look",
        description: "Smoothly rotate to face a target, direction, or angle",
        params: [
            { name: "targetId", type: "string", required: false, description: "Entity ID to look at" },
            { name: "direction", type: "{x: number, y: number}", required: false, description: "Direction vector" },
            { name: "angle", type: "number", required: false, description: "Angle in radians" },
            { name: "instant", type: "boolean", required: false, description: "Snap instantly (default: false)" },
        ],
        notes: "Provide exactly one of: targetId, direction, or angle",
    },

    // ── Physics ───────────────────────────────
    {
        name: "jump",
        description: "Parabolic jump arc",
        params: [
            { name: "height", type: "number", required: true, description: "Jump height in pixels" },
            { name: "distance", type: "number", required: false, description: "Horizontal distance (default: 0)" },
            { name: "duration", type: "number", required: false, description: "Duration in ms (default: 600)" },
        ],
    },
    {
        name: "applyForce",
        description: "Apply physics impulse or continuous force",
        params: [
            { name: "force", type: "{x: number, y: number}", required: true, description: "Force vector" },
            { name: "duration", type: "number", required: false, description: "Duration in ms" },
            { name: "continuous", type: "boolean", required: false, description: "Apply continuously (default: false, one-shot impulse)" },
        ],
    },

    // ── Object Interaction ────────────────────
    {
        name: "grab",
        description: "Attach object to this entity (instant, no movement)",
        params: [
            { name: "objectId", type: "string", required: true, description: "Entity ID of object to grab" },
            { name: "localOffset", type: "{x: number, y: number}", required: false, description: "Offset from entity" },
            { name: "attachmentPoint", type: "string", required: false, description: "Named attachment point (e.g. 'hand')" },
        ],
    },
    {
        name: "pickUp",
        description: "Walk to an object, then grab it",
        params: [
            { name: "objectId", type: "string", required: true, description: "Entity ID of object" },
            { name: "attachmentPoint", type: "string", required: false, description: "Named attachment point" },
        ],
    },
    {
        name: "throw",
        description: "Throw a held object in a parabolic arc to a target position",
        params: [
            { name: "objectId", type: "string", required: true, description: "Entity ID of object to throw" },
            { name: "target", type: "{x: number, y: number}", required: true, description: "Where to throw it" },
            { name: "arcHeight", type: "number", required: true, description: "Peak height of throw arc in pixels" },
        ],
    },
    {
        name: "give",
        description: "Walk to another entity and hand over a held object",
        params: [
            { name: "objectId", type: "string", required: true, description: "Entity ID of object to give" },
            { name: "targetId", type: "string", required: true, description: "Entity ID of recipient" },
        ],
    },
    {
        name: "detach",
        description: "Release a held object in place",
        params: [
            { name: "objectId", type: "string", required: true, description: "Entity ID of object to release" },
        ],
    },

    // ── Communication ─────────────────────────
    {
        name: "speak",
        description: "Show a speech bubble above entity",
        params: [
            { name: "text", type: "string", required: true, description: "What to say" },
            { name: "duration", type: "number", required: false, description: "Duration in ms (default: 2000)" },
        ],
    },
    {
        name: "emote",
        description: "Show an emoji emote above entity",
        params: [
            { name: "emote", type: "string", required: true, description: "One of: happy, sad, angry, love, surprise, question, sleep, idea, sweat, star" },
            { name: "duration", type: "number", required: true, description: "Duration in ms" },
        ],
    },

    // ── Combat ─────────────────────────────────
    {
        name: "attack",
        description: "Approach and attack a target entity",
        params: [
            { name: "targetId", type: "string", required: true, description: "Entity ID of target" },
            { name: "weapon", type: "\"melee\" | \"gun\"", required: true, description: "Attack type" },
            { name: "damage", type: "number", required: false, description: "Damage amount (default: 10)" },
        ],
    },

    // ── Orientation ────────────────────────────
    {
        name: "turnTo",
        description: "Instantly face a direction or angle",
        params: [
            { name: "direction", type: "\"UP\" | \"DOWN\" | \"LEFT\" | \"RIGHT\"", required: false, description: "Cardinal direction to face" },
            { name: "angle", type: "number", required: false, description: "Angle in radians" },
        ],
        notes: "Provide exactly one of: direction or angle",
    },
    {
        name: "turnTowards",
        description: "Instantly face toward another entity or position",
        params: [
            { name: "targetId", type: "string", required: true, description: "Entity ID to face toward" },
        ],
    },
    {
        name: "knockBack",
        description: "Push entity away in a direction with decaying velocity",
        params: [
            { name: "direction", type: "{x: number, y: number}", required: true, description: "Direction vector to knock back toward" },
            { name: "strength", type: "number", required: true, description: "Initial knockback speed" },
            { name: "duration", type: "number", required: false, description: "Max duration in ms (default: 500)" },
            { name: "friction", type: "number", required: false, description: "Velocity decay per frame 0-1 (default: 0.9)" },
        ],
    },

    // ── Animation / Pose ──────────────────────
    {
        name: "dance",
        description: "Start a looping dance animation (runs forever, use in parallel with a timed action)",
        params: [],
    },
    {
        name: "any",
        description: "Play a named pose or special animation for a duration",
        params: [
            { name: "Name", type: "string", required: true, description: "Pose name (e.g. 'CROUCH')" },
            { name: "time", type: "number", required: false, description: "Duration in ms (omit for infinite)" },
        ],
    },

    // ── Timing ─────────────────────────────────
    {
        name: "wait",
        description: "Pause for a duration",
        params: [
            { name: "duration", type: "number", required: true, description: "Duration in milliseconds" },
        ],
    },
    {
        name: "sitOn",
        description: "Walk to a seat position and sit down",
        params: [
            { name: "seat", type: "{x: number, y: number}", required: true, description: "Seat position" },
        ],
    },

    // ── Effects ────────────────────────────────
    {
        name: "fade",
        description: "Fade entity opacity to a target alpha value",
        params: [
            { name: "targetAlpha", type: "number", required: true, description: "Target opacity 0-1 (0=invisible, 1=fully visible)" },
            { name: "duration", type: "number", required: false, description: "Duration in ms (default: 1000)" },
            { name: "easing", type: "\"linear\" | \"easeIn\" | \"easeOut\" | \"easeInOut\"", required: false, description: "Easing function (default: linear)" },
        ],
    },
    {
        name: "rotate",
        description: "Rotate entity to a target angle",
        params: [
            { name: "angle", type: "number", required: true, description: "Target angle in degrees" },
            { name: "duration", type: "number", required: false, description: "Duration in ms (0=instant, default: 0)" },
        ],
    },
    {
        name: "oscillate",
        description: "Make entity oscillate back and forth (wobble/bob)",
        params: [
            { name: "amplitude", type: "number", required: true, description: "Oscillation distance in pixels" },
            { name: "frequency", type: "number", required: false, description: "Oscillations per second (default: 1)" },
            { name: "axis", type: "\"x\" | \"y\" | \"both\"", required: false, description: "Axis to oscillate on (default: both)" },
            { name: "duration", type: "number", required: false, description: "Duration in ms (omit for infinite)" },
        ],
    },
    {
        name: "shake",
        description: "Shake entity randomly (impact feedback, screen shake effect)",
        params: [
            { name: "intensity", type: "number", required: true, description: "Shake intensity in pixels" },
            { name: "duration", type: "number", required: false, description: "Duration in ms (omit for infinite)" },
            { name: "frequency", type: "number", required: false, description: "Shakes per second (default: 10)" },
            { name: "axis", type: "\"x\" | \"y\" | \"both\"", required: false, description: "Axis to shake on (default: both)" },
        ],
    },

    // ── Scene Management ──────────────────────
    {
        name: "spawn",
        description: "Create a new entity at runtime",
        params: [
            { name: "entityId", type: "string", required: true, description: "ID for the new entity" },
            { name: "x", type: "number", required: true, description: "X position" },
            { name: "y", type: "number", required: true, description: "Y position" },
            { name: "scale", type: "number", required: false, description: "Scale (default: 1)" },
        ],
    },
    {
        name: "despawn",
        description: "Remove an entity from the scene",
        params: [
            { name: "entityId", type: "string", required: true, description: "ID of entity to remove" },
        ],
    },
    {
        name: "setState",
        description: "Set arbitrary state values on an entity",
        params: [
            { name: "values", type: "Record<string, any>", required: true, description: "Key-value pairs to set" },
        ],
        notes: "Advanced. Rarely needed by the LLM.",
    },
];


export const AVAILABLE_BACKGROUNDS = [
    "park", "city", "forest", "mountain", "beach", "desert",
] as const;


const ANIMATION_TOOLS_DOC = `
## Animation Modes

Entities support different animation modes that control how their sprite sheet plays:

- **loop**: Animation frames cycle continuously (default for walking, dancing)
- **once**: Animation plays once then stops on the last frame (e.g. attack hit)
- **static**: Shows a single fixed frame (poses like CROUCH, SIT)
- **freeze**: Pauses on the current frame (hold a mid-action pose)

Available animation names for characters:
- "UP", "DOWN", "LEFT", "RIGHT" — directional walk cycles
- "DANCE" — dance loop
- "STILL" — idle standing
- "SIT" — sitting pose  
- "HIT" — taking damage (plays once)
- "CROUCH" — crouching pose

The \`any\` action can play named poses.
The \`faceDirection\` and \`turnTo\` actions change the facing direction.
Attack actions automatically trigger hit animations on targets.
`;

export function generateActionCatalog(): string {
    const lines: string[] = ["## Available Actions\n"];

    for (const action of ACTION_MANIFEST) {
        lines.push(`### \`${action.name}\``);
        lines.push(action.description);

        if (action.params.length > 0) {
            lines.push("Parameters:");
            for (const p of action.params) {
                const req = p.required ? "(required)" : "(optional)";
                lines.push(`  - \`${p.name}\`: ${p.type} ${req} — ${p.description}`);
            }
        }

        if (action.notes) {
            lines.push(`Note: ${action.notes}`);
        }

        lines.push("");
    }

    lines.push(ANIMATION_TOOLS_DOC);

    lines.push(`## Available Backgrounds\n`);
    lines.push(`Set the "background" field in SceneDefinition to one of: ${AVAILABLE_BACKGROUNDS.map(b => `"${b}"`).join(", ")}`);
    lines.push(`Choose the most appropriate background based on the scene description.\n`);

    lines.push(`## Object Shapes & Colors\n`);
    lines.push(`When creating object entities (isObject: true), you can set according to the shape of object:`);
    lines.push(`  - "shape": one of: "circle", "square", "rectangle", "triangle", "diamond", "hexagon", "pentagon", "star", "heart", "ellipse", "capsule", "arrow", "cross", "ring", "semicircle", "cone", "cylinder", "pyramid"`);
    lines.push(`  - "color": any CSS hex color (e.g. "#ff5500", "#2ecc71"). Default: "#4a90d9"`);
    lines.push(`Choose shapes and colors that match the scene context.\n`);

    return lines.join("\n");
}
