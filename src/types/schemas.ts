import { z } from "zod";
import { GAME_WIDTH, GAME_HEIGHT } from "../constants/game-world";
const BackgroundSchema = z.enum(["park", "city", "forest", "mountain", "beach", "desert"]);
const ShapeSchema = z.enum([
    "circle", "square", "rectangle", "triangle", "diamond",
    "star", "heart", "ellipse", "capsule", "arrow",
    "cross", "ring", "cone", "cylinder", "randomPolygon", "line",
]);
const SoundtrackSchema = z.enum(["battle", "dance", "calm", "soft", "mystical", "energetic"]);
export const EntityDefSchema = z.object({
    id:           z.string().min(1),
    type:         z.enum(["character", "object", "prop"]).optional(),
    position:     z.object({
        x: z.number().min(0).max(GAME_WIDTH),
        y: z.number().min(0).max(GAME_HEIGHT),
    }),
    scale:        z.number().min(0.1).max(10).optional(),
    spriteSheet:  z.string().optional(),
    frameWidth:   z.number().positive().optional(),
    frameHeight:  z.number().positive().optional(),
    isObject:     z.boolean().optional(),
    shape:        ShapeSchema.optional(),
    color:        z.string().regex(/^#[0-9a-fA-F]{3,8}$/, "Must be a valid hex color").optional(),
    animations:   z.record(z.string(), z.object({ row: z.number(), frames: z.number() })).optional(),
    attachments:  z.record(z.string(), z.record(z.string(), z.any())).optional(),
    appearance:   z.any().optional(),
});

const BaseNode = z.object({ id: z.string().optional() });

const ActionNodeSchema = BaseNode.extend({
    type:     z.literal("action"),
    name:     z.string().min(1),
    params:   z.record(z.string(), z.unknown()).optional().default({}),
    entityId: z.string().optional(),
});

export const TimelineNodeSchema: z.ZodType<any> = z.lazy(() =>
    z.discriminatedUnion("type", [
        ActionNodeSchema,
        BaseNode.extend({
            type:     z.literal("sequence"),
            children: z.array(TimelineNodeSchema).min(1),
        }),
        BaseNode.extend({
            type:     z.literal("parallel"),
            children: z.array(TimelineNodeSchema).min(1),
        }),
        BaseNode.extend({
            type:       z.literal("loop"),
            iterations: z.number().int(),
            child:      TimelineNodeSchema,
        }),
    ])
);

export const VALID_ACTION_NAMES = new Set([
  "move", "movePath", "wander", "follow", "faceDirection", "look", "crawl",
  "crouch", "sleep", "sitOn", "dance", "any",
  "jump", "applyForce", "knockBack",
  "grab", "pickUp", "throw", "give", "detach",
  "attack", "speak", "emote",
  "turnTo", "turnTowards",
  "fade", "rotate", "spin", "oscillate", "shake",
  "wait", "spawn", "despawn", "setState",
  "heal", "wave", "flee", "patrol",
]);

export const SceneDefSchema = z.preprocess((val: any) => {
  if (!val || typeof val !== 'object') return val;
  
  const data = { ...val };
  if (!data.id) data.id = `scene_${Date.now()}`;
  
  if (Array.isArray(data.entities)) {
    data.entities = data.entities.map((e: any) => {
      if (e.shape && !e.isObject) return { ...e, isObject: true };
      return e;
    });
  }
  
  return data;
}, z.object({
  id: z.string().min(1),
  name: z.string().optional(),
  background: BackgroundSchema.optional(),
  soundtrack: SoundtrackSchema.optional(),
  entities: z.array(EntityDefSchema).min(1),
  timeline: TimelineNodeSchema,
})).superRefine((data, ctx) => {
  const entityIds = new Set(data.entities.map(e => e.id));
  
  const checkNode = (node: any, path: (string | number)[]) => {
    if (!node || typeof node !== 'object') return;
    
    if (node.type === 'action') {
      if (!VALID_ACTION_NAMES.has(node.name)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Unknown action: ${node.name}`,
          path: [...path, 'name'],
        });
      }
      
      if (node.entityId && !entityIds.has(node.entityId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Action "${node.name}" targets unknown entity: ${node.entityId}`,
          path: [...path, 'entityId'],
        });
      }
      
      if (node.params && typeof node.params === 'object') {
        Object.entries(node.params).forEach(([key, val]) => {
          if (key.endsWith('Id') && typeof val === 'string' && !entityIds.has(val)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Param "${key}" references unknown entity: ${val}`,
              path: [...path, 'params', key],
            });
          }
        });
      }
    } else if (node.children) {
      node.children.forEach((child: any, i: number) => checkNode(child, [...path, 'children', i]));
    } else if (node.child) {
      checkNode(node.child, [...path, 'child']);
    }
  };
  
  checkNode(data.timeline, ['timeline']);
});

export type ValidatedSceneDef  = z.infer<typeof SceneDefSchema>;
export type ValidatedEntityDef = z.infer<typeof EntityDefSchema>;
