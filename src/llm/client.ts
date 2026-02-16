import { buildSystemPrompt } from "./systemPrompt";
import type { SceneDefinition } from "../types/Scene";

const DEFAULT_MODEL = "groq/compound";
const GROQ_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";

function getConfig() {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
    const model = (import.meta.env.VITE_LLM_MODEL as string) || DEFAULT_MODEL;

    if (!apiKey) {
        throw new Error(
            "Missing VITE_GROQ_API_KEY. Add it to your .env file:\nVITE_GROQ_API_KEY=your_key_here\n\nGet a free key at https://console.groq.com"
        );
    }

    return { apiKey, model };
}

interface ChatMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

interface GroqResponse {
    choices?: {
        message?: {
            content?: string;
        };
        finish_reason?: string;
    }[];
    error?: { message: string; type: string; code: string };
}

export interface LLMResult {
    success: true;
    scene: SceneDefinition;
}

export interface LLMError {
    success: false;
    error: string;
    raw?: string;
}

export type LLMResponse = LLMResult | LLMError;


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
            error: `JSON parse error: ${(e as Error).message}. Raw response starts with: "${raw.slice(0, 200)}"`,
        };
    }
}

function basicValidate(data: any): { valid: true; scene: SceneDefinition } | { valid: false; errors: string[] } {
    const errors: string[] = [];

    if (!data || typeof data !== "object") {
        return { valid: false, errors: ["Response is not an object"] };
    }

    if (!data.id || typeof data.id !== "string") {
        data.id = "scene_" + Date.now();
    }

    if (!Array.isArray(data.entities) || data.entities.length === 0) {
        errors.push("'entities' must be a non-empty array");
    }

    if (!data.timeline || typeof data.timeline !== "object") {
        errors.push("'timeline' must be an object");
    } else if (!data.timeline.type) {
        errors.push("'timeline.type' is required (action | sequence | parallel | loop)");
    }

    if (errors.length > 0) {
        return { valid: false, errors };
    }

    return { valid: true, scene: data as SceneDefinition };
}

async function callLLM(
    messages: ChatMessage[]
): Promise<string> {
    const { apiKey, model } = getConfig();

    const body = {
        model,
        messages,
        temperature: 0.7,
        max_tokens: 4096,
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

export async function generateScene(
    prompt: string,
    worldState?: string
): Promise<LLMResponse> {
    const systemPrompt = buildSystemPrompt(worldState);

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

        const validated = basicValidate(parsed.data);

        if (!validated.valid) {
            return await retrySelfCorrection(
                messages,
                rawResponse,
                `Validation errors:\n${validated.errors.map((e) => `- ${e}`).join("\n")}`
            );
        }

        return { success: true, scene: validated.scene };
    } catch (error) {
        return {
            success: false,
            error: `LLM request failed: ${(error as Error).message}`,
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
            return {
                success: false,
                error: `Failed after retry. Parse error: ${retryParsed.error}`,
                raw: retryRaw,
            };
        }

        const retryValidated = basicValidate(retryParsed.data);

        if (!retryValidated.valid) {
            return {
                success: false,
                error: `Failed after retry. Validation errors:\n${retryValidated.errors.join("\n")}`,
                raw: retryRaw,
            };
        }

        return { success: true, scene: retryValidated.scene };
    } catch (error) {
        return {
            success: false,
            error: `Retry failed: ${(error as Error).message}`,
        };
    }
}
