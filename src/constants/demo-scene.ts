import type { SceneDefinition } from "../types/Scene";
import { DEFAULT_X_POS, DEFAULT_Y_POS } from "./game-world";
import { HERO_ATTACHMENTS } from "../config/hero-attachments";

export const DEMO_SCENE: SceneDefinition = {
  id: "demo",
  name: "Demo Scene",
  entities: [
    {
      id: "hero1",
      position: { x: DEFAULT_X_POS, y: DEFAULT_Y_POS },
      scale: 2,
      attachments: HERO_ATTACHMENTS,
    },
    {
      id: "hero2",
      position: { x: DEFAULT_X_POS + 200, y: DEFAULT_Y_POS },
      scale: 2,
      attachments: HERO_ATTACHMENTS,
    },
    {
      id: "rock",
      position: { x: 670, y: 50 },
      scale: 0.4,
      isObject: true,
      shape: "randomPolygon",
      color: "#de0404ff"
    },
  ],
  background: "park",
  timeline: {
    type: "sequence",
    children: [
      {
        type: "action",
        name: "grab",
        params: { objectId: "rock", attachmentPoint: "hand" },
      },
      // {
      //   type: "action",
      //   name:"give",
      //   params:{objectId: "rock", targetId:"hero2"},
      //   entityId: "hero1"
      // },
      // {
      //   type: "action",
      //   name: "move",
      //   params: { destination: { x: 200, y: 200 } },
      //   entityId: "hero1"
      // },
      // {
      //   type: "action",
      //   name: "move",
      //   params: { destination: { x: 300, y: 200 } },
      //   entityId: "hero2"
      // },
      // // {
      // //   type: "action",
      // //   name: "fade",
      // //   params: { targetAlpha: 0.5 },
      // //   // entityId: "hero2"
      // // },
      // {
      //   type: "action",
      //   name: "speak",
      //   params: { text: "Hello world!", duration: 2000 },
      // },
      // {
      //   type: "action",
      //   name: "emote",
      //   params: { emote: "happy", duration: 1000 },
      //   entityId: "hero2"
      // },
      {
        type: "action",
        name: "wait",
        params: { duration: 500 },
      },
      // {
      //   type: "action",
      //   name: "grab",
      //   params: { objectId: "rock", attachmentPoint: "hand" },
      // },
      // {
      //   type: "action",
      //   name: "move",
      //   params: { destination: { x: 600, y: 300 } },
      // },
      // {
      //   type: "action",
      //   name: "jump",
      //   params: { height: 50 },
      // },
      {
        type: "action",
        name: "throw",
        params: { objectId: "rock", target: { x: 500, y: 300 }, arcHeight: 50 },
      },
      // // {
      // //   type: "action",
      // //   name: "Fade",
      // //   params: {targetAlpha:0 },
      // // },
      // // {
      // //   type: "action",
      // //   name: "rotate",
      // //   params: { angle: 180, duration: 10 },
      // // },
      // {
      //   type: "action",
      //   name: "oscillate",
      //   params: { amplitude: 100, duration: 1000, frequency: 1, axis: "x" },
      // },
      // {
      //   type: "action",
      //   name: "shake",
      //   params: { intensity: 10, duration: 1000, frequency: 10, axis: "both" },
      //   // entityId:"rock"
      // }
    ],
  },
};