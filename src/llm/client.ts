import { buildCompactSystemPrompt } from "./systemPrompt";
import type { SceneDefinition } from "../types/Scene";
import { SceneDefSchema } from "../types/schemas";
import { DEMO_SCENE } from "../constants/demo-scene";

export type GenerationStatus =
    | "idle"
    | "generating"
    | "success"
    | "fallback"
    | "error";

export interface LLMResult {
    success: true;
    scene: SceneDefinition;
    isFallback: boolean;
    message?: string;
}

export interface LLMError {
    success: false;
    error: string;
    raw?: string;
}

export type LLMResponse = LLMResult | LLMError;

async function callBackend(prompt: string): Promise<SceneDefinition> {
    const response = await fetch("http://localhost:8000/generate_scene", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Backend error (${response.status}): ${text}`);
    }

    const data = await response.json();
    if (data.error && data.raw_scene !== undefined) {
        throw new Error(`validation error: ${data.error}`);
    }

    const validated = SceneDefSchema.safeParse(data);
    console.log("[Client] Raw scene data:", data);
    if (!validated.success) {
        validated.error.issues.forEach((issue, i) => {
            console.error(`  [${i + 1}] path: ${issue.path.join(".")} | ${issue.message}`);
        });
        throw new Error("invalid scenedefinition");
    }

    return validated.data;
}

async function directGroqGenerate(
    prompt: string,
    worldState?: string
): Promise<LLMResponse> {
    try {
        buildCompactSystemPrompt(worldState);

        const scene = await callBackend(prompt);

        return {
            success: true,
            scene,
            isFallback: false,
        };
    } catch (error) {
        console.error("[Client] Backend request failed:", error);

        return {
            success: true,
            scene: DEMO_SCENE,
            isFallback: true,
            message: (error as Error).message,
        };
    }
}

export async function generateScene(
    prompt: string,
    worldState?: string
): Promise<LLMResult> {
    if (!prompt.trim()) {
        return {
            success: true,
            scene: DEMO_SCENE,
            isFallback: true,
            message: "Empty prompt",
        };
    }

    try {
        const response = await directGroqGenerate(prompt.trim(), worldState);

        if (response.success) {
            return response as LLMResult;
        }
    } catch (e) {
        console.error("[Client] Error:", e);
    }

    return {
        success: true,
        scene: DEMO_SCENE,
        isFallback: true,
    };
}