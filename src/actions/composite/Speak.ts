import type { ActionDefinition } from "../../types/Action";
import { Text, Graphics, Container } from "pixi.js";

type SpeakParams = {
    text: string;
    duration: number;
};

export const SpeakAction: ActionDefinition<SpeakParams> = {
    enter: (entity, { text, duration }) => {
        entity.state.speech = {
            text,
            duration,
            elapsed: 0,
        };

        const container = entity.container.current;
        if (container) {
            const bubble = new Container();
            bubble.label = "__speech_bubble__";

            const label = new Text({
                text,
                style: {
                    fontFamily: "Arial",
                    fontSize: 14,
                    fill: 0x000000,
                    wordWrap: true,
                    wordWrapWidth: 150,
                    align: "center",
                },
            });
            label.anchor.set(0.5, 1);

            const padding = 8;
            const bg = new Graphics();
            bg.roundRect(
                -label.width / 2 - padding,
                -label.height - padding,
                label.width + padding * 2,
                label.height + padding * 2,
                8
            );
            bg.fill({ color: 0xffffff, alpha: 0.95 });
            bg.stroke({ color: 0x333333, width: 1.5 });

            const tail = new Graphics();
            tail.moveTo(-5, 0);
            tail.lineTo(5, 0);
            tail.lineTo(0, 8);
            tail.closePath();
            tail.fill({ color: 0xffffff, alpha: 0.95 });
            tail.y = 0;

            bubble.addChild(bg, label, tail);
            bubble.x = 32;
            bubble.y = -10;

            container.addChild(bubble);
        }
    },

    update: (entity, _, dt) => {
        entity.state.speech.elapsed += dt * (1000 / 60);

        if (entity.state.speech.elapsed >= entity.state.speech.duration) {
            return true;
        }

        return false;
    },

    exit: (entity) => {
        const container = entity.container.current;
        if (container) {
            const bubble = container.children.find(
                (c) => c.label === "__speech_bubble__"
            );
            if (bubble) {
                container.removeChild(bubble);
                bubble.destroy();
            }
        }
        delete entity.state.speech;
    },
};
