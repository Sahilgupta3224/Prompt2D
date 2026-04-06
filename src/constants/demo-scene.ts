// we can use wait action before every action to have clear animation

import type { SceneDefinition } from "../types/Scene";
import { DEFAULT_X_POS, DEFAULT_Y_POS } from "./game-world";
import { HERO_ATTACHMENTS } from "../config/hero-attachments";

export const DEMO_SCENE: SceneDefinition = 
// {
//   id: "demo",
//   name: "Demo Scene",
//   soundtrack: "battle",
//   entities: [
//     {
//       id: "hero1",
//       position: { x: DEFAULT_X_POS+500, y: DEFAULT_Y_POS },
//       scale: 2,
//       attachments: HERO_ATTACHMENTS,
//       appearance: {
//         hair: "afro/adult",
//         body: "bodies/male",
//         facial: "glasses/sunglasses/adult",
//         head: "heads/human/male",
//         torso: "clothes/longsleeve/longsleeve2_cardigan/male",
//         legs: "cuffed/male",
//         feet: "feet/shoes/basic/male",
//         gloves: "gloves/male",
//       }
//     },
//     {
//       id: "hero2",
//       position: { x: DEFAULT_X_POS, y: DEFAULT_Y_POS },
//       scale: 2,
//       attachments: HERO_ATTACHMENTS,
//       appearance: {
//         hair: "afro/adult",
//         body: "bodies/male",
//         facial: "glasses/sunglasses/adult",
//         head: "heads/human/male",
//         torso: "clothes/longsleeve/longsleeve2_cardigan/male",
//         legs: "cuffed/male",
//         feet: "feet/shoes/basic/male",
//         gloves: "gloves/male",
//       }
//     },
//     {
//       id: "rock",
//       position: { x: 500, y: 100 },
//       scale: 0.2,
//       isObject: true,
//       shape: "circle",
//       color: "#070707ff"
//     },
//   ],
//   background: "park",
//   timeline: {
//     type: "sequence",
//     children: [
//       {
//         type: "action",
//         name: "wait",
//         params: { duration: 5000 },
//       },
//       {
//         type: "action",
//         name: "jump",
//         params: { height: 100, duration: 1000 },
//       },
//       {
//         type: "action",
//         name: "flee",
//         params: {target:"hero2"},
//         entityId: "hero1"
//       },
//       // {
//       //   type: "action",
//       //   name: "applyForce",
//       //   params: { mode:"pull"},
//       // },
//       // {
//       //   type: "action",
//       //   name: "knockBack",
//       //   params: { direction: { x: 1, y: 1 }, strength: 100, duration: 1000, friction: 0.85 },
//       //   entityId: "hero1"
//       // },
//       // {
//       //   type: "action",
//       //   name: "throw",
//       //   params: { objectId: "rock", target: { x: 500, y: 300 }, arcHeight: 50 },
//       // },
//       // {
//       //   type: "action",
//       //   name: "grab",
//       //   params: { objectId: "rock", attachmentPoint: "hand" },
//       // },

//       // {
//       //   type: "action",
//       //   name: "give",
//       //   params: { objectId: "rock", targetId: "hero2", reachDistance: 100, moveSpeed: 1 },
//       //   entityId: "hero1"
//       // },
//       // {
//       //   type: "action",
//       //   name: "despawn",
//       //   params: { entityId: "hero1" },
//       // },

//       // {
//       //   type: "action",
//       //   name:"crawl",
//       //   params:{destination: { x: 100, y: 100 } },
//       //   entityId: "hero1"
//       // },
//       // {
//       //   type: "action",
//       //   name:"give",
//       //   params:{objectId: "rock", targetId:"hero2"},
//       //   entityId: "hero1"
//       // },
//       // {
//       //   type: "action",
//       //   name: "move",
//       //   params: { destination: { x: 450, y: 450 } },
//       //   entityId: "hero1"
//       // },
//       // {
//       //   type: "action",
//       //   name: "move",
//       //   params: { destination: { x: 300, y: 200 } },
//       //   entityId: "hero2"
//       // },
//       // {
//       //   type: "action",
//       //   name: "fade",
//       //   params: { targetAlpha: 0.5 },
//       //   // entityId: "hero2"
//       // },
//       {
//         type: "action",
//         name: "speak",
//         params: { text: "HIIIIIIIIIIIIIIIII   !!", duration: 2000 },
//         entityId: "hero2"
//       },
//       // {
//       //   type: "action",
//       //   name: "wait",
//       //   params: { duration: 500 },
//       // },
//       {
//         type: "action",
//         name: "emote",
//         params: { emote: "happy", duration: 1000 },
//         entityId: "hero2"
//       },
//       // {
//       //   type: "action",
//       //   name: "applyForce",
//       //   params: { mode: "push", force: { x: 1, y: 0 }, duration: 5000 },
//       //   entityId: "hero2"
//       // },

