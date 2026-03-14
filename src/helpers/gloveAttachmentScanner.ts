import { LPC_ACTION_ROW_MAP } from "../constants/lpcFolderMap";

type Point = { x: number; y: number };

export type GloveAttachmentConfig = Record<
  string,
  Record<string, (Point | null)[]>
>;

const FRAME_COUNTS: Record<string, number> = {
  spellcast: 7,
  thrust: 8,
  walk: 9,
  slash: 6,
  shoot: 10,
  hurt: 6,
  climb: 6,
  idle: 2,
  jump: 5,
  sit: 3,
  emote: 3,
  run: 8,
  combat_idle: 2,
  punch: 6,
  pull: 9,
  push: 9,
};

const DIRECTION_TO_ROW: Record<string, number> = {
  UP: 0,
  LEFT: 1,
  DOWN: 2,
  RIGHT: 3,
};

const HAND_SIDE_BY_DIRECTION: Record<string, "left" | "right"> = {
  DOWN: "left",
  UP: "right",
  LEFT: "left",
  RIGHT: "left",
};

const animationMap: Record<string, { folder: string; dir: string }> = {};

for (const folder of Object.keys(LPC_ACTION_ROW_MAP)) {
  for (const dir of Object.keys(DIRECTION_TO_ROW)) {
    let animationName: string;
    if (folder === "walk") animationName = `MOVE${dir}`;
    else if (folder === "combat_idle") animationName = `COMBATIDLE${dir}`;
    else if (folder === "emote") animationName = `EMOTE1${dir}`;
    else animationName = `${folder.toUpperCase()}${dir}`;

    animationMap[animationName] = { folder, dir };
  }
}

animationMap["HURT"] = { folder: "hurt", dir: "DOWN" };
animationMap["CLIMBUP"] = { folder: "climb", dir: "UP" };
animationMap["DANCE"] = { folder: "spellcast", dir: "DOWN" };

const imageCache = new Map<string, HTMLImageElement>();

async function getOrLoadImage(url: string): Promise<HTMLImageElement | null> {
  const cached = imageCache.get(url);
  if (cached) return cached;

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageCache.set(url, img);
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

const CELL_SIZE = 64;
const HALF_CELL = 32;

function locateGripPoint(pixels: Uint8ClampedArray, direction: string): Point | null {
  const side = HAND_SIDE_BY_DIRECTION[direction] ?? "left";
  const startX = side === "left" ? 0 : HALF_CELL;
  const endX = side === "left" ? HALF_CELL : CELL_SIZE;

  let lowestVisiblePixel: Point | null = null;

  for (let y = 0; y < CELL_SIZE; y++) {
    for (let x = startX; x < endX; x++) {
      const alphaIndex = (y * CELL_SIZE + x) * 4 + 3;
      const alphaValue = pixels[alphaIndex];

      if (alphaValue > 32) {
        if (!lowestVisiblePixel || y > lowestVisiblePixel.y) {
          lowestVisiblePixel = { x, y };
        }
      }
    }
  }

  return lowestVisiblePixel;
}

async function extractPointsFromSheet(
  path: string,
  folder: string,
  direction: string
): Promise<(Point | null)[]> {
  const imageUrl = `/layers/arms/${path}/${folder}/variant.png`;
  const spriteSheet = await getOrLoadImage(imageUrl);
  if (!spriteSheet) return [];

  const totalFrames = FRAME_COUNTS[folder] ?? 4;
  const targetRow = DIRECTION_TO_ROW[direction] ?? 2;

  const canvas = document.createElement("canvas");
  canvas.width = spriteSheet.width;
  canvas.height = spriteSheet.height;
  const context = canvas.getContext("2d")!;
  context.drawImage(spriteSheet, 0, 0);

  const framePoints: (Point | null)[] = [];

  for (let frame = 0; frame < totalFrames; frame++) {
    const sourceX = frame * CELL_SIZE;
    const sourceY = targetRow * CELL_SIZE;

    const frameData = context.getImageData(sourceX, sourceY, CELL_SIZE, CELL_SIZE).data;
    framePoints.push(locateGripPoint(frameData, direction));
  }

  return framePoints;
}

export async function buildGloveAttachmentConfig(
  gloveType: string
): Promise<GloveAttachmentConfig> {
  const attachmentConfig: GloveAttachmentConfig = {};

  for (const [name, target] of Object.entries(animationMap)) {
    const points = await extractPointsFromSheet(gloveType, target.folder, target.dir);

    if (points.length > 0) {
      attachmentConfig[name] = { hand: points };
    }
  }

  return attachmentConfig;
}