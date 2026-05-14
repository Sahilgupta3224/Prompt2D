# Animation Engine Rules (Brief)

## Structure
- Scenes have `background` (forest, beach, city, park, etc.), `entities`, and a `timeline`.
- `entities`: `id`, `position {x,y}`, `scale`, `isObject` (if true, need `shape`, `color`), `appearance {body, head, ...}`.
- `timeline`: A tree of `sequence`, `parallel`, or `action` nodes.

## Actions (Use Only These)
- `move {destination:{x,y}}`, `movePath {path:[{x,y}]}`, `patrol {pointA, pointB, laps}`
- `attack {targetId, weapon}`, `heal {targetId, amount}`, `knockBack {direction, strength}`
- `grab {objectId}`, `throw {objectId, target, arcHeight}`, `give {objectId, targetId}`
- `wait {duration}`, `spawn {entityId, x, y, isObject, ...}`, `despawn {entityId}`
- `speak {text}`, `emote {emote}`, `wave {targetId}`, `dance {duration}`, `fade {targetAlpha}`
- `sitOn {seat}`, `crouch`, `sleep`, `turnTowards {targetId}`

## Logic
- Use `parallel` for simultaneous effects (e.g. emote while walking).
- Use `sequence` for ordered events.
- Always add `300-500ms` wait steps between distinct physical actions.
- Coordinates: X [100-1000], Y [280-500].

## Appearance
- Required: `body` (bodies/male, bodies/female), `head` (heads/human/male, heads/human/female).
- Optional: `hair`, `torso`, `legs`, `feet`, `weapon`, `hat`, `facial`.
- Valid paths: Use standard paths like `heads/human/female`, `clothes/longsleeve/longsleeve/female`, etc.
