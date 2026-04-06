# Comprehensive Scene Examples (1-100)

When generating scenes, structure the JSON as shown in the examples. Note the usage of `parallel` nodes for simultaneous visual actions and `sequence` nodes for chronological flow. Also observe how `wait` is used as a buffer.

## Reminders
- Never use non-physical verbs like `inspect` or `think`.
- To pick up an object, you MUST use `grab` and target a valid `isObject: true` ID.
- To throw an object, it MUST currently be held by the `entityId` firing the `throw` action.
- Add small `wait` steps between movement paths and other physical actions.


## Example 1: A knight walks over and picks up a apple.
```json
{
  "id": "scene_1",
  "background": "forest",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 302,
        "y": 414
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2/female",
        "legs": "cuffed/thin"
      }
    },
    {
      "id": "apple1",
      "position": {
        "x": 525,
        "y": 422
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "square",
      "color": "#e9c46aff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "move",
        "entityId": "knight1",
        "params": {
          "destination": {
            "x": 505,
            "y": 422
          }
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "knight1",
        "params": {
          "objectId": "apple1",
          "attachmentPoint": "hand"
        }
      }
    ]
  }
}
```

## Example 2: A hero throws a coin at a knight.
```json
{
  "id": "scene_2",
  "background": "park",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 277,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/skeleton",
        "torso": "clothes/shortsleeve/tshirt_buttoned/female",
        "legs": "shorts/short_shorts/thin",
        "hair": "shorthawk/adult",
        "facial": "glasses/shades/adult",
        "weapon": "magic/wand/female"
      }
    },
    {
      "id": "knight1",
      "position": {
        "x": 759,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2_vneck/female"
      }
    },
    {
      "id": "coin1",
      "position": {
        "x": 306,
        "y": 450
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "star",
      "color": "#4ecdc4ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "hero1",
        "params": {
          "objectId": "coin1"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "hero1",
        "params": {
          "targetId": "knight1"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "hero1",
        "params": {
          "objectId": "coin1",
          "target": {
            "x": 860,
            "y": 400
          },
          "arcHeight": 58
        }
      },
      {
        "type": "action",
        "name": "knockBack",
        "entityId": "knight1",
        "params": {
          "direction": {
            "x": 1,
            "y": 0
          },
          "strength": 73
        }
      }
    ]
  }
}
```

