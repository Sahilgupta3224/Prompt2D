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

export const SceneDefSchema = z.object({
    id:         z.string().min(1),
    name:       z.string().optional(),
    background: BackgroundSchema.optional(),
    soundtrack: SoundtrackSchema.optional(),
    entities:   z.array(EntityDefSchema).min(1),
    timeline:   TimelineNodeSchema,
});

export type ValidatedSceneDef  = z.infer<typeof SceneDefSchema>;
export type ValidatedEntityDef = z.infer<typeof EntityDefSchema>;
