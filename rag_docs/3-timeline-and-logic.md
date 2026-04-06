# Timeline Execution & Engine Constraints

The PixiJS animation engine uses a hierarchical Node-based Execution model called the `Timeline`. The timeline processes actions linearly or concurrently depending on how the nodes are structured. 

## 1. Timeline Nodes

The `timeline` property of a `SceneDefinition` takes a single root `TimelineNode`. A node can be one of four types:

### 1.1 Action Node
The base primitive that executes a specific behavior.
```json
{
  "type": "action",
  "name": "move",
  "entityId": "hero1",
  "params": { "destination": { "x": 500, "y": 400 } }
}
```

### 1.2 Sequence Node
Executes its children sequentially. The next child will NOT begin until the previous child reports `completed: true`.
```json
{
  "type": "sequence",
  "children": [
    { "type": "action", "name": "grab", "entityId": "hero1", "params": { "objectId": "rock" } },
    { "type": "action", "name": "throw", "entityId": "hero1", "params": { "objectId": "rock", "target": { "x": 1000, "y": 300 } } }
  ]
}
```

### 1.3 Parallel Node
Executes all its children simultaneously. The parallel node reports completion only when *all* of its children have finished.
```json
{
  "type": "parallel",
  "children": [
    { "type": "action", "name": "speak", "entityId": "hero1", "params": { "text": "Take this!", "duration": 1000 } },
    { "type": "action", "name": "throw", "entityId": "hero1", "params": { "objectId": "rock", "target": { "x": 1000, "y": 300 } } }
  ]
}
```

### 1.4 Loop Node
Repeats a **single child node** (often a Sequence or Parallel node) a fixed number of times.
```json
{
  "type": "loop",
  "iterations": 3,
  "child": {
    "type": "sequence",
    "children": [
      { "type": "action", "name": "jump", "entityId": "hero1", "params": { "height": 50 } },
      { "type": "action", "name": "wait", "params": { "duration": 500 } }
    ]
  }
}
```

## 2. Animation Golden Rules
To write AI scenes that execute flawlessly without hallucinations or visual bugs, you must follow these rules:

1. **Wait Action Buffers:**
   Always insert a short `wait` action (e.g., `duration: 300` to `500`) between physically conflicting or visually abrupt actions on the *same entity*. This gives the engine frame time to resolve animation state and cleanly transition sprites to IDLE modes before starting the next move.
   *Example:* `move` -> `wait(300)` -> `grab`.

2. **Parallel Conflicts:**
   Never assign two mutually exclusive actions to the *same entity* inside a `parallel` block.
   - ❌ WRONG: Parallel `[move, jump]` for `hero1`
   - ✅ CORRECT: Parallel `[move (hero1), emote (hero1), speak (hero1)]`
   - Visual FX (`fade`, `shake`, `emote`, `speak`) pair safely in parallel with Physical movement (`move`, `attack`, `jump`).

3. **No Unknown Actions / AI Hallucinations:**
   The `name` property of an action node MUST match exactly one of the supported strings from the Action Catalog. DO NOT invent NLP-based action names like `"analyze"`, `"inspect"`, or `"process_data"`. The engine is a visual rendering tool; it can only do what is coded.

4. **Referential Integrity is Absolute:**
   If you `throw` an object `rock1`, then `rock1` must exist in the `entities` array as `isObject: true`. You cannot reference arbitrary IDs that haven't been spawned. If an entity is `despawn`ed, you can no longer command it.

5. **Attachment Logic:**
   When using `"throw"`, the object must have already been attached to the entity (usually via `"grab"` or `"pickUp"`). If you throw an unheld object, the engine will safely skip the action, but visually nothing will happen.

6. **Safe Animation:**
   Ensure that anything in timeline doesnt break the code or animation.

7. **Duration of Animation:**
   Don't use too short or too long durations for actions according to the prompt.