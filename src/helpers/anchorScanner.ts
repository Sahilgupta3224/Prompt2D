export const ANCHOR_COLORS = {
    hand: [255, 0, 255] as const,   
    feet: [0, 255, 255] as const,   
} satisfies Record<string, readonly [number, number, number]>;

export type AnchorPoint = keyof typeof ANCHOR_COLORS;
export type FrameOffsets = ({ x: number; y: number } | null)[];
export type AnchorMap = Record<string, Partial<Record<AnchorPoint, FrameOffsets>>>;
export interface RowDesc {
    name: string;
    row: number;
    frames: number;
}
export interface ScanResult {
    anchorMap: AnchorMap;
    cleanUrl: string;
}

function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

function colorsMatch(
    data: Uint8ClampedArray,
    idx: number,
    target: readonly [number, number, number]
): boolean {
    if (data[idx + 3] < 128) return false;
    return data[idx] === target[0] && data[idx + 1] === target[1] && data[idx + 2] === target[2];
}

export async function scanAnchors(
    imageUrl: string,
    frameWidth: number,
    frameHeight: number,
    rows: RowDesc[]
): Promise<ScanResult> {
    const img = await loadImage(imageUrl);

    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("[anchorScanner] Could not get 2D context");

    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, img.width, img.height);
    const { data, width } = imageData;

    const anchorMap: AnchorMap = {};
    const pixelsToErase: number[] = [];

    for (const { name, row, frames } of rows) {
        anchorMap[name] = {};

        for (let frame = 0; frame < frames; frame++) {
            const cellX = frame * frameWidth;
            const cellY = row * frameHeight;

            for (let py = 0; py < frameHeight; py++) {
                for (let px = 0; px < frameWidth; px++) {
                    const idx = ((cellY + py) * width + (cellX + px)) * 4;
                    if (data[idx + 3] < 128) continue;
                    for (const [anchorName, color] of Object.entries(ANCHOR_COLORS) as [AnchorPoint, readonly [number, number, number]][]) {
                        if (colorsMatch(data, idx, color)) {
                            if (!anchorMap[name][anchorName]) {
                                anchorMap[name][anchorName] = Array(frames).fill(null);
                            }
                            anchorMap[name][anchorName]![frame] = {
                                x: px,
                                y: py,
                            };
                            console.log(
                                `[anchor] "${anchorName}" in "${name}" frame ${frame}` +
                                ` → pixel (${px}, ${py}) in 64×64 cell` +
                                ` [row ${rows.find(r => r.name === name)?.row}, cellX=${frame * frameWidth}]`
                            );
                            pixelsToErase.push(idx);
                        }
                    }
                }
            }
        }

        for (const anchorName of Object.keys(anchorMap[name]) as AnchorPoint[]) {
            const offsets = anchorMap[name][anchorName]!;
            let last: { x: number; y: number } | null = null;
            for (let i = 0; i < offsets.length; i++) {
                if (offsets[i] !== null) last = offsets[i];
                else if (last !== null) offsets[i] = last;
            }
        }
    }

    for (const idx of pixelsToErase) {
        data[idx] = 0;
        data[idx + 1] = 0;
        data[idx + 2] = 0;
        data[idx + 3] = 0;
    }

    ctx.putImageData(imageData, 0, 0);
    const cleanUrl = canvas.toDataURL("image/png");

    const found = Object.entries(anchorMap)
        .filter(([, pts]) => Object.keys(pts).length > 0).length;
    console.info(
        `[anchorScanner] Scanned ${rows.length} animations — ` +
        `found anchors in ${found}, erased ${pixelsToErase.length} pixel(s).`
    );

    return { anchorMap, cleanUrl };
}

export function Config(
    anchorMap: AnchorMap
): Record<string, Record<string, { x: number; y: number } | { x: number; y: number }[]>> {
    const config: Record<string, Record<string, { x: number; y: number } | { x: number; y: number }[]>> = {};

    for (const [animName, points] of Object.entries(anchorMap)) {
        config[animName] = {};
        for (const [point, offsets] of Object.entries(points) as [string, FrameOffsets][]) {
            const valid = offsets.filter((o): o is { x: number; y: number } => o !== null);
            if (valid.length === 0) continue;

            const allSame = valid.every(o => o.x === valid[0].x && o.y === valid[0].y);
            config[animName][point] = allSame ? valid[0] : offsets.map(o => o ?? valid[0]);
        }
    }

    return config;
}