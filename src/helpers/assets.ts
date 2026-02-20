import backgroundAsset from "../assets/whitebg.png";
// import circle from "../assets/space-stars.jpg";
// import square from "../assets/square.png";
// import rectangle from "../assets/rectangle.png";
// import cylinder from "../assets/cylinder.png";
// import cone from "../assets/cone.png";
// import pyramid from "../assets/pyramid.png";

export const backgroundAssets = {
  park: backgroundAsset,
  city: backgroundAsset,
  forest: backgroundAsset,
  mountain: backgroundAsset,
  beach: backgroundAsset,
  desert: backgroundAsset,
}

export const objectAssets = {
  circle: backgroundAsset,
  square: backgroundAsset,
  rectangle: backgroundAsset,
  cylinder: backgroundAsset,
  cone: backgroundAsset,
  pyramid: backgroundAsset,
}

export type BackgroundName = keyof typeof backgroundAssets;
export type objectName = keyof typeof objectAssets;