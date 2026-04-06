# Engine Architecture & Core Schemas

This document outlines the core architecture, coordinate systems, and data schemas for the PixiJS animation engine. The engine operates on a strictly validated JSON structure defined by Zod schemas.

## 1. Game Environment Constraints
- **Screen Dimensions:** Width: `1400px`, Height: `700px`.
- **Coordinate Boundaries:** 
  - Minimum X: `25` (Offset X margin)
  - Maximum X: `1425`
  - Minimum Y: `0`
  - Maximum Y: `700`
- **Default Placements:**
  - Characters usually spawn around `Y: 450`.
  - Default Center: `X: 700`, `Y: 350`.

## 2. Core JSON Structure: `SceneDefinition`
Every animation scene is a single, self-contained JSON object following the `SceneDefinition` schema.

```json
{
  "id": "unique-scene-id",
  "name": "Human-readable scene name",
  "soundtrack": "battle",
  "background": "park",
  "entities": [ ... ],
  "timeline": { ... }
}
```

### 2.1 Scene Properties
- `id` (string): Unique identifier for the scene.
- `name` (string, optional): Human-readable name.
- `background` (string, optional): Visual background image.
  - *Valid values:* `"park"`, `"city"`, `"forest"`, `"mountain"`, `"beach"`, `"desert"`.
- `soundtrack` (string, optional): Background music track.
  - *Valid values:* `"battle"`, `"dance"`, `"calm"`, `"soft"`, `"mystical"`, `"energetic"`.

## 3. Entity Definitions
Entities represent all characters, objects, and props on the screen.

```json
{
  "id": "knight_1",
  "position": { "x": 300, "y": 400 },
  "scale": 2.0,
  "isObject": false,
  "appearance": { ... }
}
```

### 3.1 Entity Properties
- `id` (string, required): A unique, descriptive string (e.g., `"hero"`, `"rock"`).
- `position` (object): Initial starting coordinates `{"x": number, "y": number}`.
- `scale` (number, default: `1.0`): Multiplier for visual size. Characters usually use `2.0` or `3.0`. Objects vary widely (`0.2` to `1.0`).
- `isObject` (boolean, default: `false`): If `true`, the entity is treated as a simple geometric object/prop, not an animated character.
- `shape` (string, required if `isObject=true`): See *Appearance & Assets* doc for valid shapes.
- `color` (string, required if `isObject=true`): Hex code color (e.g., `"#ff0000ff"`).
- `appearance` (object, required if `isObject=false`): Character clothing and body layers.
- `attachments` (object, optional): Pre-defined attachment points (e.g., `hands`, `back`).

## 4. Strict Validation Rules (Zod superRefine)
The engine strictly enforces referential integrity:
1. **Unique IDs:** No two entities can share the same `id`.
2. **Valid Target IDs:** If an action references an `entityId`, `targetId`, or `objectId`, that ID **MUST exist** in the scene's `entities` array.
3. **Valid Action Names:** Actions must precisely match the engine's recognized primitives (e.g., `"move"`, `"grab"`, `"attack"`, etc. — see *Action Catalog*).

*Failing any of these constraints will result in immediate rejection of the scene JSON.*
