import type { ActionDefinition } from "../../types/Action";
import { Text, Container } from "pixi.js";

type EmoteParams = {
    emote: string;
    duration: number;
};

const EMOTE_MAP: Record<string, string> = {
    happy: "😊",
    sad: "😢",
    angry: "💢",
    love: "❤️",
    surprise: "❗",
    question: "❓",
    sleep: "💤",
    idea: "💡",
    sweat: "💧",
    star: "⭐",
    laugh: "😂",
    cool: "😎",
    scared: "😱",
    dizzy: "💫",
};

function removeEmote(entity: { container: { current: import("pixi.js").Container | null } }) {
    const container = entity.container.current;
    if (!container) return;
    const el = container.children.find((c) => c.label === "__emote__");
    if (el) {
        container.removeChild(el);
        el.destroy({ children: true });
    }
}

function createEmoteBubble(entity: { container: { current: import("pixi.js").Container | null } }, symbol: string): boolean {
    const container = entity.container.current;
    if (!container) return false;
    removeEmote(entity);

    const label = new Text({
        text: symbol,
        style: { fontSize: 24 },
    });
    label.anchor.set(0.5, 1);

    const emoteContainer = new Container();
    emoteContainer.label = "__emote__";
    emoteContainer.addChild(label);
    emoteContainer.x = 32;
    emoteContainer.y = -20;
    emoteContainer.alpha = 1;

    container.addChild(emoteContainer);
    return true;
}

export const EmoteAction: ActionDefinition<EmoteParams> = {
    enter: (_entity, { emote, duration }, _ctx, s) => {
        s.symbol = EMOTE_MAP[emote] ?? emote;
        s.elapsed = 0;
        s.duration = duration;
        s.created = false;
    },

    update: (entity, _, dt, _ctx, s) => {
        if (!s.created) {
            s.created = createEmoteBubble(entity, s.symbol);
            if (!s.created) return false;
        }

        s.elapsed += dt * (1000 / 60);
        const progress = Math.min(s.elapsed / s.duration, 1);

        const container = entity.container.current;
        if (container) {
            const el = container.children.find((c) => c.label === "__emote__");
            if (el) {
                el.y = -20 - Math.sin(progress * Math.PI) * 15;
                el.alpha = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
            }
        }

        return progress >= 1;
    },

    exit: (entity) => {
        removeEmote(entity);
    },
};