## Example 3: guard and rogue have a friendly conversation.
```json
{
  "id": "scene_3",
  "background": "city",
  "entities": [
    {
      "id": "guard1",
      "position": {
        "x": 400,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "armour/legion/male",
        "legs": "leggings/male",
        "hair": "flat_top_fade/adult",
        "beards": "beard"
      }
    },
    {
      "id": "rogue1",
      "position": {
        "x": 620,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/sleeveless/sleeveless1/female",
        "legs": "shorts/shorts/thin",
        "hair": "plain/adult",
        "feet": "shoes/revised/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "guard1",
        "params": {
          "targetId": "rogue1"
        }
      },
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "rogue1",
        "params": {
          "targetId": "guard1"
        }
      },
      {
        "type": "action",
        "name": "wave",
        "entityId": "guard1",
        "params": {
          "targetId": "rogue1",
          "waves": 2
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "rogue1",
        "params": {
          "text": "Watch your back.",
          "duration": 2000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "speak",
            "entityId": "guard1",
            "params": {
              "text": "Thanks for the warning.",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "guard1",
            "params": {
              "emote": "laugh",
              "duration": 2000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 4: An attack happens: king strikes rogue, who flees.
```json
{
  "id": "scene_4",
  "soundtrack": "battle",
  "background": "mountain",
  "entities": [
    {
      "id": "king1",
      "position": {
        "x": 400,
        "y": 380
      },
      "scale": 2.5,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/child",
        "torso": "aprons/suspenders/female",
        "legs": "formal_striped/thin",
        "feet": "boots/basic/thin",
        "arms": "gloves/female"
      }
    },
    {
      "id": "rogue1",
      "position": {
        "x": 620,
        "y": 410
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2/male",
        "legs": "leggings/male",
        "hair": "afro/adult",
        "feet": "sandals/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "move",
        "entityId": "king1",
        "params": {
          "destination": {
            "x": 560,
            "y": 400
          }
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "king1",
        "params": {
          "targetId": "rogue1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "rogue1",
            "params": {
              "direction": {
                "x": 1,
                "y": 0
              },
              "strength": 100
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "rogue1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "rogue1",
        "params": {
          "targetId": "king1",
          "duration": 2000,
          "speed": 1.5
        }
      }
    ]
  }
}
```

## Example 5: cleric casts a healing spell on the injured rogue.
```json
{
  "id": "scene_5",
  "soundtrack": "mystical",
  "background": "desert",
  "entities": [
    {
      "id": "cleric1",
      "position": {
        "x": 300,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "formal_striped/thin",
        "feet": "sandals/thin"
      }
    },
    {
      "id": "rogue1",
      "position": {
        "x": 520,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve_polo/female",
        "hair": "mop/adult"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "heal",
        "entityId": "cleric1",
        "params": {
          "targetId": "rogue1",
          "amount": 48,
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "rogue1",
            "params": {
              "emote": "love",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "oscillate",
            "entityId": "rogue1",
            "params": {
              "amplitude": 5,
              "frequency": 10,
              "duration": 1000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 6: A rogue crawls to a location and falls asleep.
```json
{
  "id": "scene_6",
  "soundtrack": "calm",
  "background": "beach",
  "entities": [
    {
      "id": "rogue1",
      "position": {
        "x": 200,
        "y": 300
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2_polo/female",
        "legs": "formal_striped/thin",
        "feet": "slippers/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "crouch",
        "entityId": "rogue1",
        "params": {
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "crawl",
        "entityId": "rogue1",
        "params": {
          "destination": {
            "x": 493,
            "y": 418
          }
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "sleep",
        "entityId": "rogue1",
        "params": {
          "duration": 5000
        }
      }
    ]
  }
}
```

## Example 7: peasant patrols an area with physics active.
```json
{
  "id": "scene_7",
  "background": "forest",
  "entities": [
    {
      "id": "peasant1",
      "position": {
        "x": 400,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/wolf/female",
        "torso": "clothes/sleeveless/sleeveless1/female",
        "legs": "pantaloons/thin",
        "hair": "balding/adult",
        "feet": "boots/fold/thin",
        "weapon": "magic/wand/female",
        "neck": "tie/necktie/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "jump",
        "entityId": "peasant1",
        "params": {
          "height": 92,
          "distance": 48
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "patrol",
        "entityId": "peasant1",
        "params": {
          "pointA": {
            "x": 400,
            "y": 450
          },
          "pointB": {
            "x": 768,
            "y": 450
          },
          "laps": 2,
          "pauseAtEnds": 500
        }
      }
    ]
  }
}
```

## Example 8: A skull spawns, rotates, and fades away.
```json
{
  "id": "scene_8",
  "background": "park",
  "entities": [],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "spawn",
        "params": {
          "entityId": "magic_obj",
          "x": 544,
          "y": 301,
          "scale": 0.5,
          "isObject": true,
          "shape": "star",
          "color": "#fd79a8ff"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "rotate",
            "entityId": "magic_obj",
            "params": {
              "angle": 451,
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "oscillate",
            "entityId": "magic_obj",
            "params": {
              "amplitude": 20,
              "duration": 2000
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "fade",
        "entityId": "magic_obj",
        "params": {
          "targetAlpha": 0,
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "despawn",
        "params": {
          "entityId": "magic_obj"
        }
      }
    ]
  }
}
```

## Example 9: king gives a potion to rogue.
```json
{
  "id": "scene_9",
  "background": "desert",
  "entities": [
    {
      "id": "king1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/lizard/male",
        "torso": "clothes/longsleeve/longsleeve2_cardigan/male",
        "legs": "hose/male",
        "hair": "curly_short/adult",
        "feet": "sandals/male"
      }
    },
    {
      "id": "rogue1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "formal_striped/thin",
        "feet": "boots/fold/thin"
      }
    },
    {
      "id": "potion1",
      "position": {
        "x": 280,
        "y": 470
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "capsule",
      "color": "#264653ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "king1",
        "params": {
          "objectId": "potion1"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "give",
        "entityId": "king1",
        "params": {
          "objectId": "potion1",
          "targetId": "rogue1",
          "reachDistance": 80
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "dance",
        "entityId": "rogue1",
        "params": {
          "duration": 2000
        }
      }
    ]
  }
}
```

## Example 10: mage wanders randomly and then speaks.
```json
{
  "id": "scene_10",
  "background": "beach",
  "entities": [
    {
      "id": "mage1",
      "position": {
        "x": 733,
        "y": 397
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "aprons/overalls/female",
        "legs": "pantaloons/thin",
        "feet": "slippers/thin",
        "arms": "gloves/female"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "wander",
        "entityId": "mage1",
        "params": {
          "area": {
            "x": 400,
            "y": 200,
            "width": 400,
            "height": 400
          },
          "duration": 3000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "faceDirection",
        "entityId": "mage1",
        "params": {
          "direction": "LEFT"
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "mage1",
        "params": {
          "text": "This place is strange.",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 11: guard chases thief across the area.
```json
{
  "id": "scene_11",
  "soundtrack": "battle",
  "background": "beach",
  "entities": [
    {
      "id": "guard1",
      "position": {
        "x": 200,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2/female",
        "legs": "leggings2/thin",
        "hair": "dreadlocks_short/adult",
        "weapon": "magic/wand/female"
      }
    },
    {
      "id": "thief1",
      "position": {
        "x": 500,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve/female",
        "legs": "leggings2/thin",
        "hair": "shorthawk/adult",
        "feet": "boots/fold/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "guard1",
        "params": {
          "text": "Stop right there!",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "follow",
        "entityId": "guard1",
        "params": {
          "targetId": "thief1",
          "duration": 2000,
          "speed": 1.8
        }
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "thief1",
        "params": {
          "targetId": "guard1",
          "duration": 2500,
          "speed": 2
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "guard1",
        "params": {
          "emote": "angry",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 12: warrior and troll engage in a dramatic duel.
```json
{
  "id": "scene_12",
  "soundtrack": "battle",
  "background": "desert",
  "entities": [
    {
      "id": "warrior1",
      "position": {
        "x": 300,
        "y": 400
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve_cardigan/female",
        "legs": "pants2/thin",
        "feet": "shoes/basic/thin"
      }
    },
    {
      "id": "troll1",
      "position": {
        "x": 700,
        "y": 400
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/goblin/adult",
        "torso": "clothes/longsleeve/longsleeve2_vneck/female",
        "legs": "shorts/shorts/thin",
        "hair": "loose/adult",
        "feet": "shoes/revised/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "warrior1",
            "params": {
              "destination": {
                "x": 480,
                "y": 400
              }
            }
          },
          {
            "type": "action",
            "name": "move",
            "entityId": "troll1",
            "params": {
              "destination": {
                "x": 550,
                "y": 400
              }
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "warrior1",
        "params": {
          "targetId": "troll1",
          "weapon": "punch"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "troll1",
        "params": {
          "targetId": "warrior1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "warrior1",
            "params": {
              "direction": {
                "x": -1,
                "y": 0
              },
              "strength": 60
            }
          },
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "troll1",
            "params": {
              "direction": {
                "x": 1,
                "y": 0
              },
              "strength": 60
            }
          }
        ]
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "warrior1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "troll1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          }
        ]
      }
    ]
  }
}
```

## Example 13: friend, rogue, and guard have a dance party.
```json
{
  "id": "scene_13",
  "soundtrack": "dance",
  "background": "park",
  "entities": [
    {
      "id": "friend1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt/female",
        "hair": "twists_fade/adult",
        "feet": "boots/rimmed/thin",
        "arms": "gloves/female"
      }
    },
    {
      "id": "rogue1",
      "position": {
        "x": 500,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/wolf/female",
        "torso": "clothes/longsleeve/longsleeve2_vneck/male",
        "legs": "pants2/male",
        "hair": "longhawk/adult",
        "hat": "magic/celestial/adult",
        "facial": "monocle/left/adult",
        "beards": "mustache",
        "arms": "gloves/male"
      }
    },
    {
      "id": "guard1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/female",
        "torso": "clothes/shortsleeve/shortsleeve_polo/female",
        "legs": "fur/thin",
        "hair": "half_up/adult"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "speak",
            "entityId": "friend1",
            "params": {
              "text": "Let's dance!",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "rogue1",
            "params": {
              "emote": "love",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "dance",
            "entityId": "friend1",
            "params": {
              "duration": 3000
            }
          },
          {
            "type": "action",
            "name": "dance",
            "entityId": "rogue1",
            "params": {
              "duration": 3000
            }
          },
          {
            "type": "action",
            "name": "dance",
            "entityId": "guard1",
            "params": {
              "duration": 3000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 14: rogue sneaks up and steals a gem from peasant.
```json
{
  "id": "scene_14",
  "background": "park",
  "entities": [
    {
      "id": "rogue1",
      "position": {
        "x": 800,
        "y": 430
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt/male",
        "legs": "shorts/short_shorts/male",
        "hair": "jewfro/adult",
        "feet": "slippers/male",
        "facial": "glasses/secretary/adult",
        "neck": "tie/bowtie/adult"
      }
    },
    {
      "id": "peasant1",
      "position": {
        "x": 400,
        "y": 430
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve/male",
        "legs": "cuffed/male",
        "feet": "shoes/revised/male"
      }
    },
    {
      "id": "gem1",
      "position": {
        "x": 380,
        "y": 450
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "star",
      "color": "#f4a261ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "crouch",
        "entityId": "rogue1",
        "params": {
          "duration": 800
        }
      },
      {
        "type": "action",
        "name": "crawl",
        "entityId": "rogue1",
        "params": {
          "destination": {
            "x": 420,
            "y": 430
          }
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "rogue1",
        "params": {
          "objectId": "gem1",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "rogue1",
        "params": {
          "targetId": "peasant1",
          "duration": 2000,
          "speed": 2
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "peasant1",
        "params": {
          "emote": "surprise",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 15: A solemn scene: friends mourn a fallen warrior.
```json
{
  "id": "scene_15",
  "soundtrack": "calm",
  "background": "mountain",
  "entities": [
    {
      "id": "friend1",
      "position": {
        "x": 350,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2_vneck/male",
        "legs": "pants/male",
        "feet": "boots/basic/male"
      }
    },
    {
      "id": "hero1",
      "position": {
        "x": 500,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt_vneck/male",
        "hair": "shorthawk/adult",
        "feet": "boots/rimmed/male",
        "hat": "pirate/bandana/adult"
      }
    },
    {
      "id": "knight1",
      "position": {
        "x": 650,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/lizard/female",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "formal_striped/thin",
        "hair": "page/adult",
        "feet": "shoes/basic/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "friend1",
            "params": {
              "direction": "DOWN"
            }
          },
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "hero1",
            "params": {
              "direction": "DOWN"
            }
          },
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "knight1",
            "params": {
              "direction": "DOWN"
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 1500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "friend1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "hero1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "hero1",
        "params": {
          "text": "Rest in peace.",
          "duration": 2000
        }
      }
    ]
  }
}
```

## Example 16: rogue and friend race to the finish line.
```json
{
  "id": "scene_16",
  "soundtrack": "dance",
  "background": "park",
  "entities": [
    {
      "id": "rogue1",
      "position": {
        "x": 150,
        "y": 380
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/lizard/female",
        "torso": "clothes/shortsleeve/tshirt/male",
        "legs": "leggings/male",
        "hair": "jewfro/adult",
        "feet": "boots/fold/male"
      }
    },
    {
      "id": "friend1",
      "position": {
        "x": 150,
        "y": 460
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt_vneck/male",
        "legs": "hose/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "rogue1",
        "params": {
          "text": "Ready... Go!",
          "duration": 1200
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "rogue1",
            "params": {
              "destination": {
                "x": 850,
                "y": 380
              },
              "speed": 1.8
            }
          },
          {
            "type": "action",
            "name": "move",
            "entityId": "friend1",
            "params": {
              "destination": {
                "x": 850,
                "y": 460
              },
              "speed": 1.5
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "rogue1",
        "params": {
          "emote": "laugh",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "friend1",
        "params": {
          "text": "I'll win next time!",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 17: mage juggles objects by picking up and throwing them.
```json
{
  "id": "scene_17",
  "background": "desert",
  "entities": [
    {
      "id": "mage1",
      "position": {
        "x": 500,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "aprons/overalls/male",
        "legs": "cuffed/male",
        "hair": "curly_long/adult",
        "feet": "boots/fold/male",
        "neck": "tie/necktie/female"
      }
    },
    {
      "id": "ball_a",
      "position": {
        "x": 480,
        "y": 460
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "heart",
      "color": "#95e1d3ff"
    },
    {
      "id": "ball_b",
      "position": {
        "x": 520,
        "y": 460
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "capsule",
      "color": "#457b9dff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "mage1",
        "params": {
          "objectId": "ball_a",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "mage1",
        "params": {
          "objectId": "ball_a",
          "target": {
            "x": 700,
            "y": 300
          },
          "arcHeight": 80
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 400
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "mage1",
        "params": {
          "objectId": "ball_b",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "mage1",
        "params": {
          "objectId": "ball_b",
          "target": {
            "x": 300,
            "y": 300
          },
          "arcHeight": 80
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "mage1",
        "params": {
          "emote": "laugh",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 18: villain ambushes guard from behind.
```json
{
  "id": "scene_18",
  "soundtrack": "battle",
  "background": "mountain",
  "entities": [
    {
      "id": "villain1",
      "position": {
        "x": 800,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/sleeveless/sleeveless1/female",
        "legs": "shorts/shorts/thin",
        "hair": "dreadlocks_long/adult",
        "feet": "boots/revised/thin",
        "facial": "glasses/glasses/adult"
      }
    },
    {
      "id": "guard1",
      "position": {
        "x": 400,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/child",
        "torso": "aprons/suspenders/male",
        "legs": "pantaloons/male",
        "hair": "twists_straight/adult",
        "feet": "boots/revised/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "faceDirection",
        "entityId": "guard1",
        "params": {
          "direction": "LEFT"
        }
      },
      {
        "type": "action",
        "name": "move",
        "entityId": "villain1",
        "params": {
          "destination": {
            "x": 470,
            "y": 400
          }
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "villain1",
        "params": {
          "targetId": "guard1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "guard1",
            "params": {
              "direction": {
                "x": -1,
                "y": 0
              },
              "strength": 80
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "guard1",
            "params": {
              "emote": "surprise",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "villain1",
        "params": {
          "text": "Surprise!",
          "duration": 1200
        }
      }
    ]
  }
}
```

## Example 19: warrior escorts cleric safely across the battlefield.
```json
{
  "id": "scene_19",
  "soundtrack": "calm",
  "background": "park",
  "entities": [
    {
      "id": "warrior1",
      "position": {
        "x": 200,
        "y": 430
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve_cardigan/female"
      }
    },
    {
      "id": "cleric1",
      "position": {
        "x": 250,
        "y": 430
      },
      "scale": 1.8,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless1/male",
        "legs": "shorts/shorts/male",
        "hair": "ponytail/adult/fg"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "warrior1",
        "params": {
          "text": "Stay close.",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "warrior1",
            "params": {
              "destination": {
                "x": 750,
                "y": 430
              }
            }
          },
          {
            "type": "action",
            "name": "follow",
            "entityId": "cleric1",
            "params": {
              "targetId": "warrior1",
              "duration": 4000,
              "speed": 1
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "warrior1",
        "params": {
          "text": "We're safe now.",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "cleric1",
        "params": {
          "emote": "love",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 20: knight and guard rest around a campfire.
```json
{
  "id": "scene_20",
  "soundtrack": "calm",
  "background": "mountain",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 380,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/male",
        "torso": "clothes/sleeveless/sleeveless1/female",
        "legs": "leggings2/thin",
        "hair": "natural/adult",
        "hat": "helmet/flattop/male"
      }
    },
    {
      "id": "guard1",
      "position": {
        "x": 620,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt_vneck/female",
        "legs": "pantaloons/thin",
        "weapon": "magic/wand/female"
      }
    },
    {
      "id": "campfire1",
      "position": {
        "x": 500,
        "y": 460
      },
      "scale": 0.6,
      "isObject": true,
      "shape": "circle",
      "color": "#d62828ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "knight1",
            "params": {
              "targetId": "guard1"
            }
          },
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "guard1",
            "params": {
              "targetId": "knight1"
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "knight1",
        "params": {
          "text": "Long day, huh?",
          "duration": 2000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "guard1",
        "params": {
          "text": "Yeah, let's rest here.",
          "duration": 2000
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "zzz",
              "duration": 2500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "guard1",
            "params": {
              "emote": "zzz",
              "duration": 2500
            }
          }
        ]
      }
    ]
  }
}
```

## Example 21: A knight walks over and picks up a apple.
```json
{
  "id": "scene_21",
  "background": "desert",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 275,
        "y": 409
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2_vneck/female",
        "legs": "formal_striped/thin"
      }
    },
    {
      "id": "apple1",
      "position": {
        "x": 448,
        "y": 436
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "circle",
      "color": "#264653ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "move",
        "entityId": "knight1",
        "params": {
          "destination": {
            "x": 428,
            "y": 436
          }
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "knight1",
        "params": {
          "objectId": "apple1",
          "attachmentPoint": "hand"
        }
      }
    ]
  }
}
```

## Example 22: A guard throws a bottle at a guard.
```json
{
  "id": "scene_22",
  "background": "mountain",
  "entities": [
    {
      "id": "guard1",
      "position": {
        "x": 334,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/sleeveless/sleeveless2/female",
        "legs": "fur/thin",
        "hair": "bob/adult"
      }
    },
    {
      "id": "guard1",
      "position": {
        "x": 868,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/wolf/male",
        "torso": "clothes/shortsleeve/shortsleeve_cardigan/female",
        "legs": "cuffed/thin",
        "feet": "shoes/ghillies/thin",
        "shield": "heater/original/pattern/chevron"
      }
    },
    {
      "id": "bottle1",
      "position": {
        "x": 309,
        "y": 450
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "triangle",
      "color": "#d62828ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "guard1",
        "params": {
          "objectId": "bottle1"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "guard1",
        "params": {
          "targetId": "guard1"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "guard1",
        "params": {
          "objectId": "bottle1",
          "target": {
            "x": 860,
            "y": 400
          },
          "arcHeight": 56
        }
      },
      {
        "type": "action",
        "name": "knockBack",
        "entityId": "guard1",
        "params": {
          "direction": {
            "x": 1,
            "y": 0
          },
          "strength": 40
        }
      }
    ]
  }
}
```

## Example 23: cleric and scout have a friendly conversation.
```json
{
  "id": "scene_23",
  "background": "forest",
  "entities": [
    {
      "id": "cleric1",
      "position": {
        "x": 400,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve/female",
        "legs": "fur/thin",
        "feet": "shoes/basic/thin"
      }
    },
    {
      "id": "scout1",
      "position": {
        "x": 620,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/shortsleeve_polo/male",
        "legs": "pants/male",
        "hair": "plain/adult",
        "feet": "sandals/male",
        "arms": "gloves/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "cleric1",
        "params": {
          "targetId": "scout1"
        }
      },
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "scout1",
        "params": {
          "targetId": "cleric1"
        }
      },
      {
        "type": "action",
        "name": "wave",
        "entityId": "cleric1",
        "params": {
          "targetId": "scout1",
          "waves": 2
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "scout1",
        "params": {
          "text": "Need help?",
          "duration": 2000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "speak",
            "entityId": "cleric1",
            "params": {
              "text": "I can manage, thanks.",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "cleric1",
            "params": {
              "emote": "exclaim",
              "duration": 2000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 24: An attack happens: orc_chief strikes scout, who flees.
```json
{
  "id": "scene_24",
  "soundtrack": "battle",
  "background": "park",
  "entities": [
    {
      "id": "orc_chief1",
      "position": {
        "x": 400,
        "y": 344
      },
      "scale": 2.5,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/male",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/male",
        "legs": "leggings2/male",
        "feet": "sandals/male"
      }
    },
    {
      "id": "scout1",
      "position": {
        "x": 620,
        "y": 427
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/skeleton",
        "torso": "clothes/longsleeve/longsleeve2_cardigan/female",
        "legs": "pantaloons/thin",
        "hair": "natural/adult",
        "feet": "shoes/ghillies/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "move",
        "entityId": "orc_chief1",
        "params": {
          "destination": {
            "x": 560,
            "y": 400
          }
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "orc_chief1",
        "params": {
          "targetId": "scout1",
          "weapon": "gun"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "scout1",
            "params": {
              "direction": {
                "x": 1,
                "y": 0
              },
              "strength": 100
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "scout1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "scout1",
        "params": {
          "targetId": "orc_chief1",
          "duration": 2000,
          "speed": 1.5
        }
      }
    ]
  }
}
```

## Example 25: hero casts a healing spell on the injured knight.
```json
{
  "id": "scene_25",
  "soundtrack": "mystical",
  "background": "desert",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 300,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "leggings2/thin",
        "hair": "balding/adult",
        "hat": "helmet/greathelm/female"
      }
    },
    {
      "id": "knight1",
      "position": {
        "x": 520,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/alien/adult",
        "torso": "clothes/sleeveless/sleeveless2_vneck/male",
        "legs": "formal/male",
        "hair": "loose/adult"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "heal",
        "entityId": "hero1",
        "params": {
          "targetId": "knight1",
          "amount": 42,
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "love",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "oscillate",
            "entityId": "knight1",
            "params": {
              "amplitude": 5,
              "frequency": 10,
              "duration": 1000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 26: A warrior crawls to a location and falls asleep.
```json
{
  "id": "scene_26",
  "soundtrack": "calm",
  "background": "mountain",
  "entities": [
    {
      "id": "warrior1",
      "position": {
        "x": 200,
        "y": 300
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/child",
        "torso": "aprons/overalls/female",
        "legs": "pantaloons/thin",
        "hair": "balding/adult",
        "feet": "shoes/basic/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "crouch",
        "entityId": "warrior1",
        "params": {
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "crawl",
        "entityId": "warrior1",
        "params": {
          "destination": {
            "x": 481,
            "y": 423
          }
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "sleep",
        "entityId": "warrior1",
        "params": {
          "duration": 5000
        }
      }
    ]
  }
}
```

## Example 27: scout patrols an area with physics active.
```json
{
  "id": "scene_27",
  "background": "beach",
  "entities": [
    {
      "id": "scout1",
      "position": {
        "x": 400,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt_vneck/female",
        "legs": "leggings/thin",
        "hair": "ponytail/adult/fg",
        "feet": "boots/fold/thin",
        "hat": "formal/crown/adult"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "jump",
        "entityId": "scout1",
        "params": {
          "height": 77,
          "distance": 42
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "patrol",
        "entityId": "scout1",
        "params": {
          "pointA": {
            "x": 400,
            "y": 450
          },
          "pointB": {
            "x": 728,
            "y": 450
          },
          "laps": 2,
          "pauseAtEnds": 500
        }
      }
    ]
  }
}
```

## Example 28: A ring spawns, rotates, and fades away.
```json
{
  "id": "scene_28",
  "background": "desert",
  "entities": [],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "spawn",
        "params": {
          "entityId": "magic_obj",
          "x": 725,
          "y": 397,
          "scale": 0.5,
          "isObject": true,
          "shape": "circle",
          "color": "#e63946ff"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "rotate",
            "entityId": "magic_obj",
            "params": {
              "angle": 389,
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "oscillate",
            "entityId": "magic_obj",
            "params": {
              "amplitude": 20,
              "duration": 2000
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "fade",
        "entityId": "magic_obj",
        "params": {
          "targetAlpha": 0,
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "despawn",
        "params": {
          "entityId": "magic_obj"
        }
      }
    ]
  }
}
```

## Example 29: king gives a scroll to warrior.
```json
{
  "id": "scene_29",
  "background": "desert",
  "entities": [
    {
      "id": "king1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve/female",
        "legs": "formal_striped/thin",
        "hair": "pigtails/adult",
        "feet": "slippers/thin",
        "weapon": "magic/wand/female"
      }
    },
    {
      "id": "warrior1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "shorts/short_shorts/thin",
        "hair": "high_and_tight/adult",
        "feet": "shoes/ghillies/thin"
      }
    },
    {
      "id": "scroll1",
      "position": {
        "x": 280,
        "y": 470
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "square",
      "color": "#2a9d8fff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "king1",
        "params": {
          "objectId": "scroll1"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "give",
        "entityId": "king1",
        "params": {
          "objectId": "scroll1",
          "targetId": "warrior1",
          "reachDistance": 80
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "dance",
        "entityId": "warrior1",
        "params": {
          "duration": 2000
        }
      }
    ]
  }
}
```

## Example 30: knight wanders randomly and then speaks.
```json
{
  "id": "scene_30",
  "background": "beach",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 539,
        "y": 333
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "aprons/suspenders/female",
        "hat": "helmet/pointed/adult",
        "facial": "glasses/sunglasses/adult"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "wander",
        "entityId": "knight1",
        "params": {
          "area": {
            "x": 400,
            "y": 200,
            "width": 400,
            "height": 400
          },
          "duration": 3000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "faceDirection",
        "entityId": "knight1",
        "params": {
          "direction": "LEFT"
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "knight1",
        "params": {
          "text": "I sense danger.",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 31: warrior chases rogue across the area.
```json
{
  "id": "scene_31",
  "soundtrack": "battle",
  "background": "park",
  "entities": [
    {
      "id": "warrior1",
      "position": {
        "x": 200,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless2_buttoned/male",
        "legs": "leggings/male",
        "hair": "flat_top_fade/adult",
        "arms": "gloves/male"
      }
    },
    {
      "id": "rogue1",
      "position": {
        "x": 500,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/wolf/male",
        "torso": "clothes/shortsleeve/tshirt/male",
        "legs": "hose/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "warrior1",
        "params": {
          "text": "Stop right there!",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "follow",
        "entityId": "warrior1",
        "params": {
          "targetId": "rogue1",
          "duration": 2000,
          "speed": 1.8
        }
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "rogue1",
        "params": {
          "targetId": "warrior1",
          "duration": 2500,
          "speed": 2
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "warrior1",
        "params": {
          "emote": "angry",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 32: warrior and troll engage in a dramatic duel.
```json
{
  "id": "scene_32",
  "soundtrack": "battle",
  "background": "desert",
  "entities": [
    {
      "id": "warrior1",
      "position": {
        "x": 300,
        "y": 400
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/goblin/adult",
        "torso": "clothes/shortsleeve/shortsleeve_polo/female",
        "legs": "hose/thin",
        "hair": "mop/adult",
        "feet": "shoes/ghillies/thin",
        "facial": "earrings/simple/right/adult",
        "arms": "gloves/female"
      }
    },
    {
      "id": "troll1",
      "position": {
        "x": 700,
        "y": 400
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/vampire/adult",
        "torso": "clothes/shortsleeve/tshirt_scoop/female",
        "hair": "dreadlocks_short/adult",
        "feet": "sandals/thin",
        "hat": "holiday/christmas/adult",
        "weapon": "magic/wand/female"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "warrior1",
            "params": {
              "destination": {
                "x": 480,
                "y": 400
              }
            }
          },
          {
            "type": "action",
            "name": "move",
            "entityId": "troll1",
            "params": {
              "destination": {
                "x": 550,
                "y": 400
              }
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "warrior1",
        "params": {
          "targetId": "troll1",
          "weapon": "punch"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "troll1",
        "params": {
          "targetId": "warrior1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "warrior1",
            "params": {
              "direction": {
                "x": -1,
                "y": 0
              },
              "strength": 60
            }
          },
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "troll1",
            "params": {
              "direction": {
                "x": 1,
                "y": 0
              },
              "strength": 60
            }
          }
        ]
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "warrior1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "troll1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          }
        ]
      }
    ]
  }
}
```

## Example 33: hero, mage, and rogue have a dance party.
```json
{
  "id": "scene_33",
  "soundtrack": "dance",
  "background": "park",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt/female",
        "legs": "leggings2/thin",
        "hair": "long_messy/adult",
        "facial": "patches/eyepatch/right/adult"
      }
    },
    {
      "id": "mage1",
      "position": {
        "x": 500,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "armour/plate/female",
        "hair": "unkempt/adult",
        "feet": "shoes/ghillies/thin"
      }
    },
    {
      "id": "rogue1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/female",
        "torso": "aprons/overalls/female",
        "legs": "pantaloons/thin",
        "hair": "afro/adult",
        "feet": "shoes/revised/thin",
        "facial": "patches/eyepatch/right/adult",
        "shield": "heater/original/paint"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "speak",
            "entityId": "hero1",
            "params": {
              "text": "Let's dance!",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "mage1",
            "params": {
              "emote": "love",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "dance",
            "entityId": "hero1",
            "params": {
              "duration": 3000
            }
          },
          {
            "type": "action",
            "name": "dance",
            "entityId": "mage1",
            "params": {
              "duration": 3000
            }
          },
          {
            "type": "action",
            "name": "dance",
            "entityId": "rogue1",
            "params": {
              "duration": 3000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 34: thief sneaks up and steals a gem from hero.
```json
{
  "id": "scene_34",
  "background": "forest",
  "entities": [
    {
      "id": "thief1",
      "position": {
        "x": 800,
        "y": 430
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/lizard/male",
        "torso": "aprons/overalls/female",
        "legs": "leggings/thin",
        "hair": "pixie/adult",
        "shield": "heater/revised/trim",
        "arms": "gloves/female"
      }
    },
    {
      "id": "hero1",
      "position": {
        "x": 400,
        "y": 430
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "aprons/suspenders/female",
        "legs": "formal_striped/thin",
        "hair": "parted/adult",
        "feet": "shoes/ghillies/thin"
      }
    },
    {
      "id": "gem1",
      "position": {
        "x": 380,
        "y": 450
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "square",
      "color": "#457b9dff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "crouch",
        "entityId": "thief1",
        "params": {
          "duration": 800
        }
      },
      {
        "type": "action",
        "name": "crawl",
        "entityId": "thief1",
        "params": {
          "destination": {
            "x": 420,
            "y": 430
          }
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "thief1",
        "params": {
          "objectId": "gem1",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "thief1",
        "params": {
          "targetId": "hero1",
          "duration": 2000,
          "speed": 2
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "hero1",
        "params": {
          "emote": "surprise",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 35: A solemn scene: friends mourn a fallen warrior.
```json
{
  "id": "scene_35",
  "soundtrack": "calm",
  "background": "mountain",
  "entities": [
    {
      "id": "friend1",
      "position": {
        "x": 350,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless2_buttoned/male",
        "legs": "leggings2/male",
        "hair": "bangs/adult",
        "feet": "slippers/male"
      }
    },
    {
      "id": "hero1",
      "position": {
        "x": 500,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt_buttoned/male",
        "hair": "messy1/adult",
        "feet": "shoes/basic/male",
        "weapon": "magic/wand/female",
        "neck": "tie/necktie/male"
      }
    },
    {
      "id": "knight1",
      "position": {
        "x": 650,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/lizard/male",
        "torso": "clothes/shortsleeve/shortsleeve_cardigan/male",
        "hair": "flat_top_fade/adult"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "friend1",
            "params": {
              "direction": "DOWN"
            }
          },
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "hero1",
            "params": {
              "direction": "DOWN"
            }
          },
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "knight1",
            "params": {
              "direction": "DOWN"
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 1500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "friend1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "hero1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "hero1",
        "params": {
          "text": "Rest in peace.",
          "duration": 2000
        }
      }
    ]
  }
}
```

## Example 36: rogue and friend race to the finish line.
```json
{
  "id": "scene_36",
  "soundtrack": "dance",
  "background": "park",
  "entities": [
    {
      "id": "rogue1",
      "position": {
        "x": 150,
        "y": 380
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/wolf/female",
        "torso": "clothes/longsleeve/longsleeve2_polo/male",
        "legs": "fur/male",
        "feet": "boots/rimmed/male"
      }
    },
    {
      "id": "friend1",
      "position": {
        "x": 150,
        "y": 460
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/child",
        "torso": "aprons/overalls/female",
        "legs": "cuffed/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "rogue1",
        "params": {
          "text": "Ready... Go!",
          "duration": 1200
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "rogue1",
            "params": {
              "destination": {
                "x": 850,
                "y": 380
              },
              "speed": 1.8
            }
          },
          {
            "type": "action",
            "name": "move",
            "entityId": "friend1",
            "params": {
              "destination": {
                "x": 850,
                "y": 460
              },
              "speed": 1.5
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "rogue1",
        "params": {
          "emote": "laugh",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "friend1",
        "params": {
          "text": "I'll win next time!",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 37: hero juggles objects by picking up and throwing them.
```json
{
  "id": "scene_37",
  "background": "forest",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 500,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/mouse/adult",
        "torso": "clothes/shortsleeve/shortsleeve/female",
        "feet": "shoes/basic/thin"
      }
    },
    {
      "id": "ball_a",
      "position": {
        "x": 480,
        "y": 460
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "capsule",
      "color": "#95e1d3ff"
    },
    {
      "id": "ball_b",
      "position": {
        "x": 520,
        "y": 460
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "capsule",
      "color": "#e9c46aff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "hero1",
        "params": {
          "objectId": "ball_a",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "hero1",
        "params": {
          "objectId": "ball_a",
          "target": {
            "x": 700,
            "y": 300
          },
          "arcHeight": 80
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 400
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "hero1",
        "params": {
          "objectId": "ball_b",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "hero1",
        "params": {
          "objectId": "ball_b",
          "target": {
            "x": 300,
            "y": 300
          },
          "arcHeight": 80
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "hero1",
        "params": {
          "emote": "laugh",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 38: villain ambushes hero from behind.
```json
{
  "id": "scene_38",
  "soundtrack": "battle",
  "background": "desert",
  "entities": [
    {
      "id": "villain1",
      "position": {
        "x": 800,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/lizard/female",
        "torso": "armour/plate/male",
        "legs": "formal_striped/male",
        "hair": "mop/adult",
        "feet": "shoes/basic/male"
      }
    },
    {
      "id": "hero1",
      "position": {
        "x": 400,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/female",
        "torso": "aprons/suspenders/female",
        "hair": "parted/adult",
        "feet": "slippers/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "faceDirection",
        "entityId": "hero1",
        "params": {
          "direction": "LEFT"
        }
      },
      {
        "type": "action",
        "name": "move",
        "entityId": "villain1",
        "params": {
          "destination": {
            "x": 470,
            "y": 400
          }
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "villain1",
        "params": {
          "targetId": "hero1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "hero1",
            "params": {
              "direction": {
                "x": -1,
                "y": 0
              },
              "strength": 80
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "hero1",
            "params": {
              "emote": "surprise",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "villain1",
        "params": {
          "text": "Surprise!",
          "duration": 1200
        }
      }
    ]
  }
}
```

## Example 39: guard escorts hero safely across the battlefield.
```json
{
  "id": "scene_39",
  "soundtrack": "calm",
  "background": "city",
  "entities": [
    {
      "id": "guard1",
      "position": {
        "x": 200,
        "y": 430
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless1/male",
        "legs": "cuffed/male",
        "hair": "shorthawk/adult",
        "feet": "shoes/revised/male"
      }
    },
    {
      "id": "hero1",
      "position": {
        "x": 250,
        "y": 430
      },
      "scale": 1.8,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/male",
        "torso": "clothes/longsleeve/scoop/female",
        "legs": "leggings2/thin",
        "hair": "curly_long/adult",
        "feet": "shoes/revised/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "guard1",
        "params": {
          "text": "Stay close.",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "guard1",
            "params": {
              "destination": {
                "x": 750,
                "y": 430
              }
            }
          },
          {
            "type": "action",
            "name": "follow",
            "entityId": "hero1",
            "params": {
              "targetId": "guard1",
              "duration": 4000,
              "speed": 1
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "guard1",
        "params": {
          "text": "We're safe now.",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "hero1",
        "params": {
          "emote": "love",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 40: hero and friend rest around a campfire.
```json
{
  "id": "scene_40",
  "soundtrack": "calm",
  "background": "mountain",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 380,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless2_buttoned/male",
        "legs": "fur/male",
        "hair": "page/adult",
        "feet": "boots/basic/male",
        "shield": "heater/revised/pattern/cross"
      }
    },
    {
      "id": "friend1",
      "position": {
        "x": 620,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/male",
        "torso": "clothes/longsleeve/longsleeve/male",
        "legs": "formal_striped/male",
        "hair": "half_up/adult",
        "feet": "boots/fold/male",
        "facial": "glasses/glasses/adult"
      }
    },
    {
      "id": "campfire1",
      "position": {
        "x": 500,
        "y": 460
      },
      "scale": 0.6,
      "isObject": true,
      "shape": "square",
      "color": "#00b894ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "hero1",
            "params": {
              "targetId": "friend1"
            }
          },
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "friend1",
            "params": {
              "targetId": "hero1"
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "hero1",
        "params": {
          "text": "Long day, huh?",
          "duration": 2000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "friend1",
        "params": {
          "text": "Yeah, let's rest here.",
          "duration": 2000
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "hero1",
            "params": {
              "emote": "zzz",
              "duration": 2500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "friend1",
            "params": {
              "emote": "zzz",
              "duration": 2500
            }
          }
        ]
      }
    ]
  }
}
```

## Example 41: A knight walks over and picks up a apple.
```json
{
  "id": "scene_41",
  "background": "beach",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 344,
        "y": 443
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/sheep/adult",
        "torso": "clothes/shortsleeve/tshirt_vneck/female",
        "legs": "pantaloons/thin",
        "hair": "pigtails/adult"
      }
    },
    {
      "id": "apple1",
      "position": {
        "x": 593,
        "y": 463
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "cylinder",
      "color": "#fd79a8ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "move",
        "entityId": "knight1",
        "params": {
          "destination": {
            "x": 573,
            "y": 463
          }
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "knight1",
        "params": {
          "objectId": "apple1",
          "attachmentPoint": "hand"
        }
      }
    ]
  }
}
```

## Example 42: A rogue throws a key at a villain.
```json
{
  "id": "scene_42",
  "background": "city",
  "entities": [
    {
      "id": "rogue1",
      "position": {
        "x": 260,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless1/male",
        "legs": "shorts/short_shorts/male"
      }
    },
    {
      "id": "villain1",
      "position": {
        "x": 907,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/male",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/female",
        "hair": "buzzcut/adult",
        "feet": "shoes/revised/thin"
      }
    },
    {
      "id": "key1",
      "position": {
        "x": 359,
        "y": 450
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "cylinder",
      "color": "#f4a261ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "rogue1",
        "params": {
          "objectId": "key1"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "rogue1",
        "params": {
          "targetId": "villain1"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "rogue1",
        "params": {
          "objectId": "key1",
          "target": {
            "x": 860,
            "y": 400
          },
          "arcHeight": 54
        }
      },
      {
        "type": "action",
        "name": "knockBack",
        "entityId": "villain1",
        "params": {
          "direction": {
            "x": 1,
            "y": 0
          },
          "strength": 53
        }
      }
    ]
  },
  "soundtrack": "dance"
}
```

## Example 43: knight and villain have a friendly conversation.
```json
{
  "id": "scene_43",
  "background": "city",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 400,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/skeleton",
        "torso": "clothes/shortsleeve/shortsleeve_cardigan/male",
        "legs": "pants/male",
        "hair": "ponytail/adult/fg",
        "feet": "boots/fold/male",
        "facial": "glasses/nerd/adult",
        "arms": "gloves/male"
      }
    },
    {
      "id": "villain1",
      "position": {
        "x": 620,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/shortsleeve/male",
        "legs": "pants/male",
        "hair": "flat_top_fade/adult",
        "weapon": "magic/wand/female",
        "arms": "gloves/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "knight1",
        "params": {
          "targetId": "villain1"
        }
      },
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "villain1",
        "params": {
          "targetId": "knight1"
        }
      },
      {
        "type": "action",
        "name": "wave",
        "entityId": "knight1",
        "params": {
          "targetId": "villain1",
          "waves": 2
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "villain1",
        "params": {
          "text": "Good morning!",
          "duration": 2000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "speak",
            "entityId": "knight1",
            "params": {
              "text": "A fine day indeed.",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "love",
              "duration": 2000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 44: An attack happens: knight strikes rogue, who flees.
```json
{
  "id": "scene_44",
  "soundtrack": "battle",
  "background": "park",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 400,
        "y": 363
      },
      "scale": 2.5,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2/female",
        "legs": "leggings/thin",
        "hair": "dreadlocks_long/adult",
        "feet": "boots/fold/thin",
        "weapon": "magic/wand/female",
        "arms": "gloves/female"
      }
    },
    {
      "id": "rogue1",
      "position": {
        "x": 620,
        "y": 397
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2/female",
        "legs": "leggings2/thin",
        "hair": "dreadlocks_long/adult"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "move",
        "entityId": "knight1",
        "params": {
          "destination": {
            "x": 560,
            "y": 400
          }
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "knight1",
        "params": {
          "targetId": "rogue1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "rogue1",
            "params": {
              "direction": {
                "x": 1,
                "y": 0
              },
              "strength": 100
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "rogue1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "rogue1",
        "params": {
          "targetId": "knight1",
          "duration": 2000,
          "speed": 1.5
        }
      }
    ]
  }
}
```

## Example 45: sage casts a healing spell on the injured warrior.
```json
{
  "id": "scene_45",
  "soundtrack": "mystical",
  "background": "mountain",
  "entities": [
    {
      "id": "sage1",
      "position": {
        "x": 300,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2_polo/female",
        "legs": "hose/thin",
        "feet": "boots/fold/thin"
      }
    },
    {
      "id": "warrior1",
      "position": {
        "x": 520,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "armour/plate/female",
        "legs": "cuffed/thin",
        "hair": "natural/adult",
        "feet": "shoes/basic/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "heal",
        "entityId": "sage1",
        "params": {
          "targetId": "warrior1",
          "amount": 53,
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "warrior1",
            "params": {
              "emote": "love",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "oscillate",
            "entityId": "warrior1",
            "params": {
              "amplitude": 5,
              "frequency": 10,
              "duration": 1000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 46: A friend crawls to a location and falls asleep.
```json
{
  "id": "scene_46",
  "soundtrack": "calm",
  "background": "mountain",
  "entities": [
    {
      "id": "friend1",
      "position": {
        "x": 200,
        "y": 300
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve_polo/female"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "crouch",
        "entityId": "friend1",
        "params": {
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "crawl",
        "entityId": "friend1",
        "params": {
          "destination": {
            "x": 481,
            "y": 382
          }
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "sleep",
        "entityId": "friend1",
        "params": {
          "duration": 5000
        }
      }
    ]
  }
}
```

## Example 47: soldier patrols an area with physics active.
```json
{
  "id": "scene_47",
  "background": "city",
  "entities": [
    {
      "id": "soldier1",
      "position": {
        "x": 400,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "armour/legion/male",
        "legs": "leggings/male",
        "hair": "flat_top_fade/adult",
        "feet": "boots/basic/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "jump",
        "entityId": "soldier1",
        "params": {
          "height": 59,
          "distance": 55
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "patrol",
        "entityId": "soldier1",
        "params": {
          "pointA": {
            "x": 400,
            "y": 450
          },
          "pointB": {
            "x": 671,
            "y": 450
          },
          "laps": 2,
          "pauseAtEnds": 500
        }
      }
    ]
  }
}
```

## Example 48: A crystal_shard spawns, rotates, and fades away.
```json
{
  "id": "scene_48",
  "background": "mountain",
  "entities": [],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "spawn",
        "params": {
          "entityId": "magic_obj",
          "x": 589,
          "y": 376,
          "scale": 0.5,
          "isObject": true,
          "shape": "rectangle",
          "color": "#00b894ff"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "rotate",
            "entityId": "magic_obj",
            "params": {
              "angle": 563,
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "oscillate",
            "entityId": "magic_obj",
            "params": {
              "amplitude": 20,
              "duration": 2000
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "fade",
        "entityId": "magic_obj",
        "params": {
          "targetAlpha": 0,
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "despawn",
        "params": {
          "entityId": "magic_obj"
        }
      }
    ]
  }
}
```

## Example 49: hero gives a sword to peasant.
```json
{
  "id": "scene_49",
  "background": "mountain",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/male",
        "legs": "formal/male",
        "hair": "shorthawk/adult",
        "facial": "glasses/halfmoon/adult",
        "shield": "heater/revised/paint"
      }
    },
    {
      "id": "peasant1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2_polo/male",
        "legs": "cuffed/male",
        "feet": "shoes/revised/male"
      }
    },
    {
      "id": "sword1",
      "position": {
        "x": 280,
        "y": 470
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "capsule",
      "color": "#aa96daff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "hero1",
        "params": {
          "objectId": "sword1"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "give",
        "entityId": "hero1",
        "params": {
          "objectId": "sword1",
          "targetId": "peasant1",
          "reachDistance": 80
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "dance",
        "entityId": "peasant1",
        "params": {
          "duration": 2000
        }
      }
    ]
  }
}
```

## Example 50: rogue wanders randomly and then speaks.
```json
{
  "id": "scene_50",
  "background": "beach",
  "entities": [
    {
      "id": "rogue1",
      "position": {
        "x": 636,
        "y": 362
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt/male",
        "legs": "cuffed/male",
        "hair": "curly_short/adult",
        "feet": "shoes/basic/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "wander",
        "entityId": "rogue1",
        "params": {
          "area": {
            "x": 400,
            "y": 200,
            "width": 400,
            "height": 400
          },
          "duration": 3000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "faceDirection",
        "entityId": "rogue1",
        "params": {
          "direction": "DOWN"
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "rogue1",
        "params": {
          "text": "I'm lost.",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 51: knight chases villain across the area.
```json
{
  "id": "scene_51",
  "soundtrack": "battle",
  "background": "desert",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 200,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/scoop/female",
        "legs": "shorts/short_shorts/thin",
        "feet": "boots/revised/thin",
        "weapon": "magic/wand/female"
      }
    },
    {
      "id": "villain1",
      "position": {
        "x": 500,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "leggings/thin",
        "hair": "messy1/adult",
        "feet": "shoes/ghillies/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "knight1",
        "params": {
          "text": "Stop right there!",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "follow",
        "entityId": "knight1",
        "params": {
          "targetId": "villain1",
          "duration": 2000,
          "speed": 1.8
        }
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "villain1",
        "params": {
          "targetId": "knight1",
          "duration": 2500,
          "speed": 2
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "knight1",
        "params": {
          "emote": "angry",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 52: knight and orc engage in a dramatic duel.
```json
{
  "id": "scene_52",
  "soundtrack": "battle",
  "background": "forest",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 300,
        "y": 400
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/female",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/female",
        "legs": "hose/thin",
        "hair": "page/adult",
        "feet": "boots/rimmed/thin",
        "hat": "pirate/tricorne/basic/adult",
        "neck": "tie/necktie/female"
      }
    },
    {
      "id": "orc1",
      "position": {
        "x": 700,
        "y": 400
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve/male",
        "legs": "leggings2/male",
        "hair": "twists_straight/adult",
        "feet": "boots/revised/male",
        "weapon": "magic/wand/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "knight1",
            "params": {
              "destination": {
                "x": 480,
                "y": 400
              }
            }
          },
          {
            "type": "action",
            "name": "move",
            "entityId": "orc1",
            "params": {
              "destination": {
                "x": 550,
                "y": 400
              }
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "knight1",
        "params": {
          "targetId": "orc1",
          "weapon": "punch"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "orc1",
        "params": {
          "targetId": "knight1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "knight1",
            "params": {
              "direction": {
                "x": -1,
                "y": 0
              },
              "strength": 60
            }
          },
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "orc1",
            "params": {
              "direction": {
                "x": 1,
                "y": 0
              },
              "strength": 60
            }
          }
        ]
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "orc1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          }
        ]
      }
    ]
  }
}
```

## Example 53: hero, guard, and mage have a dance party.
```json
{
  "id": "scene_53",
  "soundtrack": "dance",
  "background": "city",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/wolf/female",
        "torso": "clothes/longsleeve/longsleeve2_cardigan/female",
        "legs": "formal/thin",
        "feet": "boots/rimmed/thin"
      }
    },
    {
      "id": "guard1",
      "position": {
        "x": 500,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless2/male",
        "legs": "pants/male",
        "hair": "ponytail/adult/fg",
        "hat": "pirate/bandana/adult",
        "weapon": "magic/wand/male",
        "arms": "gloves/male"
      }
    },
    {
      "id": "mage1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/wolf/female",
        "torso": "clothes/shortsleeve/tshirt_buttoned/female",
        "legs": "formal/thin",
        "hair": "spiked/adult",
        "shield": "heater/revised/pattern/cross"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "speak",
            "entityId": "hero1",
            "params": {
              "text": "Let's dance!",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "guard1",
            "params": {
              "emote": "love",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "dance",
            "entityId": "hero1",
            "params": {
              "duration": 3000
            }
          },
          {
            "type": "action",
            "name": "dance",
            "entityId": "guard1",
            "params": {
              "duration": 3000
            }
          },
          {
            "type": "action",
            "name": "dance",
            "entityId": "mage1",
            "params": {
              "duration": 3000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 54: villain sneaks up and steals a key from guard.
```json
{
  "id": "scene_54",
  "background": "park",
  "entities": [
    {
      "id": "villain1",
      "position": {
        "x": 800,
        "y": 430
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/troll/adult",
        "torso": "clothes/sleeveless/sleeveless2_vneck/male",
        "legs": "pants/male",
        "hair": "messy1/adult",
        "feet": "boots/basic/male",
        "facial": "monocle/left/adult"
      }
    },
    {
      "id": "guard1",
      "position": {
        "x": 400,
        "y": 430
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2_cardigan/male",
        "legs": "pants/male",
        "hair": "long_messy/adult",
        "feet": "shoes/revised/male"
      }
    },
    {
      "id": "key1",
      "position": {
        "x": 380,
        "y": 450
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "rectangle",
      "color": "#e63946ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "crouch",
        "entityId": "villain1",
        "params": {
          "duration": 800
        }
      },
      {
        "type": "action",
        "name": "crawl",
        "entityId": "villain1",
        "params": {
          "destination": {
            "x": 420,
            "y": 430
          }
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "villain1",
        "params": {
          "objectId": "key1",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "villain1",
        "params": {
          "targetId": "guard1",
          "duration": 2000,
          "speed": 2
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "guard1",
        "params": {
          "emote": "surprise",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 55: A solemn scene: friends mourn a fallen warrior.
```json
{
  "id": "scene_55",
  "soundtrack": "calm",
  "background": "forest",
  "entities": [
    {
      "id": "friend1",
      "position": {
        "x": 350,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt/female",
        "hair": "plain/adult",
        "facial": "monocle/right/adult",
        "shield": "heater/revised/paint",
        "neck": "tie/necktie/female"
      }
    },
    {
      "id": "hero1",
      "position": {
        "x": 500,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/male",
        "torso": "armour/legion/female",
        "hair": "bangs/adult",
        "hat": "helmet/greathelm/male"
      }
    },
    {
      "id": "knight1",
      "position": {
        "x": 650,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/scoop/female",
        "legs": "hose/thin",
        "feet": "shoes/revised/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "friend1",
            "params": {
              "direction": "DOWN"
            }
          },
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "hero1",
            "params": {
              "direction": "DOWN"
            }
          },
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "knight1",
            "params": {
              "direction": "DOWN"
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 1500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "friend1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "hero1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "hero1",
        "params": {
          "text": "Rest in peace.",
          "duration": 2000
        }
      }
    ]
  }
}
```

## Example 56: scout and knight race to the finish line.
```json
{
  "id": "scene_56",
  "soundtrack": "dance",
  "background": "desert",
  "entities": [
    {
      "id": "scout1",
      "position": {
        "x": 150,
        "y": 380
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/sleeveless/sleeveless2/female",
        "legs": "formal/thin",
        "hair": "longhawk/adult",
        "feet": "shoes/basic/thin"
      }
    },
    {
      "id": "knight1",
      "position": {
        "x": 150,
        "y": 460
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/male",
        "legs": "fur/male",
        "hair": "parted/adult",
        "feet": "shoes/basic/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "scout1",
        "params": {
          "text": "Ready... Go!",
          "duration": 1200
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "scout1",
            "params": {
              "destination": {
                "x": 850,
                "y": 380
              },
              "speed": 1.8
            }
          },
          {
            "type": "action",
            "name": "move",
            "entityId": "knight1",
            "params": {
              "destination": {
                "x": 850,
                "y": 460
              },
              "speed": 1.5
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "scout1",
        "params": {
          "emote": "laugh",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "knight1",
        "params": {
          "text": "I'll win next time!",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 57: mage juggles objects by picking up and throwing them.
```json
{
  "id": "scene_57",
  "background": "city",
  "entities": [
    {
      "id": "mage1",
      "position": {
        "x": 500,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/lizard/male",
        "torso": "aprons/overalls/female",
        "legs": "pantaloons/thin",
        "feet": "shoes/revised/thin",
        "hat": "pirate/bicorne/athwart/basic/adult"
      }
    },
    {
      "id": "ball_a",
      "position": {
        "x": 480,
        "y": 460
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "star",
      "color": "#ab83a1ff"
    },
    {
      "id": "ball_b",
      "position": {
        "x": 520,
        "y": 460
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "heart",
      "color": "#95e1d3ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "mage1",
        "params": {
          "objectId": "ball_a",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "mage1",
        "params": {
          "objectId": "ball_a",
          "target": {
            "x": 700,
            "y": 300
          },
          "arcHeight": 80
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 400
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "mage1",
        "params": {
          "objectId": "ball_b",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "mage1",
        "params": {
          "objectId": "ball_b",
          "target": {
            "x": 300,
            "y": 300
          },
          "arcHeight": 80
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "mage1",
        "params": {
          "emote": "laugh",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 58: orc ambushes guard from behind.
```json
{
  "id": "scene_58",
  "soundtrack": "battle",
  "background": "forest",
  "entities": [
    {
      "id": "orc1",
      "position": {
        "x": 800,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "formal/thin"
      }
    },
    {
      "id": "guard1",
      "position": {
        "x": 400,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt_buttoned/female",
        "feet": "shoes/basic/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "faceDirection",
        "entityId": "guard1",
        "params": {
          "direction": "LEFT"
        }
      },
      {
        "type": "action",
        "name": "move",
        "entityId": "orc1",
        "params": {
          "destination": {
            "x": 470,
            "y": 400
          }
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "orc1",
        "params": {
          "targetId": "guard1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "guard1",
            "params": {
              "direction": {
                "x": -1,
                "y": 0
              },
              "strength": 80
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "guard1",
            "params": {
              "emote": "surprise",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "orc1",
        "params": {
          "text": "Surprise!",
          "duration": 1200
        }
      }
    ]
  }
}
```

## Example 59: warrior escorts king safely across the battlefield.
```json
{
  "id": "scene_59",
  "soundtrack": "calm",
  "background": "beach",
  "entities": [
    {
      "id": "warrior1",
      "position": {
        "x": 200,
        "y": 430
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2_vneck/female",
        "legs": "formal/thin",
        "hair": "balding/adult",
        "feet": "boots/rimmed/thin",
        "hat": "pirate/bandana/adult"
      }
    },
    {
      "id": "king1",
      "position": {
        "x": 250,
        "y": 430
      },
      "scale": 1.8,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/female",
        "torso": "clothes/shortsleeve/tshirt_buttoned/male",
        "legs": "pantaloons/male",
        "hair": "natural/adult",
        "feet": "boots/basic/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "warrior1",
        "params": {
          "text": "Stay close.",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "warrior1",
            "params": {
              "destination": {
                "x": 750,
                "y": 430
              }
            }
          },
          {
            "type": "action",
            "name": "follow",
            "entityId": "king1",
            "params": {
              "targetId": "warrior1",
              "duration": 4000,
              "speed": 1
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "warrior1",
        "params": {
          "text": "We're safe now.",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "king1",
        "params": {
          "emote": "love",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 60: knight and friend rest around a campfire.
```json
{
  "id": "scene_60",
  "soundtrack": "calm",
  "background": "mountain",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 380,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/female",
        "torso": "clothes/shortsleeve/tshirt/male",
        "feet": "boots/revised/male",
        "hat": "cloth/bandana/adult",
        "facial": "glasses/sunglasses/adult"
      }
    },
    {
      "id": "friend1",
      "position": {
        "x": 620,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/wolf/female",
        "torso": "clothes/shortsleeve/shortsleeve/female",
        "legs": "formal_striped/thin",
        "hair": "half_up/adult",
        "hat": "helmet/legion/adult"
      }
    },
    {
      "id": "campfire1",
      "position": {
        "x": 500,
        "y": 460
      },
      "scale": 0.6,
      "isObject": true,
      "shape": "triangle",
      "color": "#023e8aff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "knight1",
            "params": {
              "targetId": "friend1"
            }
          },
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "friend1",
            "params": {
              "targetId": "knight1"
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "knight1",
        "params": {
          "text": "Long day, huh?",
          "duration": 2000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "friend1",
        "params": {
          "text": "Yeah, let's rest here.",
          "duration": 2000
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "zzz",
              "duration": 2500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "friend1",
            "params": {
              "emote": "zzz",
              "duration": 2500
            }
          }
        ]
      }
    ]
  }
}
```

## Example 61: A knight walks over and picks up a apple.
```json
{
  "id": "scene_61",
  "background": "forest",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 320,
        "y": 453
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt_scoop/female",
        "legs": "pantaloons/thin",
        "hair": "idol/adult"
      }
    },
    {
      "id": "apple1",
      "position": {
        "x": 610,
        "y": 468
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "cylinder",
      "color": "#ffe66dff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "move",
        "entityId": "knight1",
        "params": {
          "destination": {
            "x": 590,
            "y": 468
          }
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "knight1",
        "params": {
          "objectId": "apple1",
          "attachmentPoint": "hand"
        }
      }
    ]
  }
}
```

## Example 62: A rogue throws a coin at a scout.
```json
{
  "id": "scene_62",
  "background": "desert",
  "entities": [
    {
      "id": "rogue1",
      "position": {
        "x": 236,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/child",
        "torso": "clothes/shortsleeve/shortsleeve_polo/female",
        "legs": "leggings/thin",
        "hair": "dreadlocks_long/adult",
        "feet": "boots/fold/thin",
        "weapon": "magic/wand/female"
      }
    },
    {
      "id": "scout1",
      "position": {
        "x": 878,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt_buttoned/female",
        "legs": "formal/thin"
      }
    },
    {
      "id": "coin1",
      "position": {
        "x": 263,
        "y": 450
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "capsule",
      "color": "#00b894ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "rogue1",
        "params": {
          "objectId": "coin1"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "rogue1",
        "params": {
          "targetId": "scout1"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "rogue1",
        "params": {
          "objectId": "coin1",
          "target": {
            "x": 860,
            "y": 400
          },
          "arcHeight": 62
        }
      },
      {
        "type": "action",
        "name": "knockBack",
        "entityId": "scout1",
        "params": {
          "direction": {
            "x": 1,
            "y": 0
          },
          "strength": 76
        }
      }
    ]
  },
  "soundtrack": "calm"
}
```

## Example 63: guard and rogue have a friendly conversation.
```json
{
  "id": "scene_63",
  "background": "city",
  "entities": [
    {
      "id": "guard1",
      "position": {
        "x": 400,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless1/male",
        "legs": "hose/male",
        "hair": "natural/adult",
        "feet": "slippers/male",
        "neck": "tie/necktie/female",
        "arms": "gloves/male"
      }
    },
    {
      "id": "rogue1",
      "position": {
        "x": 620,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "armour/plate/male",
        "legs": "leggings/male",
        "hair": "twists_straight/adult",
        "weapon": "magic/wand/female"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "guard1",
        "params": {
          "targetId": "rogue1"
        }
      },
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "rogue1",
        "params": {
          "targetId": "guard1"
        }
      },
      {
        "type": "action",
        "name": "wave",
        "entityId": "guard1",
        "params": {
          "targetId": "rogue1",
          "waves": 2
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "rogue1",
        "params": {
          "text": "Watch your back.",
          "duration": 2000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "speak",
            "entityId": "guard1",
            "params": {
              "text": "Thanks for the warning.",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "guard1",
            "params": {
              "emote": "laugh",
              "duration": 2000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 64: An attack happens: king strikes knight, who flees.
```json
{
  "id": "scene_64",
  "soundtrack": "battle",
  "background": "beach",
  "entities": [
    {
      "id": "king1",
      "position": {
        "x": 400,
        "y": 331
      },
      "scale": 2.5,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve_polo/female",
        "legs": "formal_striped/thin",
        "feet": "boots/fold/thin"
      }
    },
    {
      "id": "knight1",
      "position": {
        "x": 620,
        "y": 424
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt_buttoned/male",
        "legs": "pants2/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "move",
        "entityId": "king1",
        "params": {
          "destination": {
            "x": 560,
            "y": 400
          }
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "king1",
        "params": {
          "targetId": "knight1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "knight1",
            "params": {
              "direction": {
                "x": 1,
                "y": 0
              },
              "strength": 100
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "knight1",
        "params": {
          "targetId": "king1",
          "duration": 2000,
          "speed": 1.5
        }
      }
    ]
  }
}
```

## Example 65: guard casts a healing spell on the injured king.
```json
{
  "id": "scene_65",
  "soundtrack": "mystical",
  "background": "mountain",
  "entities": [
    {
      "id": "guard1",
      "position": {
        "x": 300,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve_polo/female",
        "hair": "spiked/adult",
        "feet": "slippers/thin",
        "hat": "helmet/legion/adult"
      }
    },
    {
      "id": "king1",
      "position": {
        "x": 520,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/child",
        "torso": "clothes/sleeveless/sleeveless2/male",
        "legs": "formal/male",
        "hair": "plain/adult",
        "feet": "boots/fold/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "heal",
        "entityId": "guard1",
        "params": {
          "targetId": "king1",
          "amount": 58,
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "king1",
            "params": {
              "emote": "love",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "oscillate",
            "entityId": "king1",
            "params": {
              "amplitude": 5,
              "frequency": 10,
              "duration": 1000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 66: A mage crawls to a location and falls asleep.
```json
{
  "id": "scene_66",
  "soundtrack": "calm",
  "background": "beach",
  "entities": [
    {
      "id": "mage1",
      "position": {
        "x": 200,
        "y": 300
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/mouse/adult",
        "torso": "clothes/shortsleeve/shortsleeve_polo/male",
        "legs": "pantaloons/male",
        "feet": "boots/rimmed/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "crouch",
        "entityId": "mage1",
        "params": {
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "crawl",
        "entityId": "mage1",
        "params": {
          "destination": {
            "x": 483,
            "y": 422
          }
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "sleep",
        "entityId": "mage1",
        "params": {
          "duration": 5000
        }
      }
    ]
  }
}
```

## Example 67: peasant patrols an area with physics active.
```json
{
  "id": "scene_67",
  "background": "city",
  "entities": [
    {
      "id": "peasant1",
      "position": {
        "x": 400,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/child",
        "torso": "clothes/sleeveless/sleeveless2_buttoned/male",
        "legs": "pantaloons/male",
        "hair": "bedhead/adult",
        "feet": "boots/basic/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "jump",
        "entityId": "peasant1",
        "params": {
          "height": 58,
          "distance": 40
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "patrol",
        "entityId": "peasant1",
        "params": {
          "pointA": {
            "x": 400,
            "y": 450
          },
          "pointB": {
            "x": 686,
            "y": 450
          },
          "laps": 2,
          "pauseAtEnds": 500
        }
      }
    ]
  }
}
```

## Example 68: A rune_stone spawns, rotates, and fades away.
```json
{
  "id": "scene_68",
  "background": "park",
  "entities": [],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "spawn",
        "params": {
          "entityId": "magic_obj",
          "x": 627,
          "y": 358,
          "scale": 0.5,
          "isObject": true,
          "shape": "heart",
          "color": "#e63946ff"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "rotate",
            "entityId": "magic_obj",
            "params": {
              "angle": 782,
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "oscillate",
            "entityId": "magic_obj",
            "params": {
              "amplitude": 20,
              "duration": 2000
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "fade",
        "entityId": "magic_obj",
        "params": {
          "targetAlpha": 0,
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "despawn",
        "params": {
          "entityId": "magic_obj"
        }
      }
    ]
  }
}
```

## Example 69: hero gives a potion to rogue.
```json
{
  "id": "scene_69",
  "background": "desert",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve/female",
        "feet": "shoes/revised/thin",
        "weapon": "magic/wand/female"
      }
    },
    {
      "id": "rogue1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt_scoop/male",
        "legs": "leggings2/male"
      }
    },
    {
      "id": "potion1",
      "position": {
        "x": 280,
        "y": 470
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "rectangle",
      "color": "#aa96daff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "hero1",
        "params": {
          "objectId": "potion1"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "give",
        "entityId": "hero1",
        "params": {
          "objectId": "potion1",
          "targetId": "rogue1",
          "reachDistance": 80
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "dance",
        "entityId": "rogue1",
        "params": {
          "duration": 2000
        }
      }
    ]
  }
}
```

## Example 70: peasant wanders randomly and then speaks.
```json
{
  "id": "scene_70",
  "background": "beach",
  "entities": [
    {
      "id": "peasant1",
      "position": {
        "x": 510,
        "y": 365
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/goblin/adult",
        "torso": "clothes/sleeveless/sleeveless1/male",
        "hair": "shorthawk/adult",
        "facial": "patches/eyepatch/right/adult"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "wander",
        "entityId": "peasant1",
        "params": {
          "area": {
            "x": 400,
            "y": 200,
            "width": 400,
            "height": 400
          },
          "duration": 3000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "faceDirection",
        "entityId": "peasant1",
        "params": {
          "direction": "RIGHT"
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "peasant1",
        "params": {
          "text": "What a view!",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 71: knight chases goblin across the area.
```json
{
  "id": "scene_71",
  "soundtrack": "battle",
  "background": "desert",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 200,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/alien/adult",
        "torso": "clothes/shortsleeve/tshirt_scoop/male",
        "legs": "pantaloons/male",
        "hair": "pigtails/adult",
        "hat": "helmet/horned/adult",
        "beards": "mustache"
      }
    },
    {
      "id": "goblin1",
      "position": {
        "x": 500,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve/female",
        "legs": "leggings2/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "knight1",
        "params": {
          "text": "Stop right there!",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "follow",
        "entityId": "knight1",
        "params": {
          "targetId": "goblin1",
          "duration": 2000,
          "speed": 1.8
        }
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "goblin1",
        "params": {
          "targetId": "knight1",
          "duration": 2500,
          "speed": 2
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "knight1",
        "params": {
          "emote": "angry",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 72: knight and orc engage in a dramatic duel.
```json
{
  "id": "scene_72",
  "soundtrack": "battle",
  "background": "forest",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 300,
        "y": 400
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt_scoop/female",
        "legs": "formal_striped/thin",
        "hair": "balding/adult",
        "weapon": "magic/wand/female"
      }
    },
    {
      "id": "orc1",
      "position": {
        "x": 700,
        "y": 400
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/boarman/adult",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "shorts/short_shorts/thin",
        "feet": "boots/revised/thin",
        "hat": "pirate/bandana/adult",
        "weapon": "magic/wand/female"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "knight1",
            "params": {
              "destination": {
                "x": 480,
                "y": 400
              }
            }
          },
          {
            "type": "action",
            "name": "move",
            "entityId": "orc1",
            "params": {
              "destination": {
                "x": 550,
                "y": 400
              }
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "knight1",
        "params": {
          "targetId": "orc1",
          "weapon": "punch"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "orc1",
        "params": {
          "targetId": "knight1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "knight1",
            "params": {
              "direction": {
                "x": -1,
                "y": 0
              },
              "strength": 60
            }
          },
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "orc1",
            "params": {
              "direction": {
                "x": 1,
                "y": 0
              },
              "strength": 60
            }
          }
        ]
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "orc1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          }
        ]
      }
    ]
  }
}
```

## Example 73: rogue, mage, and knight have a dance party.
```json
{
  "id": "scene_73",
  "soundtrack": "dance",
  "background": "park",
  "entities": [
    {
      "id": "rogue1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless1/male",
        "legs": "shorts/short_shorts/male",
        "feet": "boots/rimmed/male",
        "hat": "helmet/barbuta/male",
        "facial": "glasses/nerd/adult",
        "beards": "beard",
        "shield": "heater/revised/pattern/cross",
        "arms": "gloves/male"
      }
    },
    {
      "id": "mage1",
      "position": {
        "x": 500,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/boarman/adult",
        "torso": "clothes/shortsleeve/tshirt_scoop/female",
        "hair": "curly_short/adult",
        "feet": "boots/basic/thin"
      }
    },
    {
      "id": "knight1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve/male",
        "feet": "boots/revised/male",
        "hat": "formal/crown/adult",
        "beards": "mustache",
        "neck": "tie/necktie/male",
        "arms": "gloves/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "speak",
            "entityId": "rogue1",
            "params": {
              "text": "Let's dance!",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "mage1",
            "params": {
              "emote": "love",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "dance",
            "entityId": "rogue1",
            "params": {
              "duration": 3000
            }
          },
          {
            "type": "action",
            "name": "dance",
            "entityId": "mage1",
            "params": {
              "duration": 3000
            }
          },
          {
            "type": "action",
            "name": "dance",
            "entityId": "knight1",
            "params": {
              "duration": 3000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 74: thief sneaks up and steals a scroll from guard.
```json
{
  "id": "scene_74",
  "background": "mountain",
  "entities": [
    {
      "id": "thief1",
      "position": {
        "x": 800,
        "y": 430
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "aprons/suspenders/female",
        "legs": "formal_striped/thin",
        "feet": "boots/basic/thin"
      }
    },
    {
      "id": "guard1",
      "position": {
        "x": 400,
        "y": 430
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt_buttoned/male",
        "legs": "cuffed/male",
        "hair": "jewfro/adult",
        "feet": "boots/basic/male"
      }
    },
    {
      "id": "scroll1",
      "position": {
        "x": 380,
        "y": 450
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "triangle",
      "color": "#00b894ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "crouch",
        "entityId": "thief1",
        "params": {
          "duration": 800
        }
      },
      {
        "type": "action",
        "name": "crawl",
        "entityId": "thief1",
        "params": {
          "destination": {
            "x": 420,
            "y": 430
          }
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "thief1",
        "params": {
          "objectId": "scroll1",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "thief1",
        "params": {
          "targetId": "guard1",
          "duration": 2000,
          "speed": 2
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "guard1",
        "params": {
          "emote": "surprise",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 75: A solemn scene: friends mourn a fallen warrior.
```json
{
  "id": "scene_75",
  "soundtrack": "calm",
  "background": "mountain",
  "entities": [
    {
      "id": "friend1",
      "position": {
        "x": 350,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless2_buttoned/male",
        "legs": "formal/male",
        "hair": "unkempt/adult",
        "feet": "boots/fold/male",
        "beards": "beard"
      }
    },
    {
      "id": "hero1",
      "position": {
        "x": 500,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/troll/adult",
        "torso": "aprons/suspenders/male",
        "legs": "leggings/male",
        "hair": "bedhead/adult",
        "feet": "shoes/basic/male",
        "hat": "magic/wizard/base/adult",
        "weapon": "magic/wand/male"
      }
    },
    {
      "id": "knight1",
      "position": {
        "x": 650,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/shortsleeve_cardigan/male",
        "hair": "shorthawk/adult",
        "feet": "shoes/ghillies/male",
        "hat": "cloth/bandana2/adult",
        "weapon": "magic/wand/female"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "friend1",
            "params": {
              "direction": "DOWN"
            }
          },
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "hero1",
            "params": {
              "direction": "DOWN"
            }
          },
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "knight1",
            "params": {
              "direction": "DOWN"
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 1500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "friend1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "hero1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "hero1",
        "params": {
          "text": "Rest in peace.",
          "duration": 2000
        }
      }
    ]
  }
}
```

## Example 76: hero and mage race to the finish line.
```json
{
  "id": "scene_76",
  "soundtrack": "dance",
  "background": "beach",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 150,
        "y": 380
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2/female",
        "legs": "formal/thin",
        "hair": "dreadlocks_short/adult"
      }
    },
    {
      "id": "mage1",
      "position": {
        "x": 150,
        "y": 460
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/female",
        "legs": "hose/thin",
        "hair": "buzzcut/adult",
        "feet": "shoes/basic/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "hero1",
        "params": {
          "text": "Ready... Go!",
          "duration": 1200
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "hero1",
            "params": {
              "destination": {
                "x": 850,
                "y": 380
              },
              "speed": 1.8
            }
          },
          {
            "type": "action",
            "name": "move",
            "entityId": "mage1",
            "params": {
              "destination": {
                "x": 850,
                "y": 460
              },
              "speed": 1.5
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "hero1",
        "params": {
          "emote": "laugh",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "mage1",
        "params": {
          "text": "I'll win next time!",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 77: knight juggles objects by picking up and throwing them.
```json
{
  "id": "scene_77",
  "background": "desert",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 500,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt_scoop/female",
        "feet": "boots/fold/thin"
      }
    },
    {
      "id": "ball_a",
      "position": {
        "x": 480,
        "y": 460
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "capsule",
      "color": "#4ecdc4ff"
    },
    {
      "id": "ball_b",
      "position": {
        "x": 520,
        "y": 460
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "rectangle",
      "color": "#4ecdc4ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "knight1",
        "params": {
          "objectId": "ball_a",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "knight1",
        "params": {
          "objectId": "ball_a",
          "target": {
            "x": 700,
            "y": 300
          },
          "arcHeight": 80
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 400
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "knight1",
        "params": {
          "objectId": "ball_b",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "knight1",
        "params": {
          "objectId": "ball_b",
          "target": {
            "x": 300,
            "y": 300
          },
          "arcHeight": 80
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "knight1",
        "params": {
          "emote": "laugh",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 78: villain ambushes hero from behind.
```json
{
  "id": "scene_78",
  "soundtrack": "battle",
  "background": "desert",
  "entities": [
    {
      "id": "villain1",
      "position": {
        "x": 800,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/female",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/male",
        "legs": "fur/male",
        "facial": "patches/eyepatch/ambi/adult"
      }
    },
    {
      "id": "hero1",
      "position": {
        "x": 400,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/wolf/male",
        "torso": "clothes/sleeveless/sleeveless1/male",
        "legs": "pantaloons/male",
        "hair": "plain/adult",
        "feet": "shoes/revised/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "faceDirection",
        "entityId": "hero1",
        "params": {
          "direction": "LEFT"
        }
      },
      {
        "type": "action",
        "name": "move",
        "entityId": "villain1",
        "params": {
          "destination": {
            "x": 470,
            "y": 400
          }
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "villain1",
        "params": {
          "targetId": "hero1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "hero1",
            "params": {
              "direction": {
                "x": -1,
                "y": 0
              },
              "strength": 80
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "hero1",
            "params": {
              "emote": "surprise",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "villain1",
        "params": {
          "text": "Surprise!",
          "duration": 1200
        }
      }
    ]
  }
}
```

## Example 79: guard escorts cleric safely across the battlefield.
```json
{
  "id": "scene_79",
  "soundtrack": "calm",
  "background": "city",
  "entities": [
    {
      "id": "guard1",
      "position": {
        "x": 200,
        "y": 430
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/lizard/male",
        "torso": "clothes/longsleeve/longsleeve2_vneck/female",
        "legs": "pantaloons/thin",
        "hair": "longhawk/adult",
        "feet": "boots/basic/thin"
      }
    },
    {
      "id": "cleric1",
      "position": {
        "x": 250,
        "y": 430
      },
      "scale": 1.8,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "armour/plate/female",
        "legs": "leggings2/thin",
        "hair": "swoop/adult"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "guard1",
        "params": {
          "text": "Stay close.",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "guard1",
            "params": {
              "destination": {
                "x": 750,
                "y": 430
              }
            }
          },
          {
            "type": "action",
            "name": "follow",
            "entityId": "cleric1",
            "params": {
              "targetId": "guard1",
              "duration": 4000,
              "speed": 1
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "guard1",
        "params": {
          "text": "We're safe now.",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "cleric1",
        "params": {
          "emote": "love",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 80: knight and rogue rest around a campfire.
```json
{
  "id": "scene_80",
  "soundtrack": "calm",
  "background": "forest",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 380,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless2_vneck/male",
        "legs": "fur/male",
        "hair": "ponytail/adult/fg",
        "weapon": "magic/wand/male",
        "arms": "gloves/male"
      }
    },
    {
      "id": "rogue1",
      "position": {
        "x": 620,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/male",
        "torso": "clothes/sleeveless/sleeveless2_buttoned/male",
        "legs": "pants2/male",
        "hair": "ponytail/adult/fg",
        "feet": "boots/rimmed/male",
        "facial": "glasses/sunglasses/adult"
      }
    },
    {
      "id": "campfire1",
      "position": {
        "x": 500,
        "y": 460
      },
      "scale": 0.6,
      "isObject": true,
      "shape": "cylinder",
      "color": "#6c5ce7ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "knight1",
            "params": {
              "targetId": "rogue1"
            }
          },
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "rogue1",
            "params": {
              "targetId": "knight1"
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "knight1",
        "params": {
          "text": "Long day, huh?",
          "duration": 2000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "rogue1",
        "params": {
          "text": "Yeah, let's rest here.",
          "duration": 2000
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "zzz",
              "duration": 2500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "rogue1",
            "params": {
              "emote": "zzz",
              "duration": 2500
            }
          }
        ]
      }
    ]
  }
}
```

## Example 81: A knight walks over and picks up a apple.
```json
{
  "id": "scene_81",
  "background": "desert",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 324,
        "y": 425
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt/female",
        "legs": "fur/thin"
      }
    },
    {
      "id": "apple1",
      "position": {
        "x": 547,
        "y": 426
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "heart",
      "color": "#ffe66dff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "move",
        "entityId": "knight1",
        "params": {
          "destination": {
            "x": 527,
            "y": 426
          }
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "knight1",
        "params": {
          "objectId": "apple1",
          "attachmentPoint": "hand"
        }
      }
    ]
  }
}
```

## Example 82: A mage throws a bottle at a peasant.
```json
{
  "id": "scene_82",
  "background": "city",
  "entities": [
    {
      "id": "mage1",
      "position": {
        "x": 209,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/sleeveless/sleeveless2/female",
        "legs": "leggings2/thin",
        "hair": "bangs/adult"
      }
    },
    {
      "id": "peasant1",
      "position": {
        "x": 892,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/shortsleeve_polo/male",
        "hair": "jewfro/adult",
        "feet": "shoes/revised/male",
        "hat": "helmet/close/male"
      }
    },
    {
      "id": "bottle1",
      "position": {
        "x": 348,
        "y": 450
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "rectangle",
      "color": "#457b9dff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "mage1",
        "params": {
          "objectId": "bottle1"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "mage1",
        "params": {
          "targetId": "peasant1"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "mage1",
        "params": {
          "objectId": "bottle1",
          "target": {
            "x": 860,
            "y": 400
          },
          "arcHeight": 43
        }
      },
      {
        "type": "action",
        "name": "knockBack",
        "entityId": "peasant1",
        "params": {
          "direction": {
            "x": 1,
            "y": 0
          },
          "strength": 52
        }
      }
    ]
  },
  "soundtrack": "dance"
}
```

## Example 83: cleric and scout have a friendly conversation.
```json
{
  "id": "scene_83",
  "background": "park",
  "entities": [
    {
      "id": "cleric1",
      "position": {
        "x": 400,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/male",
        "torso": "clothes/longsleeve/scoop/female",
        "legs": "shorts/shorts/thin",
        "weapon": "magic/wand/female",
        "shield": "heater/revised/pattern/cross"
      }
    },
    {
      "id": "scout1",
      "position": {
        "x": 620,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless1/male",
        "legs": "cuffed/male",
        "hair": "natural/adult",
        "feet": "boots/fold/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "cleric1",
        "params": {
          "targetId": "scout1"
        }
      },
      {
        "type": "action",
        "name": "turnTowards",
        "entityId": "scout1",
        "params": {
          "targetId": "cleric1"
        }
      },
      {
        "type": "action",
        "name": "wave",
        "entityId": "cleric1",
        "params": {
          "targetId": "scout1",
          "waves": 2
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "scout1",
        "params": {
          "text": "Need help?",
          "duration": 2000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "speak",
            "entityId": "cleric1",
            "params": {
              "text": "I can manage, thanks.",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "cleric1",
            "params": {
              "emote": "angry",
              "duration": 2000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 84: An attack happens: orc_chief strikes scout, who flees.
```json
{
  "id": "scene_84",
  "soundtrack": "battle",
  "background": "mountain",
  "entities": [
    {
      "id": "orc_chief1",
      "position": {
        "x": 400,
        "y": 349
      },
      "scale": 2.5,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve_cardigan/female",
        "legs": "formal/thin",
        "hair": "parted/adult",
        "shield": "heater/revised/pattern/chevron"
      }
    },
    {
      "id": "scout1",
      "position": {
        "x": 620,
        "y": 382
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2_vneck/male",
        "legs": "formal_striped/male",
        "hair": "pixie/adult",
        "feet": "boots/fold/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "move",
        "entityId": "orc_chief1",
        "params": {
          "destination": {
            "x": 560,
            "y": 400
          }
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "orc_chief1",
        "params": {
          "targetId": "scout1",
          "weapon": "gun"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "scout1",
            "params": {
              "direction": {
                "x": 1,
                "y": 0
              },
              "strength": 100
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "scout1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "scout1",
        "params": {
          "targetId": "orc_chief1",
          "duration": 2000,
          "speed": 1.5
        }
      }
    ]
  }
}
```

## Example 85: hero casts a healing spell on the injured knight.
```json
{
  "id": "scene_85",
  "soundtrack": "mystical",
  "background": "forest",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 300,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/scoop/male",
        "legs": "leggings2/male",
        "hair": "dreadlocks_long/adult",
        "feet": "boots/revised/male",
        "hat": "formal/bowler/adult"
      }
    },
    {
      "id": "knight1",
      "position": {
        "x": 520,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/lizard/female",
        "torso": "clothes/sleeveless/sleeveless1/male",
        "legs": "leggings/male",
        "hair": "curtains/adult",
        "feet": "slippers/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "heal",
        "entityId": "hero1",
        "params": {
          "targetId": "knight1",
          "amount": 35,
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "love",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "oscillate",
            "entityId": "knight1",
            "params": {
              "amplitude": 5,
              "frequency": 10,
              "duration": 1000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 86: A scout crawls to a location and falls asleep.
```json
{
  "id": "scene_86",
  "soundtrack": "calm",
  "background": "park",
  "entities": [
    {
      "id": "scout1",
      "position": {
        "x": 200,
        "y": 300
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/lizard/female",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "shorts/shorts/thin",
        "hair": "bangs/adult",
        "feet": "slippers/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "crouch",
        "entityId": "scout1",
        "params": {
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "crawl",
        "entityId": "scout1",
        "params": {
          "destination": {
            "x": 421,
            "y": 429
          }
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "sleep",
        "entityId": "scout1",
        "params": {
          "duration": 5000
        }
      }
    ]
  }
}
```

## Example 87: knight patrols an area with physics active.
```json
{
  "id": "scene_87",
  "background": "mountain",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 400,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/female",
        "torso": "clothes/longsleeve/longsleeve2_cardigan/male",
        "legs": "fur/male",
        "hair": "long_messy/adult",
        "feet": "boots/fold/male",
        "facial": "glasses/glasses/adult",
        "weapon": "magic/wand/female"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "jump",
        "entityId": "knight1",
        "params": {
          "height": 81,
          "distance": 49
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "patrol",
        "entityId": "knight1",
        "params": {
          "pointA": {
            "x": 400,
            "y": 450
          },
          "pointB": {
            "x": 675,
            "y": 450
          },
          "laps": 2,
          "pauseAtEnds": 500
        }
      }
    ]
  }
}
```

## Example 88: A orb spawns, rotates, and fades away.
```json
{
  "id": "scene_88",
  "background": "beach",
  "entities": [],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "spawn",
        "params": {
          "entityId": "magic_obj",
          "x": 652,
          "y": 325,
          "scale": 0.5,
          "isObject": true,
          "shape": "cylinder",
          "color": "#c4e538ff"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "rotate",
            "entityId": "magic_obj",
            "params": {
              "angle": 454,
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "oscillate",
            "entityId": "magic_obj",
            "params": {
              "amplitude": 20,
              "duration": 2000
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "fade",
        "entityId": "magic_obj",
        "params": {
          "targetAlpha": 0,
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "despawn",
        "params": {
          "entityId": "magic_obj"
        }
      }
    ]
  }
}
```

## Example 89: mage gives a scroll to peasant.
```json
{
  "id": "scene_89",
  "background": "desert",
  "entities": [
    {
      "id": "mage1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2_polo/female",
        "legs": "leggings/thin",
        "hair": "buzzcut/adult",
        "feet": "slippers/thin",
        "shield": "heater/original/paint"
      }
    },
    {
      "id": "peasant1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/zombie/adult",
        "torso": "armour/plate/male",
        "legs": "hose/male",
        "hair": "plain/adult",
        "feet": "sandals/male"
      }
    },
    {
      "id": "scroll1",
      "position": {
        "x": 280,
        "y": 470
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "triangle",
      "color": "#f38181ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "mage1",
        "params": {
          "objectId": "scroll1"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "give",
        "entityId": "mage1",
        "params": {
          "objectId": "scroll1",
          "targetId": "peasant1",
          "reachDistance": 80
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "dance",
        "entityId": "peasant1",
        "params": {
          "duration": 2000
        }
      }
    ]
  }
}
```

## Example 90: knight wanders randomly and then speaks.
```json
{
  "id": "scene_90",
  "background": "desert",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 526,
        "y": 311
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/male",
        "torso": "clothes/longsleeve/longsleeve2_cardigan/female",
        "legs": "formal/thin",
        "hair": "messy1/adult",
        "feet": "boots/revised/thin",
        "shield": "heater/revised/pattern/chevron"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "wander",
        "entityId": "knight1",
        "params": {
          "area": {
            "x": 400,
            "y": 200,
            "width": 400,
            "height": 400
          },
          "duration": 3000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "faceDirection",
        "entityId": "knight1",
        "params": {
          "direction": "RIGHT"
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "knight1",
        "params": {
          "text": "I'm lost.",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 91: hunter chases villain across the area.
```json
{
  "id": "scene_91",
  "soundtrack": "battle",
  "background": "beach",
  "entities": [
    {
      "id": "hunter1",
      "position": {
        "x": 200,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt_scoop/male",
        "hair": "twists_straight/adult",
        "facial": "glasses/halfmoon/adult"
      }
    },
    {
      "id": "villain1",
      "position": {
        "x": 500,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/alien/adult",
        "torso": "clothes/shortsleeve/tshirt/female",
        "legs": "pantaloons/thin",
        "hair": "longhawk/adult"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "hunter1",
        "params": {
          "text": "Stop right there!",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "follow",
        "entityId": "hunter1",
        "params": {
          "targetId": "villain1",
          "duration": 2000,
          "speed": 1.8
        }
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "villain1",
        "params": {
          "targetId": "hunter1",
          "duration": 2500,
          "speed": 2
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "hunter1",
        "params": {
          "emote": "angry",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 92: hero and villain engage in a dramatic duel.
```json
{
  "id": "scene_92",
  "soundtrack": "battle",
  "background": "forest",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 300,
        "y": 400
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "armour/legion/female",
        "legs": "cuffed/thin",
        "hat": "helmet/horned/adult",
        "neck": "tie/necktie/male"
      }
    },
    {
      "id": "villain1",
      "position": {
        "x": 700,
        "y": 400
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless2/male",
        "legs": "formal/male",
        "hair": "buzzcut/adult",
        "hat": "helmet/horned/adult",
        "shield": "heater/original/wood"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "hero1",
            "params": {
              "destination": {
                "x": 480,
                "y": 400
              }
            }
          },
          {
            "type": "action",
            "name": "move",
            "entityId": "villain1",
            "params": {
              "destination": {
                "x": 550,
                "y": 400
              }
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "hero1",
        "params": {
          "targetId": "villain1",
          "weapon": "punch"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "villain1",
        "params": {
          "targetId": "hero1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "hero1",
            "params": {
              "direction": {
                "x": -1,
                "y": 0
              },
              "strength": 60
            }
          },
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "villain1",
            "params": {
              "direction": {
                "x": 1,
                "y": 0
              },
              "strength": 60
            }
          }
        ]
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "hero1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "villain1",
            "params": {
              "emote": "angry",
              "duration": 1500
            }
          }
        ]
      }
    ]
  }
}
```

## Example 93: mage, rogue, and guard have a dance party.
```json
{
  "id": "scene_93",
  "soundtrack": "dance",
  "background": "park",
  "entities": [
    {
      "id": "mage1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "armour/plate/male",
        "legs": "cuffed/male",
        "weapon": "magic/wand/female"
      }
    },
    {
      "id": "rogue1",
      "position": {
        "x": 500,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2_cardigan/female",
        "hair": "balding/adult",
        "feet": "boots/revised/thin",
        "hat": "helmet/barbuta/male",
        "shield": "heater/revised/wood"
      }
    },
    {
      "id": "guard1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/child",
        "torso": "clothes/shortsleeve/shortsleeve_polo/female",
        "hair": "pigtails/adult",
        "feet": "shoes/basic/thin",
        "facial": "glasses/secretary/adult"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "speak",
            "entityId": "mage1",
            "params": {
              "text": "Let's dance!",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "rogue1",
            "params": {
              "emote": "love",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "dance",
            "entityId": "mage1",
            "params": {
              "duration": 3000
            }
          },
          {
            "type": "action",
            "name": "dance",
            "entityId": "rogue1",
            "params": {
              "duration": 3000
            }
          },
          {
            "type": "action",
            "name": "dance",
            "entityId": "guard1",
            "params": {
              "duration": 3000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 94: thief sneaks up and steals a coin from mage.
```json
{
  "id": "scene_94",
  "background": "park",
  "entities": [
    {
      "id": "thief1",
      "position": {
        "x": 800,
        "y": 430
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2_polo/female",
        "legs": "pants/thin",
        "hair": "curly_short/adult",
        "feet": "sandals/thin",
        "facial": "glasses/nerd/adult"
      }
    },
    {
      "id": "mage1",
      "position": {
        "x": 400,
        "y": 430
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/scoop/male",
        "legs": "cuffed/male"
      }
    },
    {
      "id": "coin1",
      "position": {
        "x": 380,
        "y": 450
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "triangle",
      "color": "#c4e538ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "crouch",
        "entityId": "thief1",
        "params": {
          "duration": 800
        }
      },
      {
        "type": "action",
        "name": "crawl",
        "entityId": "thief1",
        "params": {
          "destination": {
            "x": 420,
            "y": 430
          }
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "thief1",
        "params": {
          "objectId": "coin1",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "action",
        "name": "flee",
        "entityId": "thief1",
        "params": {
          "targetId": "mage1",
          "duration": 2000,
          "speed": 2
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "mage1",
        "params": {
          "emote": "surprise",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 95: A solemn scene: friends mourn a fallen warrior.
```json
{
  "id": "scene_95",
  "soundtrack": "calm",
  "background": "forest",
  "entities": [
    {
      "id": "friend1",
      "position": {
        "x": 350,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/zombie/adult",
        "torso": "aprons/overalls/male",
        "legs": "pantaloons/male",
        "hair": "swoop/adult",
        "hat": "helmet/morion/adult",
        "beards": "mustache",
        "shield": "heater/revised/paint"
      }
    },
    {
      "id": "hero1",
      "position": {
        "x": 500,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/vampire/adult",
        "torso": "clothes/longsleeve/longsleeve2/male",
        "legs": "cuffed/male",
        "feet": "shoes/basic/male"
      }
    },
    {
      "id": "knight1",
      "position": {
        "x": 650,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/male",
        "torso": "clothes/longsleeve/longsleeve2_cardigan/male",
        "hair": "long_messy/adult",
        "weapon": "magic/wand/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "friend1",
            "params": {
              "direction": "DOWN"
            }
          },
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "hero1",
            "params": {
              "direction": "DOWN"
            }
          },
          {
            "type": "action",
            "name": "faceDirection",
            "entityId": "knight1",
            "params": {
              "direction": "DOWN"
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 1500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "friend1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "hero1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "knight1",
            "params": {
              "emote": "sweat",
              "duration": 2000
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "hero1",
        "params": {
          "text": "Rest in peace.",
          "duration": 2000
        }
      }
    ]
  }
}
```

## Example 96: scout and friend race to the finish line.
```json
{
  "id": "scene_96",
  "soundtrack": "dance",
  "background": "park",
  "entities": [
    {
      "id": "scout1",
      "position": {
        "x": 150,
        "y": 380
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/rabbit/adult",
        "torso": "clothes/longsleeve/longsleeve2/female",
        "legs": "shorts/shorts/thin",
        "feet": "boots/rimmed/thin"
      }
    },
    {
      "id": "friend1",
      "position": {
        "x": 150,
        "y": 460
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve_cardigan/female",
        "legs": "cuffed/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "scout1",
        "params": {
          "text": "Ready... Go!",
          "duration": 1200
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 300
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "scout1",
            "params": {
              "destination": {
                "x": 850,
                "y": 380
              },
              "speed": 1.8
            }
          },
          {
            "type": "action",
            "name": "move",
            "entityId": "friend1",
            "params": {
              "destination": {
                "x": 850,
                "y": 460
              },
              "speed": 1.5
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "scout1",
        "params": {
          "emote": "laugh",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "friend1",
        "params": {
          "text": "I'll win next time!",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 97: hero juggles objects by picking up and throwing them.
```json
{
  "id": "scene_97",
  "background": "forest",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 500,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless2/male",
        "legs": "hose/male",
        "hair": "unkempt/adult",
        "feet": "shoes/revised/male",
        "hat": "helmet/horned/adult",
        "facial": "glasses/halfmoon/adult",
        "weapon": "magic/wand/female",
        "shield": "heater/original/trim"
      }
    },
    {
      "id": "ball_a",
      "position": {
        "x": 480,
        "y": 460
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "circle",
      "color": "#fd79a8ff"
    },
    {
      "id": "ball_b",
      "position": {
        "x": 520,
        "y": 460
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "rectangle",
      "color": "#d62828ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "hero1",
        "params": {
          "objectId": "ball_a",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "hero1",
        "params": {
          "objectId": "ball_a",
          "target": {
            "x": 700,
            "y": 300
          },
          "arcHeight": 80
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 400
        }
      },
      {
        "type": "action",
        "name": "grab",
        "entityId": "hero1",
        "params": {
          "objectId": "ball_b",
          "attachmentPoint": "hand"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "hero1",
        "params": {
          "objectId": "ball_b",
          "target": {
            "x": 300,
            "y": 300
          },
          "arcHeight": 80
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "hero1",
        "params": {
          "emote": "laugh",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 98: orc ambushes hero from behind.
```json
{
  "id": "scene_98",
  "soundtrack": "battle",
  "background": "forest",
  "entities": [
    {
      "id": "orc1",
      "position": {
        "x": 800,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/child",
        "torso": "armour/plate/female",
        "legs": "pantaloons/thin",
        "feet": "boots/rimmed/thin"
      }
    },
    {
      "id": "hero1",
      "position": {
        "x": 400,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless2_buttoned/male",
        "legs": "leggings2/male",
        "hair": "long_messy/adult",
        "feet": "boots/basic/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "faceDirection",
        "entityId": "hero1",
        "params": {
          "direction": "LEFT"
        }
      },
      {
        "type": "action",
        "name": "move",
        "entityId": "orc1",
        "params": {
          "destination": {
            "x": 470,
            "y": 400
          }
        }
      },
      {
        "type": "action",
        "name": "attack",
        "entityId": "orc1",
        "params": {
          "targetId": "hero1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "hero1",
            "params": {
              "direction": {
                "x": -1,
                "y": 0
              },
              "strength": 80
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "hero1",
            "params": {
              "emote": "surprise",
              "duration": 1500
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "orc1",
        "params": {
          "text": "Surprise!",
          "duration": 1200
        }
      }
    ]
  }
}
```

## Example 99: guard escorts cleric safely across the battlefield.
```json
{
  "id": "scene_99",
  "soundtrack": "calm",
  "background": "desert",
  "entities": [
    {
      "id": "guard1",
      "position": {
        "x": 200,
        "y": 430
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt_buttoned/male",
        "legs": "pantaloons/male",
        "hair": "long_messy/adult"
      }
    },
    {
      "id": "cleric1",
      "position": {
        "x": 250,
        "y": 430
      },
      "scale": 1.8,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/child",
        "torso": "clothes/shortsleeve/tshirt_vneck/female",
        "hair": "lob/adult",
        "feet": "shoes/revised/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "speak",
        "entityId": "guard1",
        "params": {
          "text": "Stay close.",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "move",
            "entityId": "guard1",
            "params": {
              "destination": {
                "x": 750,
                "y": 430
              }
            }
          },
          {
            "type": "action",
            "name": "follow",
            "entityId": "cleric1",
            "params": {
              "targetId": "guard1",
              "duration": 4000,
              "speed": 1
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "guard1",
        "params": {
          "text": "We're safe now.",
          "duration": 1500
        }
      },
      {
        "type": "action",
        "name": "emote",
        "entityId": "cleric1",
        "params": {
          "emote": "love",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 100: mage and friend rest around a campfire.
```json
{
  "id": "scene_100",
  "soundtrack": "calm",
  "background": "forest",
  "entities": [
    {
      "id": "mage1",
      "position": {
        "x": 380,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/wolf/male",
        "torso": "aprons/suspenders/female",
        "legs": "formal_striped/thin",
        "hat": "cloth/bandana2/adult",
        "weapon": "magic/wand/female",
        "shield": "heater/original/pattern/cross"
      }
    },
    {
      "id": "friend1",
      "position": {
        "x": 620,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve/male",
        "legs": "formal/male",
        "feet": "shoes/ghillies/male",
        "neck": "tie/bowtie/adult"
      }
    },
    {
      "id": "campfire1",
      "position": {
        "x": 500,
        "y": 460
      },
      "scale": 0.6,
      "isObject": true,
      "shape": "heart",
      "color": "#c4e538ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "mage1",
            "params": {
              "targetId": "friend1"
            }
          },
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "friend1",
            "params": {
              "targetId": "mage1"
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "mage1",
        "params": {
          "text": "Long day, huh?",
          "duration": 2000
        }
      },
      {
        "type": "action",
        "name": "wait",
        "params": {
          "duration": 500
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "friend1",
        "params": {
          "text": "Yeah, let's rest here.",
          "duration": 2000
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "emote",
            "entityId": "mage1",
            "params": {
              "emote": "zzz",
              "duration": 2500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "friend1",
            "params": {
              "emote": "zzz",
              "duration": 2500
            }
          }
        ]
      }
    ]
  }
}
```
