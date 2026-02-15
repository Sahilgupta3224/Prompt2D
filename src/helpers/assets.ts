import backgroundAsset from "../assets/whitebg.png";

export const backgroundAssets = {
  park: backgroundAsset,
  city: backgroundAsset,
  forest: backgroundAsset,
  mountain: backgroundAsset,
  beach: backgroundAsset,
  desert: backgroundAsset,
}

export type BackgroundName = keyof typeof backgroundAssets;
