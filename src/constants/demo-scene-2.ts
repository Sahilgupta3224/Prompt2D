// Demo Scene 2 — comprehensive engine test
// Tests: move, movePath, patrol, flee, follow, wander, crawl, crouch,
//        jump, applyForce (push), knockBack, attack, heal, wave,
//        grab, throw, give, speak, emote, dance, sleep, spin,
//        fade, rotate, oscillate, shake, spawn, despawn,
//        faceDirection, turnTo, wait, setState, any
//        + parallel & sequence timeline nodes

import type { SceneDefinition } from "../types/Scene";
import { HERO_ATTACHMENTS } from "../config/hero-attachments";

export const DEMO_SCENE_2: SceneDefinition = {
    id: "demo2",
    name: "Engine Stress Test",
    background: "park",
    entities: [
        {
            id: "knight",
            position: { x: 200, y: 400 },
            scale: 2,
            attachments: HERO_ATTACHMENTS,
        },
        {
            id: "mage",
            position: { x: 600, y: 400 },
            scale: 2,
            attachments: HERO_ATTACHMENTS,
        },
        {
            id: "guard",
            position: { x: 1000, y: 400 },
            scale: 2,
            attachments: HERO_ATTACHMENTS,
        },
        {
            id: "rock",
            position: { x: 400, y: 300 },
            scale: 0.4,
            isObject: true,
            shape: "circle",
            color: "#555555ff",
        },
        {
            id: "potion",
            position: { x: 800, y: 350 },
            scale: 0.3,
            isObject: true,
            shape: "capsule",
            color: "#ff3366ff",
        },
        {
            id: "gem",
            position: { x: 150, y: 300 },
            scale: 0.3,
            isObject: true,
            shape: "diamond",
            color: "#33ccffff",
        },
    ],
    timeline: {
        type: "sequence",
        children: [

            // ═══════════════════════════════════════════
            // ACT 1: Movement tests
            // ═══════════════════════════════════════════

            // Guard patrols while knight and mage greet each other
            {
                type: "parallel",
                children: [
                    // Guard patrols back and forth
                    {
                        type: "action",
                        name: "patrol",
                        params: {
                            pointA: { x: 900, y: 400 },
                            pointB: { x: 1100, y: 400 },
                            laps: 2,
                            pauseAtEnds: 400,
                        },
                        entityId: "guard",
                    },
                    // Knight waves at mage
                    {
                        type: "sequence",
                        children: [
                            {
                                type: "action",
                                name: "wave",
                                params: { targetId: "mage", waves: 3 },
                                entityId: "knight",
                            },
                            { type: "action", name: "wait", params: { duration: 300 } },
                            {
                                type: "action",
                                name: "speak",
                                params: { text: "Hello friend!", duration: 1500 },
                                entityId: "knight",
                            },
                        ],
                    },
                    // Mage waves back
                    {
                        type: "sequence",
                        children: [
                            { type: "action", name: "wait", params: { duration: 500 } },
                            {
                                type: "action",
                                name: "wave",
                                params: { targetId: "knight", waves: 2 },
                                entityId: "mage",
                            },
                            {
                                type: "action",
                                name: "emote",
                                params: { emote: "happy", duration: 1000 },
                                entityId: "mage",
                            },
                        ],
                    },
                ],
            },

            { type: "action", name: "wait", params: { duration: 500 } },

            // Knight walks toward the rock
            {
                type: "action",
                name: "move",
                params: { destination: { x: 380, y: 350 } },
                entityId: "knight",
            },

            // ═══════════════════════════════════════════
            // ACT 2: Object interaction tests
            // ═══════════════════════════════════════════

            // Knight grabs the rock
            {
                type: "action",
                name: "grab",
                params: { objectId: "rock", attachmentPoint: "hand" },
                entityId: "knight",
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // Knight throws rock toward guard
            {
                type: "action",
                name: "throw",
                params: { objectId: "rock", target: { x: 1000, y: 400 }, arcHeight: 60 },
                entityId: "knight",
            },

            { type: "action", name: "wait", params: { duration: 200 } },

            // Guard gets hit — knockback + emote
            {
                type: "parallel",
                children: [
                    {
                        type: "action",
                        name: "knockBack",
                        params: { direction: { x: 1, y: 0 }, strength: 80, duration: 400, friction: 0.8 },
                        entityId: "guard",
                    },
                    {
                        type: "action",
                        name: "emote",
                        params: { emote: "angry", duration: 1200 },
                        entityId: "guard",
                    },
                    {
                        type: "action",
                        name: "speak",
                        params: { text: "Ouch!", duration: 1000 },
                        entityId: "guard",
                    },
                ],
            },

            { type: "action", name: "wait", params: { duration: 400 } },

            // ═══════════════════════════════════════════
            // ACT 3: Combat tests
            // ═══════════════════════════════════════════

            // Guard retaliates — attacks knight
            {
                type: "action",
                name: "attack",
                params: { targetId: "knight", weapon: "melee" },
                entityId: "guard",
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // Knight flees from guard
            {
                type: "action",
                name: "flee",
                params: { targetId: "guard", speed: 1.5, duration: 2000 },
                entityId: "knight",
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // ═══════════════════════════════════════════
            // ACT 4: Magic & healing tests
            // ═══════════════════════════════════════════

            // Mage heals the wounded knight
            {
                type: "action",
                name: "heal",
                params: { targetId: "knight", amount: 50, duration: 1500 },
                entityId: "mage",
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // Knight thanks the mage
            {
                type: "parallel",
                children: [
                    {
                        type: "action",
                        name: "speak",
                        params: { text: "Thanks, I feel better!", duration: 1500 },
                        entityId: "knight",
                    },
                    {
                        type: "action",
                        name: "emote",
                        params: { emote: "love", duration: 1200 },
                        entityId: "knight",
                    },
                ],
            },

            { type: "action", name: "wait", params: { duration: 500 } },

            // ═══════════════════════════════════════════
            // ACT 5: Physics & effects tests
            // ═══════════════════════════════════════════

            // Knight jumps
            {
                type: "action",
                name: "jump",
                params: { height: 60, distance: 80, duration: 600 },
                entityId: "knight",
            },

            // Guard does push mode (applyForce)
            {
                type: "action",
                name: "applyForce",
                params: { force: { x: 1, y: 0 }, mode: "push", duration: 1500 },
                entityId: "guard",
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // Mage spins and fades (effect test)
            {
                type: "parallel",
                children: [
                    {
                        type: "action",
                        name: "spin",
                        params: { duration: 1500, speed: 2 },
                        entityId: "mage",
                    },
                    {
                        type: "action",
                        name: "fade",
                        params: { targetAlpha: 0.3, duration: 1500 },
                        entityId: "mage",
                    },
                ],
            },

            // Mage fades back in
            {
                type: "action",
                name: "fade",
                params: { targetAlpha: 1, duration: 800 },
                entityId: "mage",
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // Shake the gem (oscillate + shake test)
            {
                type: "parallel",
                children: [
                    {
                        type: "action",
                        name: "shake",
                        params: { intensity: 8, duration: 1000, frequency: 10, decay: true },
                        entityId: "gem",
                    },
                    {
                        type: "action",
                        name: "oscillate",
                        params: { amplitude: 15, duration: 1000, frequency: 3, axis: "y" },
                        entityId: "potion",
                    },
                ],
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // ═══════════════════════════════════════════
            // ACT 6: Posture & stealth tests
            // ═══════════════════════════════════════════

            // Knight crouches, then crawls
            {
                type: "action",
                name: "crouch",
                params: { duration: 1000 },
                entityId: "knight",
            },
            {
                type: "action",
                name: "crawl",
                params: { destination: { x: 500, y: 450 }, duration: 2000 },
                entityId: "knight",
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // ═══════════════════════════════════════════
            // ACT 7: Mage picks up potion and gives to knight
            // ═══════════════════════════════════════════

            {
                type: "action",
                name: "move",
                params: { destination: { x: 780, y: 370 } },
                entityId: "mage",
            },
            {
                type: "action",
                name: "grab",
                params: { objectId: "potion", attachmentPoint: "hand" },
                entityId: "mage",
            },
            {
                type: "action",
                name: "give",
                params: { objectId: "potion", targetId: "knight" },
                entityId: "mage",
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // Knight throws the potion away
            {
                type: "action",
                name: "throw",
                params: { objectId: "potion", target: { x: 1200, y: 200 }, arcHeight: 80 },
                entityId: "knight",
            },

            { type: "action", name: "wait", params: { duration: 400 } },

            // ═══════════════════════════════════════════
            // ACT 8: Dance, sleep, spawn/despawn
            // ═══════════════════════════════════════════

            // Guard dances victoriously
            {
                type: "parallel",
                children: [
                    {
                        type: "action",
                        name: "dance",
                        params: { duration: 3000, style: "spin" },
                        entityId: "guard",
                    },
                    {
                        type: "action",
                        name: "emote",
                        params: { emote: "star", duration: 2000 },
                        entityId: "guard",
                    },
                ],
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // Mage goes to sleep
            {
                type: "action",
                name: "sleep",
                params: { duration: 2000 },
                entityId: "mage",
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // Spawn a new star object
            {
                type: "action",
                name: "spawn",
                params: {
                    entityId: "star_obj",
                    position: { x: 700, y: 250 },
                    scale: 0.4,
                    isObject: true,
                    shape: "star",
                    color: "#ffcc00ff",
                },
            },

            { type: "action", name: "wait", params: { duration: 800 } },

            // Rotate the star
            {
                type: "action",
                name: "rotate",
                params: { angle: 720, duration: 1500 },
                entityId: "star_obj",
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // Despawn the star
            {
                type: "action",
                name: "despawn",
                params: { entityId: "star_obj" },
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // ═══════════════════════════════════════════
            // ACT 9: Wander + follow + faceDirection
            // ═══════════════════════════════════════════

            {
                type: "parallel",
                children: [
                    // Knight wanders randomly
                    {
                        type: "action",
                        name: "wander",
                        params: { destination: { x: 350, y: 350 }, duration: 2000 },
                        entityId: "knight",
                    },
                    // Guard follows the knight
                    {
                        type: "action",
                        name: "follow",
                        params: { targetId: "knight", duration: 2000, distance: 60 },
                        entityId: "guard",
                    },
                ],
            },

            { type: "action", name: "wait", params: { duration: 300 } },

            // Everyone faces down (curtain call)
            {
                type: "parallel",
                children: [
                    {
                        type: "action",
                        name: "faceDirection",
                        params: { direction: "DOWN" },
                        entityId: "knight",
                    },
                    {
                        type: "action",
                        name: "faceDirection",
                        params: { direction: "DOWN" },
                        entityId: "mage",
                    },
                    {
                        type: "action",
                        name: "faceDirection",
                        params: { direction: "DOWN" },
                        entityId: "guard",
                    },
                ],
            },

            { type: "action", name: "wait", params: { duration: 500 } },

            // Final bow — all speak
            {
                type: "parallel",
                children: [
                    {
                        type: "action",
                        name: "speak",
                        params: { text: "Demo complete!", duration: 2000 },
                        entityId: "knight",
                    },
                    {
                        type: "action",
                        name: "emote",
                        params: { emote: "star", duration: 2000 },
                        entityId: "mage",
                    },
                    {
                        type: "action",
                        name: "wave",
                        params: { direction: "DOWN", waves: 4 },
                        entityId: "guard",
                    },
                ],
            },
        ],
    },
};
