// bubble not working properly

import type { ActionDefinition } from "../../types/Action";
import { Text, Graphics, Container, Ticker } from "pixi.js";

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

    const style = {
        fontFamily: "Outfit, Inter, -apple-system, sans-serif",
        fontSize: 15,
        fill: 0x1f2937,
        wordWrap: true,
        wordWrapWidth: 180,
        align: "center" as const,
        fontWeight: "500" as const,
        lineHeight: 18,
    };

    const label = new Text({ text, style });
    label.anchor.set(0.5, 1);

    const paddingX = 16;
    const paddingY = 12;
    const bubbleWidth = label.width + paddingX * 2;
    const bubbleHeight = label.height + paddingY * 2;

    const bg = new Graphics();
    bg.roundRect(
        -bubbleWidth / 2 + 2,
        -bubbleHeight - paddingY + 2,
        bubbleWidth,
        bubbleHeight,
        14
    );
    bg.fill({ color: 0x000000, alpha: 0.15 });
    bg.roundRect(
        -bubbleWidth / 2,
        -bubbleHeight - paddingY,
        bubbleWidth,
        bubbleHeight,
        14
    );
    bg.fill({ color: 0xffffff, alpha: 0.98 });
    bg.stroke({ color: 0xe5e7eb, width: 1.5 });
    const tailY = -paddingY + 0.5;
    bg.moveTo(-8, tailY);
    bg.bezierCurveTo(-4, tailY, -2, tailY + 8, 0, tailY + 8);
    bg.bezierCurveTo(2, tailY + 8, 4, tailY, 8, tailY);
    bg.closePath();
    bg.fill({ color: 0xffffff, alpha: 0.98 });
    bg.stroke({ color: 0xe5e7eb, width: 1.5 });

    const bubble = new Container();
    bubble.label = BUBBLE_LABEL;
    bubble.addChild(bg, label);
    label.y = -paddingY * 1.5;
    bubble.x = 0;
    bubble.y = -35;
    bubble.scale.set(0);
    bubble.alpha = 0;

    let scaleVal = 0;
    const ticker = (ticker: import("pixi.js").Ticker) => {
        const dt = ticker.deltaTime;
        scaleVal += (1 - scaleVal) * 0.2 * dt;
        bubble.scale.set(scaleVal);
        bubble.alpha = Math.min(1, scaleVal * 1.5);
        if (scaleVal > 0.999) {
            bubble.scale.set(1);
            bubble.alpha = 1;
            (bubble as any).__ticker_cleanup?.();
        }
    };

    (bubble as any).__ticker_cleanup = () => {
        Ticker.shared.remove(ticker);
    };
    Ticker.shared.add(ticker);

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