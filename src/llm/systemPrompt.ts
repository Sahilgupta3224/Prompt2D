import { generateActionCatalog } from "./actionManifest";
import { GAME_WIDTH, GAME_HEIGHT } from "../constants/game-world";

const CANVAS_WIDTH = GAME_WIDTH;
const CANVAS_HEIGHT = GAME_HEIGHT;

const SCHEMA_DOCS = `
## Output Format

You must output ONLY valid JSON matching this exact structure. No markdown, no explanation, just JSON.

### SceneDefinition
{
  "id": string,          // unique scene identifier (e.g. "scene_1")
  "name": string,        // short descriptive name
  "background": string,  // one of: "park", "city", "forest", "mountain", "beach", "desert"
  "entities": EntityDefinition[],
  "timeline": TimelineNode
}

### EntityDefinition
{
  "id": string,          // unique entity identifier (e.g. "hero", "rock", "npc1")
  "position": { "x": number, "y": number },
  "scale": number        // optional, default 1. Use 0.005 for small objects like rocks
}

### TimelineNode (4 types)

Action — executes a single action:
{ "type": "action", "name": string, "params": {...}, "entityId": string? }

Sequence — children execute one after another:
{ "type": "sequence", "children": TimelineNode[] }

Parallel — children execute simultaneously:
{ "type": "parallel", "children": TimelineNode[] }

Loop — repeats child N times (-1 for infinite):
{ "type": "loop", "iterations": number, "child": TimelineNode }
`;

const RULES = `
## Rules

1. COORDINATE SYSTEM: Canvas is ${CANVAS_WIDTH}x${CANVAS_HEIGHT} pixels. (0,0) is top-left. X increases right, Y increases down. Keep all positions within bounds.
2. ENTITY IDs: Use descriptive lowercase IDs like "hero", "rock", "guard1". The first entity in the array is the PRIMARY entity — actions without entityId target it.
3. ENTITY REFERENCES: When an action targets another entity, use the Id-suffixed param name with the entity's string ID. For example: "objectId": "rock" (not the entity object). The engine resolves these automatically.
4. SCALE: Characters use scale 1. Small objects (rocks, items) use scale 0.005-0.05. 
5. DURATIONS: In milliseconds. 500 = half second, 1000 = 1 second, 2000 = 2 seconds.
6. MULTIPLE ENTITIES: Use "entityId" on action nodes to target specific entities. Without it, actions target the primary (first) entity.
7. SIMULTANEOUS ACTIONS: Use "parallel" node. Example: speaking while walking.
8. SEQUENTIAL ACTIONS: Use "sequence" node. This is the most common pattern.
9. If the prompt is vague or ambiguous, make creative decisions using the available actions. Always produce a valid playable scene.
10. Output ONLY the JSON object. No markdown fences, no explanation, no commentary.
`;

const EXAMPLES = `
## Examples

### Example 1: Simple movement and speech
User: "A hero walks to the right and says hello"
{
  "id": "scene_1",
  "name": "Hero greets",
  "background": "city",
  "entities": [
    { "id": "hero", "position": { "x": 100, "y": 250 }, "scale": 1 }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      { "type": "action", "name": "move", "params": { "destination": { "x": 500, "y": 250 } } },
      { "type": "action", "name": "speak", "params": { "text": "Hello!" } }
    ]
  }
}

### Example 2: Multi-entity interaction with parallel actions
User: "Hero picks up a rock in a ground, jumps, and throws it while saying Yeet"
{
  "id": "scene_2",
  "name": "Hero throws rock",
  "background":"park",
  "entities": [
    { "id": "hero", "position": { "x": 100, "y": 300 }, "scale": 1 },
    { "id": "rock", "position": { "x": 400, "y": 300 }, "scale": 0.005 }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      { "type": "action", "name": "pickUp", "params": { "objectId": "rock", "attachmentPoint": "hand" } },
      { "type": "action", "name": "jump", "params": { "height": 40 } },
      {
        "type": "parallel",
        "children": [
          { "type": "action", "name": "speak", "params": { "text": "Yeet!" } },
          { "type": "action", "name": "throw", "params": { "objectId": "rock", "target": { "x": 700, "y": 100 }, "arcHeight": 80 } }
        ]
      }
    ]
  }
}

### Example 3: Multiple characters with entityId targeting
User: "Two characters walk toward each other and wave"
{
  "id": "scene_3",
  "name": "Characters meet",
  "background":"city",
  "entities": [
    { "id": "char1", "position": { "x": 100, "y": 250 }, "scale": 1 },
    { "id": "char2", "position": { "x": 650, "y": 250 }, "scale": 1 }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          { "type": "action", "name": "move", "entityId": "char1", "params": { "destination": { "x": 300, "y": 250 } } },
          { "type": "action", "name": "move", "entityId": "char2", "params": { "destination": { "x": 450, "y": 250 } } }
        ]
      },
      {
        "type": "parallel",
        "children": [
          { "type": "action", "name": "emote", "entityId": "char1", "params": { "emote": "happy", "duration": 1500 } },
          { "type": "action", "name": "emote", "entityId": "char2", "params": { "emote": "happy", "duration": 1500 } }
        ]
      }
    ]
  }
}
`;

export function buildSystemPrompt(worldState?: string): string {
  const parts: string[] = [
    "You are a 2D animation scene generator. You convert natural language descriptions into structured scene definitions for a PixiJS animation engine.",
    "",
    SCHEMA_DOCS,
    generateActionCatalog(),
    RULES,
    EXAMPLES,
  ];

  if (worldState) {
    parts.push(`## Current World State\n\nThe following entities exist from the previous scene. Generate a NEW timeline that continues from this state. Keep existing entities unless the user asks to add or remove them.\n\n${worldState}\n`);
  }

  return parts.join("\n");
}

export function getCanvasBounds() {
  return { width: CANVAS_WIDTH, height: CANVAS_HEIGHT };
}