//       // {
//       //   type: "action",
//       //   name: "knockBack",
//       //   params: { direction: { x: 1, y: 1 }, strength: 100, duration: 1000, friction: 0.85 },
//       //   entityId: "hero1"
//       // },
//       // {
//       //   type: "action",
//       //   name: "grab",
//       //   params: { objectId: "rock", attachmentPoint: "hand" },
//       // },
//       // {
//       //   type: "action",
//       //   name: "move",
//       //   params: { destination: { x: 600, y: 300 } },
//       // },
//       // {
//       //   type: "action",
//       //   name: "shake",
//       //   params: { intensity: 10, duration: 1000, frequency: 10, axis: "both", decay: true },
//       //   // entityId:"rock"
//       // },
//       {
//         type: "action",
//         name: "sitOn",
//         params: {seat:{x:300, y:300}},
//         entityId: "hero2"
//       },
//       {
//         type: "action",
//         name: "wave",
//         params: { targetId: "hero2"},
//       },
//       {
//         type: "action",
//         name: "wander",
//         params: { destination:{x:700,y:500}},
//       },
//       {
//         type: "action",
//         name: "attack",
//         params: { targetId: "hero2", weapon: "melee" },
//       },
//       {
//         type:"action",
//         name:"heal",
//         params:{targetId: "hero2"}
//       },
//       // {
//       //   type: "action",
//       //   name: "jump",
//       //   params: { height: 50 },
//       // },
//       {
//         type: "action",
//         name: "wait",
//         params: { duration: 500 },
//       },
//       {
//         type: "action",
//         name: "throw",
//         params: { objectId: "rock", target: { x: 500, y: 300 }, arcHeight: 50 },
//       },
//       // // {
//       // //   type: "action",
//       // //   name: "Fade",
//       // //   params: {targetAlpha:0 },
//       // // },
//       // {
//       //   type: "action",
//       //   name: "rotate",
//       //   params: { angle: 360, duration: 1000, speed: 1 },
//       // },
//       // {
//       //   type: "action",
//       //   name: "oscillate",
//       //   params: { amplitude: 100, amplitudeY: 100, duration: 1000, frequency: 1, axis: "both" },
//       // }
//     ],
//   },
// };

{
  "id": "potion_toss",
  "name": "Throwing Potion",
  "background": "park",
  "entities": [
    {
      "id": "wizard1",
      "position": { "x": 300, "y": 450 },
      "scale": 2.0,
      "attachments": HERO_ATTACHMENTS,
      "appearance": { "body": "bodies/male", "head": "heads/human/male", "torso": "clothes/longsleeve/longsleeve2_cardigan/male", "legs": "pants/male", gloves: "gloves/male" }
    },
    {
      "id": "friend1",
      "position": { "x": 900, "y": 450 },
      "scale": 2.0,
      "attachments": HERO_ATTACHMENTS,
      "appearance": { "body": "bodies/female", "head": "heads/human/female", "torso": "clothes/longsleeve/longsleeve2_cardigan/female", "legs": "pants/thin", gloves: "gloves/female" }
    },
    {
      "id": "potion",
      "position": { "x": 400, "y": 480 },
      "scale": 0.2,
      "isObject": true,
      "shape": "capsule",
      "color": "#ff1155ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      { "type": "action", "name": "move", "entityId": "wizard1", "params": { "destination": { "x": 380, "y": 480 } } },
      { "type": "action", "name": "grab", "entityId": "wizard1", "params": { "objectId": "potion", "attachmentPoint": "hand" } },
      { "type": "action", "name": "wait", "params": { "duration": 2000 } },
      { "type": "action", "name": "turnTowards", "entityId": "wizard1", "params": { "targetId": "friend1" } },
      { "type": "action", "name": "throw", "entityId": "wizard1", "params": { "objectId": "potion", "target": { "x": 850, "y": 450 }, "arcHeight": 80 } },
      { "type": "action", "name": "grab", "entityId": "friend1", "params": { "objectId": "potion", "attachmentPoint": "hand" } },
      { "type": "action", "name": "wait", "params": { "duration": 2000 } },
      {
        "type": "parallel",
        "children": [
          { "type": "action", "name": "speak", "entityId": "friend1", "params": { "text": "Got it, thanks!", "duration": 2000 } },
          { "type": "action", "name": "wave", "entityId": "friend1", "params": { "targetId": "wizard1", "waves": 2 } }
        ]
      }
    ]
  }
}