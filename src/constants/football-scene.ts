import type { SceneDefinition } from "../types/Scene";
import { HERO_ATTACHMENTS } from "../config/hero-attachments";

export const FOOTBALL_SCENE: SceneDefinition = {
  id: "football",
  name: "Boy Playing Football",
  entities: [
    {
      id: "boy",
      position: { x: 200, y: 350 },
      scale: 2,
      attachments: HERO_ATTACHMENTS,
    },

    {
      id: "football",
      position: { x: 200, y: 380 },
      scale: 0.5,
      isObject: true,
      shape: "circle",
      color: "#ffffff",
    },

    {
      id: "goalpost",
      position: { x: 750, y: 320 },
      scale: 1,
      isObject: true,
      shape: "rectangle",
      color: "#dddddd",
    },
  ],
  background: "park",
  timeline: {
    type: "sequence",

    children: [
      {
        type: "action",
        name: "move",
        entityId: "boy",
        params: {
          destination: { x: 380, y: 350 },
        },
      },
      {
        type: "action",
        name: "grab",
        entityId: "boy",
        params: {
          objectId: "football",
          attachmentPoint: "foot",
        },
      },
      {
        type: "action",
        name: "move",
        entityId: "boy",
        params: {
          destination: { x: 600, y: 350 },
        },
      },
      {
        type: "action",
        name: "wait",
        params: { duration: 600 },
      },

      
      {
        type: "action",
        name: "throw",
        entityId: "boy",
        params: {
          objectId: "football",
          target: { x: 750, y: 330 },
          arcHeight: 80,
        },
      },
      {
        type: "action",
        name: "emote",
        entityId: "boy",
        params: {
          emote: "happy",
          duration: 1500,
        },
      },
      {
        type: "action",
        name: "oscillate",
        entityId: "boy",
        params: {
          amplitude: 30,
          duration: 1200,
          frequency: 3,
          axis: "y",
        },
      },
      {
        type:"action",
        name:"crawl",
        entityId:"boy",
        params:{
          destination: { x: 450, y: 350 },
          duration: 2000
         }
      },
      {
        type:"action",
        name:"sleep",
        entityId:"boy",
        params:{
            duration:5000,
        }
      }
    ],
  },
};