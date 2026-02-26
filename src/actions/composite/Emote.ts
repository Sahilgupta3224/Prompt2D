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
};

export const EmoteAction: ActionDefinition<EmoteParams> = {
    enter: (entity, { emote, duration }, _ctx, s) => {
        const symbol = EMOTE_MAP[emote] ?? emote;
        s.elapsed = 0;
        s.duration = duration;
        s.startY = -20;

        const container = entity.container.current;
        if (container) {
            const emoteContainer = new Container();
            emoteContainer.label = "__emote__";

            const label = new Text({
                text: symbol,
                style: {
                    fontSize: 24,
                },
            });
            label.anchor.set(0.5, 1);

            emoteContainer.addChild(label);
            emoteContainer.x = 32;
            emoteContainer.y = -20;

            container.addChild(emoteContainer);
        }
    },

    update: (entity, _, dt, _ctx, s) => {
        s.elapsed += dt * (1000 / 60);

        const container = entity.container.current;
        if (container) {
            const emoteContainer = container.children.find(
                (c) => c.label === "__emote__"
            );
            if (emoteContainer) {
                const progress = s.elapsed / s.duration;
                emoteContainer.y = s.startY - Math.sin(progress * Math.PI) * 15;
                emoteContainer.alpha = progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
            }
        }

        return s.elapsed >= s.duration;
    },

    exit: (entity) => {
        const container = entity.container.current;
        if (container) {
            const emoteContainer = container.children.find(
                (c) => c.label === "__emote__"
            );
            if (emoteContainer) {
                container.removeChild(emoteContainer);
                emoteContainer.destroy();
            }
        }
    },
};
