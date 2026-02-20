import { Graphics, Texture, type Renderer } from "pixi.js";

export type ShapeName =
    | "circle"
    | "square"
    | "rectangle"
    | "triangle"
    | "diamond"
    | "star"
    | "heart"
    | "ellipse"
    | "capsule"
    | "arrow"
    | "cross"
    | "ring"
    | "cone"
    | "cylinder"
    | "randomPolygon"

export interface ShapeOptions {
    shape: ShapeName;
    color?: string;
    size?: number;
    strokeColor?: string;
    strokeWidth?: number;
}

const DEFAULT_SIZE = 64;
const DEFAULT_COLOR = "#4a90d9";

const textureCache = new Map<string, Texture>();

function getCacheKey(options: ShapeOptions): string {
    return `${options.shape}_${options.color ?? DEFAULT_COLOR}_${options.size ?? DEFAULT_SIZE}_${options.strokeColor ?? "none"}_${options.strokeWidth ?? 0}`;
}

function drawShape(g: Graphics, shape: ShapeName, size: number): void {
    const half = size / 2;

    switch (shape) {
        case "circle":
            g.circle(half, half, half);
            break;

        case "square":
            g.rect(0, 0, size, size);
            break;

        case "rectangle":
            g.rect(0, size * 0.15, size, size * 0.7);
            break;

        case "triangle":
            g.moveTo(half, 0);
            g.lineTo(size, size);
            g.lineTo(0, size);
            g.closePath();
            break;

        case "diamond":
            g.moveTo(half, 0);
            g.lineTo(size, half);
            g.lineTo(half, size);
            g.lineTo(0, half);
            g.closePath();
            break;


        case "star": {
            const cx = half, cy = half;
            const outerR = half;
            const innerR = half * 0.4;
            const points = 5;
            for (let i = 0; i < points * 2; i++) {
                const r = i % 2 === 0 ? outerR : innerR;
                const angle = (Math.PI * i) / points - Math.PI / 2;
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                if (i === 0) g.moveTo(x, y);
                else g.lineTo(x, y);
            }
            g.closePath();
            break;
        }

        case "heart": {
            const s = size * 0.5;
            g.moveTo(half, size * 0.85);
            g.bezierCurveTo(half - s * 1.5, half, half - s, 0, half, size * 0.3);
            g.bezierCurveTo(half + s, 0, half + s * 1.5, half, half, size * 0.85);
            break;
        }

        case "ellipse":
            g.ellipse(half, half, half, half * 0.6);
            break;

        case "capsule":
            g.roundRect(0, size * 0.15, size, size * 0.7, size * 0.35);
            break;

        case "arrow":
            g.moveTo(half, 0);
            g.lineTo(size, half * 0.8);
            g.lineTo(size * 0.65, half * 0.8);
            g.lineTo(size * 0.65, size);
            g.lineTo(size * 0.35, size);
            g.lineTo(size * 0.35, half * 0.8);
            g.lineTo(0, half * 0.8);
            g.closePath();
            break;

        case "cross": {
            const t = size * 0.3;
            const cx = half - t / 2;
            const cy = half - t / 2;
            g.rect(cx, 0, t, size);
            g.rect(0, cy, size, t);
            break;
        }

        case "ring":
            g.circle(half, half, half);
            g.circle(half, half, half * 0.55);
            g.cut();
            break;

        case "cone":
            g.moveTo(half, 0);
            g.lineTo(size, size);
            g.lineTo(0, size);
            g.closePath();
            break;

        case "cylinder":
            g.ellipse(half, size * 0.15, half, size * 0.15);
            g.rect(0, size * 0.15, size, size * 0.7);
            g.ellipse(half, size * 0.85, half, size * 0.15);
            break;

        case "randomPolygon": {
            let seed = size * 9301 + 49297;
            const rand = () => {
                seed = (seed * 1664525 + 1013904223) & 0xffffffff;
                return (seed >>> 0) / 0xffffffff;
            };

            const sides = 5 + Math.floor(rand() * 5);
            const angleStep = (Math.PI * 2) / sides;
            const minR = half * 0.55;
            const maxR = half * 0.95;

            for (let i = 0; i < sides; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const r = minR + rand() * (maxR - minR);
                const x = half + r * Math.cos(angle);
                const y = half + r * Math.sin(angle);
                if (i === 0) g.moveTo(x, y);
                else g.lineTo(x, y);
            }
            g.closePath();
            break;
        }

        default:
            g.circle(half, half, half);
    }
}

export function generateShapeTexture(
    renderer: Renderer,
    options: ShapeOptions
): Texture {
    const key = getCacheKey(options);

    const cached = textureCache.get(key);
    if (cached) return cached;

    const size = options.size ?? DEFAULT_SIZE;
    const color = options.color ?? DEFAULT_COLOR;

    const g = new Graphics();

    drawShape(g, options.shape, size);

    g.fill({ color });

    if (options.strokeColor && options.strokeWidth) {
        drawShape(g, options.shape, size);
        g.stroke({ color: options.strokeColor, width: options.strokeWidth });
    }

    const texture = renderer.generateTexture(g);
    g.destroy();

    textureCache.set(key, texture);
    return texture;
}

export function getAvailableShapes(): ShapeName[] {
    return [
        "circle", "square", "rectangle", "triangle", "diamond",
        "star", "heart", "ellipse",
        "capsule", "arrow", "cross", "ring",
        "cone", "cylinder", "randomPolygon"
    ];
}
