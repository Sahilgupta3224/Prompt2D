import type { SceneDefinition } from "../types/Scene";

export const DEMO_SCENE_TESTER: SceneDefinition = {
  id: "tester",
  name: "Action Primitive Mastery Test",
  soundtrack: "dance",
  entities: [
    {
      id: "tester_hero",
      position: { x: 400, y: 500 },
      scale: 2,
      appearance: {
        body: "bodies/male",
        head: "heads/human/male",
        hair: "afro/adult",
        torso: "clothes/shirt/male",
        legs: "pants/male",
        feet: "feet/shoes/basic/male",
        gloves: "gloves/male",
        hat: "hat/holiday/christmas/male"
      }
    },
    {
      id: "knight_tester",
      position: { x: 200, y: 450 },
      scale: 2.5,
      appearance: {
        body: "bodies/male",
        head: "heads/human/male",
        torso: "armour/legion/male",
        legs: "cuffed/male",
        feet: "boots/rimmed/male",
        hat: "hat/helmet/greathelm/male",
        gloves: "gloves/male"
      }
    },
    {
      id: "rogue_tester",
      position: { x: 600, y: 450 },
      scale: 3,
      appearance: {
        body: "bodies/female",
        head: "heads/human/female",
        hair: "messy2/adult",
        torso: "clothes/vest/male",
        legs: "pant_thin/male",
        feet: "shoes/basic/female",
        facial: "patches/eyepatch/left/adult",
        hat: "hat/pirate/base/male"
      }
    },
    {
      id: "wizard_tester",
      position: { x: 800, y: 500 },
      scale: 3.5,
      appearance: {
        body: "bodies/male",
        head: "heads/human/male",
        hair: "long_loose/adult",
        torso: "clothes/longsleeve/longsleeve2_cardigan/male",
        legs: "pants/male",
        feet: "shoes/basic/male",
        hat: "hat/magic/celestial/adult"
      }
    },
    {
      id: "target_dummy",
      position: { x: 500, y: 600 },
      scale: 1.5,
      appearance: {
        body: "bodies/female",
        head: "heads/human/female",
        hair: "jewfro/adult",
        torso: "clothes/sleeveless/sleeveless1/female",
        legs: "pants/thin",
        feet: "feet/shoes/basic/female"
      }
    },
    {
      id: "healer_npc",
      position: { x: 300, y: 300 },
      scale: 3,
      appearance: {
        body: "bodies/female",
        head: "heads/human/female",
        hair: "bun/adult",
        torso: "clothes/longsleeve/longsleeve/female",
        legs: "pants/female",
        feet: "shoes/basic/female",
        hat: "hat/cloth/bandana/adult"
      }
    },
    {
      id: "test_prop",
      position: { x: 500, y: 300 },
      scale: 0.3,
      isObject: true,
      shape: "star",
      color: "#ffcc00ff"
    }
  ],
  background: "park",
  timeline: {
    type: "sequence",
    children: [
      // 1. Basic Movement & Orientation
      { type: "action", name: "speak", params: { text: "1. Basic Movement & Turning!", duration: 1500 }, entityId: "tester_hero" },
      { type: "action", name: "faceDirection", params: { direction: "RIGHT" }, entityId: "tester_hero" },
      { type: "action", name: "wait", params: { duration: 500 } },
      { type: "action", name: "move", params: { destination: { x: 400, y: 400 } }, entityId: "tester_hero" },
      { type: "action", name: "turnTowards", params: { targetId: "target_dummy" }, entityId: "tester_hero" },
      { type: "action", name: "wait", params: { duration: 500 } },
      
      // 2. Automated Pathing & AI Movement
      { type: "action", name: "speak", params: { text: "2. Wander, Patrol & Follow!", duration: 1500 }, entityId: "tester_hero" },
      { type: "action", name: "move", params: { destination: { x: 600, y: 450 } }, entityId: "rogue_tester" },
      {
        type: "parallel",
        children: [
          { type: "action", name: "wander", params: { area: { x: 300, y: 400, width: 200, height: 200 }, duration: 2000 }, entityId: "target_dummy" },
          { type: "action", name: "follow", params: { targetId: "tester_hero", duration: 2000 }, entityId: "rogue_tester" }
        ]
      },
      { type: "action", name: "wait", params: { duration: 500 } },

      // 3. Status Stances & Body Physics
      { type: "action", name: "speak", params: { text: "3. Body States: Sleep, Crouch, Spin!", duration: 1500 }, entityId: "tester_hero" },
      {
        type: "parallel",
        children: [
          { type: "action", name: "sleep", params: { duration: 2000 }, entityId: "target_dummy" },
          { type: "action", name: "crouch", params: { duration: 2000 }, entityId: "knight_tester" },
          { type: "action", name: "spin", params: { rotations: 3, duration: 1500 }, entityId: "tester_hero" },
        ]
      },
      { type: "action", name: "wait", params: { duration: 500 } },
      { type: "action", name: "crawl", params: { destination: { x: 350, y: 450 } }, entityId: "tester_hero" },
      { type: "action", name: "wait", params: { duration: 500 } },

      // 4. Force & Physics Math
      { type: "action", name: "speak", params: { text: "4. Physics & Jumps!", duration: 1500 }, entityId: "tester_hero" },
      { type: "action", name: "jump", params: { height: 60 }, entityId: "tester_hero" },
      { type: "action", name: "knockBack", params: { direction: { x: -1, y: 0 }, strength: 70, duration: 800 }, entityId: "tester_hero" },
      { type: "action", name: "wait", params: { duration: 500 } },

      // 5. Advanced Combat & Magic
      { type: "action", name: "speak", params: { text: "5. Combat, Heal, Flee!", duration: 1500 }, entityId: "tester_hero" },
      { type: "action", name: "attack", params: { targetId: "rogue_tester", weapon: "melee" }, entityId: "knight_tester" },
      { type: "action", name: "flee", params: { attackerId: "knight_tester", distance: 150, duration: 1500 }, entityId: "rogue_tester" },
      { type: "action", name: "wave", params: { duration: 1000 }, entityId: "wizard_tester" },
      { type: "action", name: "heal", params: { targetId: "rogue_tester", amount: 50 }, entityId: "healer_npc" },
      { type: "action", name: "wait", params: { duration: 500 } },

      // 6. Object Interaction
      { type: "action", name: "speak", params: { text: "6. Object Grab & Throw Test!", duration: 1500 }, entityId: "tester_hero" },
      { type: "action", name: "move", params: { destination: { x: 500, y: 350 } }, entityId: "tester_hero" },
      { type: "action", name: "grab", params: { objectId: "test_prop", attachmentPoint: "hand" }, entityId: "tester_hero" },
      { type: "action", name: "wait", params: { duration: 500 } },
      { type: "action", name: "throw", params: { objectId: "test_prop", target: { x: 700, y: 300 }, arcHeight: 100 }, entityId: "tester_hero" },
      { type: "action", name: "wait", params: { duration: 800 } },

      // 7. Advanced Group Composites & FX
      { type: "action", name: "speak", params: { text: "7. Visual FX & Dance Party!", duration: 1500 }, entityId: "tester_hero" },
      {
        type: "parallel",
        children: [
          { type: "action", name: "dance", params: { duration: 3000 }, entityId: "tester_hero" },
          { type: "action", name: "dance", params: { duration: 3000 }, entityId: "rogue_tester" },
          { type: "action", name: "oscillate", params: { amplitude: 20, amplitudeY: 20, frequency: 5, duration: 3000 }, entityId: "wizard_tester" },
          { type: "action", name: "shake", params: { intensity: 5, duration: 3000 }, entityId: "knight_tester" }
        ]
      },
      
      // 8. Lifecycle (Despawn)
      { type: "action", name: "speak", params: { text: "8. Filtering & Despawning!", duration: 1500 }, entityId: "tester_hero" },
      { type: "action", name: "rotate", params: { angle: 360, duration: 1500 }, entityId: "target_dummy" },
      { type: "action", name: "fade", params: { targetAlpha: 0.0, duration: 1000 }, entityId: "target_dummy" },
      { type: "action", name: "despawn", params: {}, entityId: "target_dummy" },

      // Ending
      { type: "action", name: "speak", params: { text: "All Systems Go! Fully Tested!", duration: 2500 }, entityId: "tester_hero" },
      {
         type: "parallel",
         children: [
           { type: "action", name: "emote", params: { emote: "happy", duration: 2000 }, entityId: "tester_hero" },
           { type: "action", name: "emote", params: { emote: "happy", duration: 2000 }, entityId: "knight_tester" },
           { type: "action", name: "emote", params: { emote: "happy", duration: 2000 }, entityId: "wizard_tester" },
           { type: "action", name: "emote", params: { emote: "happy", duration: 2000 }, entityId: "rogue_tester" }
         ]
      }
    ]
  }
};
