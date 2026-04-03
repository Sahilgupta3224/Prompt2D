import { buildCompactSystemPrompt } from "./systemPrompt";
import type { SceneDefinition } from "../types/Scene";
import { SceneDefSchema } from "../types/schemas";
import { DEMO_SCENE } from "../constants/demo-scene";

const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_MODEL = "llama-3.1-8b-instant";

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

interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

interface GroqResponse {
    choices?: {
        message?: { content?: string };
        finish_reason?: string;
    }[];
    error?: { message: string; type: string; code: string };
}

function getConfig() {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
    const model = (import.meta.env.VITE_LLM_MODEL as string) || DEFAULT_MODEL;

    if (!apiKey) {
        throw new Error(
            "Missing VITE_GROQ_API_KEY. Add it to your .env file:\nVITE_GROQ_API_KEY=your_key_here"
        );
    }

    return { apiKey, model };
}

function extractJSON(raw: string): { success: true; data: any } | { success: false; error: string } {
    let cleaned = raw.trim();
    const fenceMatch = cleaned.match(/```(?:json)?\s*\n?([\s\S]*?)\n?\s*```/);
    if (fenceMatch) {
        cleaned = fenceMatch[1].trim();
    }

    if (!cleaned.startsWith("{")) {
        const start = cleaned.indexOf("{");
        const end = cleaned.lastIndexOf("}");
        if (start !== -1 && end !== -1 && end > start) {
            cleaned = cleaned.slice(start, end + 1);
        }
    }

    try {
        const data = JSON.parse(cleaned);
        return { success: true, data };
    } catch (e) {
        return {
            success: false,
            error: `JSON parse error: ${(e as Error).message}. Raw starts with: "${raw.slice(0, 200)}"`,
        };
    }
}

async function callLLM(messages: ChatMessage[]): Promise<string> {
    const { apiKey, model } = getConfig();

    const body = {
        model,
        messages,
        temperature: 0.7,
        max_tokens: 1024,
        response_format: { type: "json_object" },
    };

    const response = await fetch(GROQ_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API error (${response.status}): ${errorText}`);
    }

    const result: GroqResponse = await response.json();

    if (result.error) {
        throw new Error(`Groq API error: ${result.error.message}`);
    }

    const text = result.choices?.[0]?.message?.content;
    if (!text) {
        throw new Error("Groq returned empty response — no content in message");
    }

    return text;
}

async function directGroqGenerate(
    prompt: string,
    worldState?: string
): Promise<LLMResponse> {
    const systemPrompt = buildCompactSystemPrompt(worldState);

    const messages: ChatMessage[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
    ];

    try {
        const rawResponse = await callLLM(messages);
        const parsed = extractJSON(rawResponse);

        if (!parsed.success) {
            return await retrySelfCorrection(messages, rawResponse, parsed.error);
        }

        const validated = SceneDefSchema.safeParse(parsed.data);

        if (!validated.success) {
            return await retrySelfCorrection(
                messages,
                rawResponse,
                `Validation errors:\n${validated.error.issues.map((i) => `- ${i.path.join('.')}: ${i.message}`).join("\n")}`
            );
        }

        return { success: true, scene: validated.data as SceneDefinition, isFallback: false };
    } catch (error) {
        console.error(`[Client] Direct LLM request failed: ${(error as Error).message}`);
        return {
            success: true,
            scene: DEMO_SCENE,
            isFallback: true,
            message: `Direct fallback: ${(error as Error).message}`,
        };
    }
}

async function retrySelfCorrection(
    originalMessages: ChatMessage[],
    failedResponse: string,
    errorDescription: string
): Promise<LLMResponse> {
    const retryMessages: ChatMessage[] = [
        ...originalMessages,
        { role: "assistant", content: failedResponse },
        {
            role: "user",
            content: `Your previous output had errors:\n${errorDescription}\n\nPlease fix these errors and return a valid SceneDefinition JSON.`,
        },
    ];

    try {
        const retryRaw = await callLLM(retryMessages);
        const retryParsed = extractJSON(retryRaw);

        if (!retryParsed.success) {
            console.error(`[Client] Retry parse failed: ${retryParsed.error}`);
            return { success: true, scene: DEMO_SCENE, isFallback: true };
        }

        const retryValidated = SceneDefSchema.safeParse(retryParsed.data);

        if (!retryValidated.success) {
            console.error(`[Client] Retry validation failed:`, retryValidated.error.format());
            return { success: true, scene: DEMO_SCENE, isFallback: true };
        }

        return { success: true, scene: retryValidated.data as SceneDefinition, isFallback: false };
    } catch (error) {
        console.error(`[Client] Retry failed: ${(error as Error).message}`);
        return { success: true, scene: DEMO_SCENE, isFallback: true };
    }
}

export async function generateScene(
    prompt: string,
    worldState?: string
): Promise<LLMResult> {
    if (!(prompt.trim())) {
        return {
            success: true,
            scene: DEMO_SCENE,
            isFallback: true,
            message: "Empty prompt",
        };
    }
    try {
        const directResponse = await directGroqGenerate(prompt.trim(), worldState);
        if (directResponse.success) {
            return directResponse as LLMResult;
        }
    } catch (e) {
        console.error("[Client] Direct call also failed:", e);
    }
    return {
        success: true,
        scene: DEMO_SCENE,
        isFallback: true,
    };
}
