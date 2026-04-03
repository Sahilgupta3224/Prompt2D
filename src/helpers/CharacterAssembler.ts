import { Texture, Assets } from "pixi.js";
import { LPC_ACTION_ROW_MAP, LPC_ANIMATION_FOLDERS, LPC_LAYER_ORDER, LAYER_CATEGORY_BASE } from "../constants/lpcFolderMap";
import type { CharacterAppearance, AppearanceCategory } from "../types/CharacterAppearance";

export interface CharacterLayer {
    url: string;
    zPos: number;
}

export class CharacterAssembler {
    private static textureCache: Map<string, Texture> = new Map();
    private static SHEET_WIDTH = 832;
    private static SHEET_HEIGHT = 4096;

    private static supportCache: Map<string, boolean> = new Map();

    private static async hasAllAnimations(cat: string, subPath: string): Promise<boolean> {
        const key = `${cat}:${subPath}`;
        if (this.supportCache.has(key)) return this.supportCache.get(key)!;
        const canaries = ["walk"];
        const results = await Promise.all(canaries.map(async (anim) => {
            const baseFolder = LAYER_CATEGORY_BASE[cat] ?? cat;
            const url = `/layers/${baseFolder}/${subPath}/${anim}/variant.png`;
            try {
                const res = await fetch(url, { method: 'HEAD' });
                return res.ok;
            } catch { return false; }
        }));

        const supported = !results.includes(false);
        this.supportCache.set(key, supported);
        return supported;
    }

    static async assembleFromAppearance(appearance: CharacterAppearance): Promise<Texture> {
        const cacheKey = JSON.stringify(appearance);
        if (this.textureCache.has(cacheKey)) {
            return this.textureCache.get(cacheKey)!;
        }

        const canvas = document.createElement("canvas");
        canvas.width = this.SHEET_WIDTH;
        canvas.height = this.SHEET_HEIGHT;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) throw new Error("Could not get canvas context");
        ctx.imageSmoothingEnabled = false;

        const activeCategories = (Object.keys(appearance) as (keyof CharacterAppearance)[])
            .filter(cat => !!appearance[cat])
            .sort((a, b) => {
                const orderA = LPC_LAYER_ORDER.indexOf(a);
                const orderB = LPC_LAYER_ORDER.indexOf(b);
                return (orderA === -1 ? 99 : orderA) - (orderB === -1 ? 99 : orderB);
            });

        for (const cat of activeCategories) {
            if (cat === 'fallbacks') continue;
            let subPath = appearance[cat as keyof CharacterAppearance] as string;
            if (!subPath) continue;

            const fallbackPath = appearance.fallbacks?.[cat as AppearanceCategory];
            if (fallbackPath) {
                const supported = await this.hasAllAnimations(cat, subPath);
                if (!supported) {
                    console.log(`[Assembler] ${cat}/${subPath} missing animations, using fallback: ${fallbackPath}`);
                    subPath = fallbackPath;
                }
            }

            await Promise.all(LPC_ANIMATION_FOLDERS.map(async (anim) => {
                const baseFolder = LAYER_CATEGORY_BASE[cat] ?? cat;
                const url = `/layers/${baseFolder}/${subPath}/${anim}/variant.png`;

                try {
                    const texture = await Assets.load(url);
                    if (texture) {
                        const startRow = LPC_ACTION_ROW_MAP[anim];
                        const source = texture.source.resource;
                        const sWidth = texture.source.pixelWidth;
                        const sHeight = texture.source.pixelHeight;

                        ctx.drawImage(
                            source as CanvasImageSource,
                            0, 0, sWidth, sHeight,
                            0, startRow * 64, sWidth, sHeight
                        );
                    }
                } catch (e) {
                    // console.log(e)
                }
            }));
        }

        const finalTexture = Texture.from(canvas);
        finalTexture.source.resolution = 1;
        finalTexture.source.scaleMode = 'nearest';
        finalTexture.source.update();

        this.textureCache.set(cacheKey, finalTexture);
        return finalTexture;
    }

    static async assemble(layers: CharacterLayer[]): Promise<Texture> {
        const sortedLayers = [...layers].sort((a, b) => a.zPos - b.zPos);
        const images = await Promise.all(
            sortedLayers.map(async (layer) => {
                try {
                    return await Assets.load(layer.url);
                } catch (e) {
                    console.error(`Failed to load layer: ${layer.url}`, e);
                    return null;
                }
            })
        );

        const validImages = images.filter((img) => img !== null);
        if (validImages.length === 0) throw new Error("No valid layers loaded");

        const width = validImages[0].width;
        const height = validImages[0].height;

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not get canvas context");
        ctx.clearRect(0, 0, width, height);

        for (const texture of validImages) {
            ctx.drawImage(texture.source.resource, 0, 0);
        }

        const finalTexture = Texture.from(canvas);
        finalTexture.source.update();
        return finalTexture;
    }
}
