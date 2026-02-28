// bubble not working properly

import type { ActionDefinition } from "../../types/Action";
import { Text, Graphics, Container } from "pixi.js";

type SpeakParams = {
    text: string;
    duration?: number;
};

const BUBBLE_LABEL = "__speech_bubble__";

function removeBubble(entity: { container: { current: import("pixi.js").Container | null } }) {
    const container = entity.container.current;
    if (!container) return;
    const bubble = container.children.find((c) => c.label === BUBBLE_LABEL);
    if (bubble) {
        container.removeChild(bubble);
        bubble.destroy({ children: true });
    }
}

function createSpeechBubble(
    entity: { container: { current: import("pixi.js").Container | null } },
    text: string
): boolean {
    const container = entity.container.current;
    if (!container) return false;

    removeBubble(entity);

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
    tail.moveTo(-6, 0);
    tail.lineTo(6, 0);
    tail.lineTo(0, 9);
    tail.closePath();
    tail.fill({ color: 0xffffff, alpha: 0.95 });
    tail.stroke({ color: 0x333333, width: 1 });
    tail.y = 0;

    const bubble = new Container();
    bubble.label = BUBBLE_LABEL;
    bubble.addChild(bg, label, tail);
    bubble.x = 32;
    bubble.y = -10;

    container.addChild(bubble);
    return true;
}

export const SpeakAction: ActionDefinition<SpeakParams> = {
    enter: (_entity, { text, duration = 2000 }, _ctx, s) => {
        s.text = text;
        s.elapsed = 0;
        s.duration = duration;
        s.created = false;
    },

    update: (entity, _, dt, _ctx, s) => {
        if (!s.created) {
            s.created = createSpeechBubble(entity, s.text);
            if (!s.created) return false;
        }

        s.elapsed += dt * (1000 / 60);
        return s.elapsed >= s.duration;
    },

    exit: (entity) => {
        removeBubble(entity);
    },
};
