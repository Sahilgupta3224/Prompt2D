# Action Primitives Catalog

This document details all available action primitives the engine can execute. When defining an action in the timeline, the structure is always:

```json
{
  "type": "action",
  "name": "<action_name>",
  "entityId": "<performing_entity_id>",
  "params": { ... }
}
```

*Note: If `entityId` is omitted, the action executes against a global scope (only valid for actions like `spawn`, `wait`, or if a parent node provides the scope).*

## Movement Actions
- **`move`**
  - *Description:* Walks to a specific coordinate.
  - *Params:* `destination: { x, y }`
- **`movePath`**
  - *Description:* Follows a path of points.
  - *Params:* `path: [ { x, y }, { x, y }, ... ]`
- **`patrol`**
  - *Description:* Marches back and forth between two points.
  - *Params:* `pointA: { x, y }`, `pointB: { x, y }`, `laps` (number), `pauseAtEnds` (ms, optional).
- **`wander`**
  - *Description:* Moves randomly within an area or near a destination.
  - *Params:* `area: { x, y, width, height }` (optional), `destination: {x,y}` (optional), `duration` (ms).
- **`follow`**
  - *Description:* Chases or trails another entity.
  - *Params:* `targetId` (string), `duration` (ms), `distance` (px, optional).
- **`flee`**
  - *Description:* Runs away from another entity.
  - *Params:* `targetId` / `attackerId` (string), `duration` (ms), `speed` (multiplier, optional).
- **`crawl`**
  - *Description:* Prone movement across the ground.
  - *Params:* `destination: { x, y }`, `duration` (ms, optional).

## Physical Interactions & Combat
- **`attack`**
  - *Description:* Initiates a combat animation towards a target.
  - *Params:* `targetId` (string), `weapon` (enum: `"melee"`, `"punch"`, `"gun"`, `"thrust"`, `"spell"`).
- **`heal`**
  - *Description:* Casts a healing spell on a target.
  - *Params:* `targetId` (string), `amount` (number, default 30), `duration` (ms).
- **`knockBack`**
  - *Description:* Applies sudden kinetic force, pushing the entity backwards (often used in parallel with `attack`).
  - *Params:* `direction: { x, y }` (normalized vector), `strength` (number), `duration` (ms), `friction` (0-1).
- **`applyForce`**
  - *Description:* Pushes/pulls an entity, or sets a continuous physical velocity.
  - *Params:* `force: { x, y }`, `mode` (`"push"`, `"pull"`, `"none"`), `duration` (ms).
- **`jump`**
  - *Description:* Vertical leap with optional horizontal displacement.
  - *Params:* `height` (px), `distance` (px), `duration` (ms).

## Object Manipulation
- **`grab` / `pickUp`**
  - *Description:* Picks up an `isObject=true` entity.
  - *Params:* `objectId` (string), `attachmentPoint` (string, usually `"hand"`).
- **`throw`**
  - *Description:* Hurls an attached object to a location.
  - *Params:* `objectId` (string), `target: { x, y }`, `arcHeight` (px).
- **`give`**
  - *Description:* Walks to another entity and transfers a held object to them.
  - *Params:* `objectId` (string), `targetId` (string).
- **`detach`**
  - *Description:* Drops a currently held object.
  - *Params:* `objectId` (string).

## Body & Posture
- **`crouch`**
  - *Description:* Lowers the body.
  - *Params:* `duration` (ms).
- **`sleep`**
  - *Description:* Lies down (rotates 90 degrees) with sleep status.
  - *Params:* `duration` (ms).
- **`sitOn`**
  - *Description:* Moves to and sits on a specific coordinate.
  - *Params:* `seat: { x, y }`.
- **`faceDirection`** / **`turnTowards`**
  - *Description:* Changes the direction the character is looking statically.
  - *Params for faceDirection:* `direction` (`"UP"`, `"DOWN"`, `"LEFT"`, `"RIGHT"`).
  - *Params for turnTowards:* `targetId` (string).

## Visual Effects, UI & Emotes
- **`speak`**
  - *Description:* Pops up a speech bubble over the entity's head.
  - *Params:* `text` (string), `duration` (ms).
- **`emote`**
  - *Description:* Pops up an emoji icon over the entity's head.
  - *Params:* `emote` (`"happy"`, `"sad"`, `"angry"`, `"love"`, `"star"`, `"question"`, etc.), `duration` (ms).
- **`wave`**
  - *Description:* Waving animation towards an entity or direction.
  - *Params:* `targetId` (string, optional), `direction` (optional), `waves` (number).
- **`dance`**
  - *Description:* Character dances.
  - *Params:* `duration` (ms), `style` (string).
- **`spin`**
  - *Description:* Rotates the entire sprite container instantly over time.
  - *Params:* `duration` (ms), `rotations` (number).
- **`fade`**
  - *Description:* Adjusts the sprite opacity.
  - *Params:* `targetAlpha` (0.0 to 1.0), `duration` (ms).
- **`shake` / `oscillate`**
  - *Description:* Jitter or smooth wobbling effects.
  - *Params:* `intensity` / `amplitude`, `duration` (ms), `frequency`, `axis` (`"x"`, `"y"`, `"both"`).

## System / Scene Management
- **`spawn`**
  - *Description:* Dramatically creates a new entity mid-scene.
  - *Params:* `entityId` (string), `x`, `y`, `scale`, `isObject`, `shape`, `color`.
- **`despawn`**
  - *Description:* Removes an entity from the scene graph entirely.
  - *Params:* `entityId` (string).
- **`wait`**
  - *Description:* Does nothing for a fixed amount of time. Crucial for animation pacing.
  - *Params:* `duration` (ms).
