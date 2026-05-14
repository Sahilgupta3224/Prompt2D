# Comprehensive Scene Examples (1-100)

Important patterns: parallel arrays for simultaneous effects, sequence arrays for chronological behavior, and explicit wait buffering.

## Example 1: A knight walks over and picks up a apple.
```json
{
  "id": "scene_1",
  "background": "desert",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 342,
        "y": 459
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve/female",
        "legs": "hose/thin"
      }
    },
    {
      "id": "apple1",
      "position": {
        "x": 563,
        "y": 459
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "cylinder",
      "color": "#e63946ff"
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
            "x": 543,
            "y": 459
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

## Example 2: A friend throws a coin at a knight.
```json
{
  "id": "scene_2",
  "background": "forest",
  "entities": [
    {
      "id": "friend1",
      "position": {
        "x": 326,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/goblin/adult",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/female",
        "legs": "pants/thin",
        "hair": "swoop/adult",
        "facial": "glasses/nerd/adult",
        "weapon": "magic/wand/female"
      }
    },
    {
      "id": "knight1",
      "position": {
        "x": 809,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve_polo/female"
      }
    },
    {
      "id": "coin1",
      "position": {
        "x": 326,
        "y": 450
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "rectangle",
      "color": "#ab83a1ff"
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "grab",
        "entityId": "friend1",
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
        "entityId": "friend1",
        "params": {
          "targetId": "knight1"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "friend1",
        "params": {
          "objectId": "coin1",
          "target": {
            "x": 860,
            "y": 400
          },
          "arcHeight": 46
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
          "strength": 69
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
  "background": "desert",
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
        "torso": "clothes/sleeveless/sleeveless2_buttoned/male",
        "legs": "leggings2/male",
        "hair": "unkempt/adult",
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
        "torso": "clothes/sleeveless/sleeveless2/female",
        "legs": "pants2/thin",
        "hair": "flat_top_fade/adult",
        "feet": "boots/rimmed/thin"
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

## Example 4: An attack happens: orc_chief strikes peasant, who flees.
```json
{
  "id": "scene_4",
  "soundtrack": "battle",
  "background": "desert",
  "entities": [
    {
      "id": "orc_chief1",
      "position": {
        "x": 400,
        "y": 350
      },
      "scale": 2.5,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/child",
        "torso": "armour/legion/female",
        "legs": "hose/thin",
        "feet": "shoes/basic/thin",
        "arms": "gloves/female"
      }
    },
    {
      "id": "peasant1",
      "position": {
        "x": 620,
        "y": 405
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2_cardigan/male",
        "legs": "formal/male",
        "hair": "unkempt/adult",
        "feet": "boots/basic/male"
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
          "targetId": "peasant1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "peasant1",
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
            "entityId": "peasant1",
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
        "entityId": "peasant1",
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

## Example 5: mage casts a healing spell on the injured rogue.
```json
{
  "id": "scene_5",
  "soundtrack": "mystical",
  "background": "mountain",
  "entities": [
    {
      "id": "mage1",
      "position": {
        "x": 300,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2/female",
        "legs": "pantaloons/thin",
        "feet": "boots/revised/thin"
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
        "torso": "aprons/overalls/female",
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
        "entityId": "mage1",
        "params": {
          "targetId": "rogue1",
          "amount": 59,
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

## Example 6: A scout crawls to a location and falls asleep.
```json
{
  "id": "scene_6",
  "soundtrack": "calm",
  "background": "forest",
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
        "head": "heads/human/female",
        "torso": "aprons/suspenders/female",
        "legs": "cuffed/thin",
        "feet": "shoes/ghillies/thin"
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
            "x": 407,
            "y": 396
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
        "torso": "clothes/sleeveless/sleeveless2_vneck/female",
        "legs": "leggings/thin",
        "hair": "bob/adult",
        "feet": "shoes/basic/thin",
        "weapon": "magic/wand/female",
        "neck": "tie/necktie/female"
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
          "height": 79,
          "distance": 56
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
            "x": 750,
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
          "x": 503,
          "y": 395,
          "scale": 0.5,
          "isObject": true,
          "shape": "heart",
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
              "angle": 787,
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

## Example 9: guard gives a potion to rogue.
```json
{
  "id": "scene_9",
  "background": "beach",
  "entities": [
    {
      "id": "guard1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/lizard/female",
        "torso": "clothes/sleeveless/sleeveless2_buttoned/male",
        "legs": "fur/male",
        "hair": "twists_fade/adult",
        "feet": "shoes/basic/male"
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
        "torso": "armour/plate/female",
        "legs": "shorts/short_shorts/thin",
        "feet": "boots/basic/thin"
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
      "color": "#e9c46aff"
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
        "entityId": "guard1",
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

## Example 10: rogue wanders randomly and then speaks.
```json
{
  "id": "scene_10",
  "background": "city",
  "entities": [
    {
      "id": "rogue1",
      "position": {
        "x": 515,
        "y": 335
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve_polo/female",
        "legs": "pantaloons/thin",
        "feet": "shoes/revised/thin",
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
          "direction": "RIGHT"
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "rogue1",
        "params": {
          "text": "Time to rest.",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 11: warrior chases goblin across the area.
```json
{
  "id": "scene_11",
  "soundtrack": "battle",
  "background": "city",
  "entities": [
    {
      "id": "warrior1",
      "position": {
        "x": 200,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "armour/plate/female",
        "legs": "formal_striped/thin",
        "hair": "longhawk/adult",
        "weapon": "magic/wand/female"
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
        "torso": "aprons/suspenders/female",
        "legs": "shorts/short_shorts/thin",
        "hair": "twists_straight/adult",
        "feet": "slippers/thin"
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

## Example 12: knight and orc engage in a dramatic duel.
```json
{
  "id": "scene_12",
  "soundtrack": "battle",
  "background": "desert",
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
        "feet": "sandals/thin"
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
        "head": "heads/troll/adult",
        "torso": "clothes/sleeveless/sleeveless2_vneck/female",
        "legs": "shorts/short_shorts/thin",
        "hair": "pixie/adult",
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

## Example 13: hero, mage, and peasant have a dance party.
```json
{
  "id": "scene_13",
  "soundtrack": "dance",
  "background": "beach",
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
        "torso": "clothes/shortsleeve/tshirt_scoop/female",
        "hair": "buzzcut/adult",
        "feet": "slippers/thin",
        "arms": "gloves/female"
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
        "body": "bodies/male",
        "head": "heads/wolf/female",
        "torso": "clothes/longsleeve/longsleeve2/male",
        "legs": "pantaloons/male",
        "hair": "twists_straight/adult",
        "hat": "magic/wizard/buckle/adult",
        "facial": "glasses/shades/adult",
        "beards": "beard",
        "arms": "gloves/male"
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
        "body": "bodies/female",
        "head": "heads/orc/female",
        "torso": "aprons/overalls/female",
        "legs": "shorts/short_shorts/thin",
        "hair": "messy1/adult"
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
            "entityId": "peasant1",
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

## Example 14: villain sneaks up and steals a key from mage.
```json
{
  "id": "scene_14",
  "background": "city",
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
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/male",
        "legs": "hose/male",
        "hair": "curly_long/adult",
        "feet": "slippers/male",
        "facial": "masks/plain",
        "neck": "tie/bowtie2/adult"
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
        "torso": "clothes/shortsleeve/shortsleeve_polo/male",
        "legs": "pantaloons/male",
        "feet": "slippers/male"
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
      "color": "#023e8aff"
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

## Example 15: A solemn scene: friends mourn a fallen warrior.
```json
{
  "id": "scene_15",
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
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/male",
        "legs": "leggings/male",
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
        "torso": "clothes/shortsleeve/shortsleeve/male",
        "hair": "long_messy/adult",
        "feet": "sandals/male",
        "hat": "pirate/tricorne/basic/adult"
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
        "head": "heads/lizard/male",
        "torso": "clothes/sleeveless/sleeveless1/female",
        "legs": "cuffed/thin",
        "hair": "pigtails/adult",
        "feet": "boots/fold/thin"
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

## Example 16: hero and friend race to the finish line.
```json
{
  "id": "scene_16",
  "soundtrack": "dance",
  "background": "park",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 150,
        "y": 380
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/lizard/female",
        "torso": "aprons/suspenders/male",
        "legs": "formal/male",
        "hair": "curly_short/adult",
        "feet": "slippers/male"
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
        "torso": "clothes/shortsleeve/tshirt/male",
        "legs": "leggings2/male"
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
        "entityId": "hero1",
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

## Example 17: knight juggles objects by picking up and throwing them.
```json
{
  "id": "scene_17",
  "background": "mountain",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 500,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless2_vneck/male",
        "legs": "pants/male",
        "hair": "mop/adult",
        "feet": "boots/fold/male",
        "neck": "tie/bowtie/adult"
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
      "shape": "rectangle",
      "color": "#f38181ff"
    },
    {
      "id": "ball_b",
      "position": {
        "x": 520,
        "y": 460
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "triangle",
      "color": "#457b9dff"
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

## Example 18: goblin ambushes peasant from behind.
```json
{
  "id": "scene_18",
  "soundtrack": "battle",
  "background": "forest",
  "entities": [
    {
      "id": "goblin1",
      "position": {
        "x": 800,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/sleeveless/sleeveless2/female",
        "legs": "pants2/thin",
        "hair": "swoop/adult",
        "feet": "boots/basic/thin",
        "facial": "glasses/round/adult"
      }
    },
    {
      "id": "peasant1",
      "position": {
        "x": 400,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/female",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/male",
        "legs": "shorts/shorts/male",
        "hair": "bob/adult",
        "feet": "shoes/ghillies/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "faceDirection",
        "entityId": "peasant1",
        "params": {
          "direction": "LEFT"
        }
      },
      {
        "type": "action",
        "name": "move",
        "entityId": "goblin1",
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
        "entityId": "goblin1",
        "params": {
          "targetId": "peasant1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "peasant1",
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
            "entityId": "peasant1",
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
        "entityId": "goblin1",
        "params": {
          "text": "Surprise!",
          "duration": 1200
        }
      }
    ]
  }
}
```

## Example 19: knight escorts cleric safely across the battlefield.
```json
{
  "id": "scene_19",
  "soundtrack": "calm",
  "background": "park",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 200,
        "y": 430
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2_vneck/female"
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
        "torso": "clothes/shortsleeve/tshirt_buttoned/male",
        "legs": "leggings2/male",
        "hair": "long/adult"
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
            "entityId": "knight1",
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
              "targetId": "knight1",
              "duration": 4000,
              "speed": 1
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "knight1",
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

## Example 20: knight and friend rest around a campfire.
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
        "head": "heads/orc/child",
        "torso": "aprons/overalls/female",
        "legs": "hose/thin",
        "hair": "pixie/adult",
        "hat": "holiday/christmas/adult"
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
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "leggings2/thin",
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
      "shape": "star",
      "color": "#fd79a8ff"
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

## Example 21: A knight walks over and picks up a apple.
```json
{
  "id": "scene_21",
  "background": "desert",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 297,
        "y": 430
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2_vneck/female",
        "legs": "leggings/thin"
      }
    },
    {
      "id": "apple1",
      "position": {
        "x": 578,
        "y": 465
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "square",
      "color": "#023e8aff"
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
            "x": 558,
            "y": 465
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

## Example 22: A hero throws a bottle at a scout.
```json
{
  "id": "scene_22",
  "background": "beach",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 347,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "formal_striped/thin",
        "hair": "long/adult"
      }
    },
    {
      "id": "scout1",
      "position": {
        "x": 800,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/wolf/male",
        "torso": "armour/legion/female",
        "legs": "leggings2/thin",
        "feet": "boots/basic/thin",
        "shield": "heater/original/pattern/chevron"
      }
    },
    {
      "id": "bottle1",
      "position": {
        "x": 237,
        "y": 450
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "rectangle",
      "color": "#ffe66dff"
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
        "entityId": "hero1",
        "params": {
          "targetId": "scout1"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "hero1",
        "params": {
          "objectId": "bottle1",
          "target": {
            "x": 860,
            "y": 400
          },
          "arcHeight": 51
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
          "strength": 56
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
        "head": "heads/human/female",
        "torso": "armour/plate/female",
        "legs": "leggings2/thin",
        "feet": "shoes/revised/thin"
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
        "torso": "clothes/longsleeve/longsleeve2_cardigan/male",
        "legs": "shorts/short_shorts/male",
        "hair": "twists_fade/adult",
        "feet": "slippers/male",
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
              "emote": "surprise",
              "duration": 2000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 24: An attack happens: king strikes scout, who flees.
```json
{
  "id": "scene_24",
  "soundtrack": "battle",
  "background": "mountain",
  "entities": [
    {
      "id": "king1",
      "position": {
        "x": 400,
        "y": 364
      },
      "scale": 2.5,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/male",
        "torso": "clothes/longsleeve/longsleeve2/male",
        "legs": "formal/male",
        "feet": "slippers/male"
      }
    },
    {
      "id": "scout1",
      "position": {
        "x": 620,
        "y": 410
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/rabbit/adult",
        "torso": "clothes/sleeveless/sleeveless2_vneck/female",
        "legs": "fur/thin",
        "hair": "messy1/adult",
        "feet": "sandals/thin"
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
          "targetId": "scout1",
          "weapon": "punch"
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
          "targetId": "king1",
          "duration": 2000,
          "speed": 1.5
        }
      }
    ]
  }
}
```

## Example 25: sage casts a healing spell on the injured knight.
```json
{
  "id": "scene_25",
  "soundtrack": "mystical",
  "background": "beach",
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
        "torso": "clothes/sleeveless/sleeveless2/female",
        "legs": "shorts/short_shorts/thin",
        "hair": "bedhead/adult",
        "hat": "helmet/barbuta/male"
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
        "head": "heads/zombie/adult",
        "torso": "clothes/shortsleeve/shortsleeve_polo/male",
        "legs": "formal/male",
        "hair": "balding/adult"
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
          "targetId": "knight1",
          "amount": 45,
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
        "head": "heads/orc/female",
        "torso": "clothes/longsleeve/longsleeve2_polo/female",
        "legs": "pants2/thin",
        "hair": "curly_long/adult",
        "feet": "boots/basic/thin"
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
            "x": 414,
            "y": 443
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

## Example 27: soldier patrols an area with physics active.
```json
{
  "id": "scene_27",
  "background": "desert",
  "entities": [
    {
      "id": "soldier1",
      "position": {
        "x": 400,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt/female",
        "legs": "pantaloons/thin",
        "hair": "high_and_tight/adult",
        "feet": "boots/rimmed/thin",
        "hat": "cloth/leather_cap/adult"
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
          "height": 94,
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
        "entityId": "soldier1",
        "params": {
          "pointA": {
            "x": 400,
            "y": 450
          },
          "pointB": {
            "x": 756,
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
  "background": "forest",
  "entities": [],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "spawn",
        "params": {
          "entityId": "magic_obj",
          "x": 647,
          "y": 364,
          "scale": 0.5,
          "isObject": true,
          "shape": "capsule",
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
              "angle": 923,
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

## Example 29: hero gives a scroll to friend.
```json
{
  "id": "scene_29",
  "background": "forest",
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
        "torso": "clothes/longsleeve/longsleeve2/female",
        "legs": "pantaloons/thin",
        "hair": "swoop/adult",
        "feet": "shoes/ghillies/thin",
        "weapon": "magic/wand/female"
      }
    },
    {
      "id": "friend1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/sleeveless/sleeveless2_vneck/female",
        "legs": "fur/thin",
        "hair": "plain/adult",
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
        "entityId": "hero1",
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
        "entityId": "hero1",
        "params": {
          "objectId": "scroll1",
          "targetId": "friend1",
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
        "entityId": "friend1",
        "params": {
          "duration": 2000
        }
      }
    ]
  }
}
```

## Example 30: peasant wanders randomly and then speaks.
```json
{
  "id": "scene_30",
  "background": "forest",
  "entities": [
    {
      "id": "peasant1",
      "position": {
        "x": 641,
        "y": 364
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/sleeveless/sleeveless2_buttoned/female",
        "hat": "magic/wizard/buckle/adult",
        "facial": "glasses/nerd/adult"
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
          "text": "This place is strange.",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 31: guard chases thief across the area.
```json
{
  "id": "scene_31",
  "soundtrack": "battle",
  "background": "forest",
  "entities": [
    {
      "id": "guard1",
      "position": {
        "x": 200,
        "y": 420
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt_buttoned/male",
        "legs": "leggings2/male",
        "hair": "unkempt/adult",
        "arms": "gloves/male"
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
        "body": "bodies/male",
        "head": "heads/wolf/male",
        "torso": "aprons/overalls/male",
        "legs": "shorts/shorts/male"
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

## Example 32: hero and villain engage in a dramatic duel.
```json
{
  "id": "scene_32",
  "soundtrack": "battle",
  "background": "desert",
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
        "head": "heads/zombie/adult",
        "torso": "clothes/longsleeve/longsleeve2/female",
        "legs": "pants/thin",
        "hair": "idol/adult",
        "feet": "boots/revised/thin",
        "facial": "glasses/sunglasses/adult",
        "arms": "gloves/female"
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
        "body": "bodies/female",
        "head": "heads/boarman/adult",
        "torso": "clothes/longsleeve/longsleeve2_vneck/female",
        "hair": "loose/adult",
        "feet": "shoes/revised/thin",
        "hat": "formal/crown/adult",
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

## Example 33: mage, peasant, and hero have a dance party.
```json
{
  "id": "scene_33",
  "soundtrack": "dance",
  "background": "city",
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
        "torso": "clothes/shortsleeve/shortsleeve_polo/female",
        "legs": "fur/thin",
        "hair": "parted/adult",
        "facial": "glasses/halfmoon/adult"
      }
    },
    {
      "id": "peasant1",
      "position": {
        "x": 500,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt_buttoned/female",
        "hair": "idol/adult",
        "feet": "shoes/revised/thin"
      }
    },
    {
      "id": "hero1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/child",
        "torso": "aprons/overalls/female",
        "legs": "pants/thin",
        "hair": "flat_top_fade/adult",
        "feet": "boots/basic/thin",
        "facial": "monocle/right/adult",
        "shield": "heater/revised/paint"
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
            "entityId": "peasant1",
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
            "entityId": "peasant1",
            "params": {
              "duration": 3000
            }
          },
          {
            "type": "action",
            "name": "dance",
            "entityId": "hero1",
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

## Example 34: villain sneaks up and steals a gem from guard.
```json
{
  "id": "scene_34",
  "background": "desert",
  "entities": [
    {
      "id": "villain1",
      "position": {
        "x": 800,
        "y": 430
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/lizard/female",
        "torso": "clothes/shortsleeve/shortsleeve_cardigan/female",
        "legs": "pantaloons/thin",
        "hair": "dreadlocks_long/adult",
        "shield": "heater/revised/pattern/chevron",
        "arms": "gloves/female"
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
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/sleeveless/sleeveless2_buttoned/female",
        "legs": "formal/thin",
        "hair": "balding/adult",
        "feet": "slippers/thin"
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
      "color": "#95e1d3ff"
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
        "torso": "clothes/longsleeve/longsleeve/male",
        "legs": "cuffed/male",
        "hair": "long/adult",
        "feet": "shoes/ghillies/male"
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
        "hair": "jewfro/adult",
        "feet": "boots/basic/male",
        "weapon": "magic/wand/male",
        "neck": "tie/bowtie2/adult"
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
        "torso": "clothes/shortsleeve/shortsleeve/male",
        "hair": "pigtails/adult"
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
  "background": "desert",
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
        "torso": "clothes/shortsleeve/shortsleeve_polo/male",
        "legs": "pantaloons/male",
        "feet": "shoes/revised/male"
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
        "torso": "armour/legion/female",
        "legs": "shorts/short_shorts/thin"
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

## Example 37: knight juggles objects by picking up and throwing them.
```json
{
  "id": "scene_37",
  "background": "park",
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
        "head": "heads/goblin/adult",
        "torso": "clothes/sleeveless/sleeveless1/female",
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
      "color": "#2a9d8fff"
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

## Example 38: orc ambushes hero from behind.
```json
{
  "id": "scene_38",
  "soundtrack": "battle",
  "background": "mountain",
  "entities": [
    {
      "id": "orc1",
      "position": {
        "x": 800,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/lizard/male",
        "torso": "clothes/longsleeve/longsleeve/male",
        "legs": "pants2/male",
        "hair": "page/adult",
        "feet": "shoes/revised/male"
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
        "torso": "clothes/sleeveless/sleeveless2/female",
        "hair": "flat_top_fade/adult",
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

## Example 39: knight escorts king safely across the battlefield.
```json
{
  "id": "scene_39",
  "soundtrack": "calm",
  "background": "desert",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 200,
        "y": 430
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2_cardigan/male",
        "legs": "formal_striped/male",
        "hair": "pigtails/adult",
        "feet": "boots/fold/male"
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
        "body": "bodies/female",
        "head": "heads/orc/child",
        "torso": "armour/plate/female",
        "legs": "fur/thin",
        "hair": "loose/adult",
        "feet": "boots/basic/thin"
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
            "entityId": "knight1",
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
              "targetId": "knight1",
              "duration": 4000,
              "speed": 1
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "knight1",
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

## Example 40: hero and rogue rest around a campfire.
```json
{
  "id": "scene_40",
  "soundtrack": "calm",
  "background": "forest",
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
        "torso": "clothes/shortsleeve/tshirt_vneck/male",
        "legs": "pants/male",
        "hair": "shorthawk/adult",
        "feet": "boots/fold/male",
        "shield": "heater/original/trim"
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
        "head": "heads/orc/child",
        "torso": "aprons/overalls/male",
        "legs": "pants/male",
        "hair": "high_and_tight/adult",
        "feet": "slippers/male",
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
      "shape": "heart",
      "color": "#264653ff"
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
              "targetId": "rogue1"
            }
          },
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "rogue1",
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
            "entityId": "hero1",
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

## Example 41: A knight walks over and picks up a apple.
```json
{
  "id": "scene_41",
  "background": "forest",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 178,
        "y": 433
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/mouse/adult",
        "torso": "clothes/shortsleeve/shortsleeve_polo/female",
        "legs": "leggings2/thin",
        "hair": "mop/adult"
      }
    },
    {
      "id": "apple1",
      "position": {
        "x": 353,
        "y": 438
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "square",
      "color": "#aa96daff"
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
            "x": 333,
            "y": 438
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

## Example 42: A mage throws a key at a knight.
```json
{
  "id": "scene_42",
  "background": "city",
  "entities": [
    {
      "id": "mage1",
      "position": {
        "x": 310,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt/male",
        "legs": "leggings2/male"
      }
    },
    {
      "id": "knight1",
      "position": {
        "x": 819,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/child",
        "torso": "clothes/sleeveless/sleeveless1/female",
        "hair": "ponytail/adult/fg",
        "feet": "boots/revised/thin"
      }
    },
    {
      "id": "key1",
      "position": {
        "x": 302,
        "y": 450
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "heart",
      "color": "#e9c46aff"
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
        "entityId": "mage1",
        "params": {
          "targetId": "knight1"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "mage1",
        "params": {
          "objectId": "key1",
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
        "entityId": "knight1",
        "params": {
          "direction": {
            "x": 1,
            "y": 0
          },
          "strength": 62
        }
      }
    ]
  }
}
```

## Example 43: knight and villain have a friendly conversation.
```json
{
  "id": "scene_43",
  "background": "beach",
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
        "torso": "clothes/sleeveless/sleeveless1/male",
        "legs": "leggings/male",
        "hair": "mop/adult",
        "feet": "shoes/basic/male",
        "facial": "glasses/shades/adult",
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
        "torso": "clothes/sleeveless/sleeveless2_buttoned/male",
        "legs": "pantaloons/male",
        "hair": "swoop/adult",
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
              "emote": "surprise",
              "duration": 2000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 44: An attack happens: knight strikes mage, who flees.
```json
{
  "id": "scene_44",
  "soundtrack": "battle",
  "background": "desert",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 400,
        "y": 354
      },
      "scale": 2.5,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/female",
        "legs": "shorts/short_shorts/thin",
        "hair": "longhawk/adult",
        "feet": "boots/fold/thin",
        "weapon": "magic/wand/female",
        "arms": "gloves/female"
      }
    },
    {
      "id": "mage1",
      "position": {
        "x": 620,
        "y": 440
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/sleeveless/sleeveless1/female",
        "legs": "formal_striped/thin",
        "hair": "jewfro/adult"
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
          "targetId": "mage1",
          "weapon": "gun"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "mage1",
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
            "entityId": "mage1",
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
        "entityId": "mage1",
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

## Example 45: hero casts a healing spell on the injured rogue.
```json
{
  "id": "scene_45",
  "soundtrack": "mystical",
  "background": "city",
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
        "torso": "clothes/longsleeve/longsleeve2_buttoned/female",
        "legs": "formal/thin",
        "feet": "shoes/ghillies/thin"
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
        "torso": "clothes/sleeveless/sleeveless2_buttoned/female",
        "legs": "pants2/thin",
        "hair": "idol/adult",
        "feet": "shoes/revised/thin"
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
          "targetId": "rogue1",
          "amount": 66,
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

## Example 46: A warrior crawls to a location and falls asleep.
```json
{
  "id": "scene_46",
  "soundtrack": "calm",
  "background": "park",
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
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt/female"
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
            "x": 401,
            "y": 427
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

## Example 47: peasant patrols an area with physics active.
```json
{
  "id": "scene_47",
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
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt/male",
        "legs": "formal_striped/male",
        "hair": "loose/adult",
        "feet": "boots/revised/male"
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
          "height": 67,
          "distance": 64
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
            "x": 746,
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
          "x": 745,
          "y": 338,
          "scale": 0.5,
          "isObject": true,
          "shape": "triangle",
          "color": "#6a0572ff"
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
              "angle": 375,
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

## Example 49: mage gives a sword to rogue.
```json
{
  "id": "scene_49",
  "background": "beach",
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
        "torso": "clothes/sleeveless/sleeveless2/male",
        "legs": "leggings2/male",
        "hair": "parted/adult",
        "facial": "glasses/nerd/adult",
        "shield": "heater/revised/pattern/chevron"
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
        "torso": "clothes/shortsleeve/tshirt_buttoned/male",
        "legs": "shorts/shorts/male",
        "feet": "boots/rimmed/male"
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
      "shape": "square",
      "color": "#4ecdc4ff"
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
        "entityId": "mage1",
        "params": {
          "objectId": "sword1",
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

## Example 50: rogue wanders randomly and then speaks.
```json
{
  "id": "scene_50",
  "background": "park",
  "entities": [
    {
      "id": "rogue1",
      "position": {
        "x": 625,
        "y": 329
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt_scoop/male",
        "legs": "fur/male",
        "hair": "curtains/adult",
        "feet": "boots/revised/male"
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
          "direction": "RIGHT"
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

## Example 51: knight chases thief across the area.
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
        "torso": "armour/plate/female",
        "legs": "formal/thin",
        "feet": "shoes/ghillies/thin",
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
        "torso": "clothes/sleeveless/sleeveless2_vneck/female",
        "legs": "pantaloons/thin",
        "hair": "bedhead/adult",
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

## Example 52: hero and villain engage in a dramatic duel.
```json
{
  "id": "scene_52",
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
        "head": "heads/orc/male",
        "torso": "clothes/longsleeve/longsleeve2_cardigan/female",
        "legs": "pants/thin",
        "hair": "pigtails/adult",
        "feet": "shoes/revised/thin",
        "hat": "cloth/leather_cap/adult",
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
        "torso": "clothes/longsleeve/longsleeve2/male",
        "legs": "hose/male",
        "hair": "ponytail/adult/fg",
        "feet": "sandals/male",
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

## Example 53: knight, friend, and guard have a dance party.
```json
{
  "id": "scene_53",
  "soundtrack": "dance",
  "background": "city",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/wolf/male",
        "torso": "clothes/sleeveless/sleeveless2/female",
        "legs": "cuffed/thin",
        "feet": "boots/rimmed/thin"
      }
    },
    {
      "id": "friend1",
      "position": {
        "x": 500,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless2/male",
        "legs": "pants2/male",
        "hair": "page/adult",
        "hat": "helmet/morion/adult",
        "weapon": "magic/wand/male",
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
        "head": "heads/wolf/female",
        "torso": "armour/legion/female",
        "legs": "shorts/shorts/thin",
        "hair": "idol/adult",
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
            "name": "speak",
            "entityId": "knight1",
            "params": {
              "text": "Let's dance!",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "friend1",
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
            "entityId": "knight1",
            "params": {
              "duration": 3000
            }
          },
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

## Example 54: rogue sneaks up and steals a key from mage.
```json
{
  "id": "scene_54",
  "background": "forest",
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
        "head": "heads/sheep/adult",
        "torso": "clothes/sleeveless/sleeveless2_vneck/male",
        "legs": "cuffed/male",
        "hair": "plain/adult",
        "feet": "boots/fold/male",
        "facial": "glasses/round/adult"
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
        "torso": "clothes/shortsleeve/tshirt/male",
        "legs": "shorts/shorts/male",
        "hair": "bedhead/adult",
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
      "shape": "heart",
      "color": "#264653ff"
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
        "entityId": "rogue1",
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

## Example 55: A solemn scene: friends mourn a fallen warrior.
```json
{
  "id": "scene_55",
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
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve/female",
        "hair": "mop/adult",
        "facial": "glasses/round/adult",
        "shield": "heater/original/pattern/cross",
        "neck": "tie/bowtie2/adult"
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
        "torso": "aprons/suspenders/female",
        "hair": "swoop/adult",
        "hat": "headband/thick/adult"
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
        "torso": "clothes/longsleeve/longsleeve2_polo/female",
        "legs": "pantaloons/thin",
        "feet": "boots/fold/thin"
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

## Example 56: warrior and mage race to the finish line.
```json
{
  "id": "scene_56",
  "soundtrack": "dance",
  "background": "park",
  "entities": [
    {
      "id": "warrior1",
      "position": {
        "x": 150,
        "y": 380
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "shorts/short_shorts/thin",
        "hair": "longhawk/adult",
        "feet": "boots/rimmed/thin"
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
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "aprons/suspenders/male",
        "legs": "shorts/shorts/male",
        "hair": "loose/adult",
        "feet": "shoes/revised/male"
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
            "entityId": "warrior1",
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
        "entityId": "warrior1",
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

## Example 57: hero juggles objects by picking up and throwing them.
```json
{
  "id": "scene_57",
  "background": "beach",
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
        "head": "heads/lizard/male",
        "torso": "clothes/longsleeve/longsleeve2_vneck/female",
        "legs": "leggings2/thin",
        "feet": "slippers/thin",
        "hat": "helmet/barbuta/male"
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
      "shape": "triangle",
      "color": "#aa96daff"
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
      "color": "#95e1d3ff"
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

## Example 58: orc ambushes peasant from behind.
```json
{
  "id": "scene_58",
  "soundtrack": "battle",
  "background": "desert",
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
        "torso": "aprons/suspenders/female",
        "legs": "formal/thin"
      }
    },
    {
      "id": "peasant1",
      "position": {
        "x": 400,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve2/female",
        "feet": "boots/rimmed/thin"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "faceDirection",
        "entityId": "peasant1",
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
          "targetId": "peasant1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "peasant1",
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
            "entityId": "peasant1",
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
        "torso": "clothes/longsleeve/longsleeve2_polo/female",
        "legs": "fur/thin",
        "hair": "jewfro/adult",
        "feet": "shoes/basic/thin",
        "hat": "pirate/tricorne/basic/adult"
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
        "torso": "aprons/suspenders/male",
        "legs": "hose/male",
        "hair": "pixie/adult",
        "feet": "sandals/male"
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

## Example 60: hero and guard rest around a campfire.
```json
{
  "id": "scene_60",
  "soundtrack": "calm",
  "background": "forest",
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
        "head": "heads/orc/male",
        "torso": "clothes/shortsleeve/shortsleeve_polo/male",
        "feet": "boots/rimmed/male",
        "hat": "cloth/bandana/adult",
        "facial": "patches/eyepatch/right/adult"
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
        "head": "heads/wolf/male",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "leggings/thin",
        "hair": "bob/adult",
        "hat": "cloth/bandana/adult"
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
      "shape": "rectangle",
      "color": "#f38181ff"
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
              "targetId": "guard1"
            }
          },
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "guard1",
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
            "entityId": "hero1",
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

## Example 61: A knight walks over and picks up a apple.
```json
{
  "id": "scene_61",
  "background": "forest",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 396,
        "y": 387
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt_buttoned/female",
        "legs": "formal_striped/thin",
        "hair": "lob/adult"
      }
    },
    {
      "id": "apple1",
      "position": {
        "x": 649,
        "y": 403
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "triangle",
      "color": "#f4a261ff"
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
            "x": 629,
            "y": 403
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

## Example 62: A rogue throws a coin at a peasant.
```json
{
  "id": "scene_62",
  "background": "desert",
  "entities": [
    {
      "id": "rogue1",
      "position": {
        "x": 257,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/male",
        "torso": "clothes/longsleeve/longsleeve2/female",
        "legs": "leggings2/thin",
        "hair": "messy1/adult",
        "feet": "boots/rimmed/thin",
        "weapon": "magic/wand/female"
      }
    },
    {
      "id": "peasant1",
      "position": {
        "x": 879,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve_cardigan/female",
        "legs": "fur/thin"
      }
    },
    {
      "id": "coin1",
      "position": {
        "x": 250,
        "y": 450
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "star",
      "color": "#ff6b6bff"
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
          "targetId": "peasant1"
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
          "arcHeight": 61
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
          "strength": 47
        }
      }
    ]
  }
}
```

## Example 63: guard and rogue have a friendly conversation.
```json
{
  "id": "scene_63",
  "background": "desert",
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
        "torso": "armour/plate/male",
        "legs": "formal_striped/male",
        "hair": "twists_straight/adult",
        "feet": "shoes/revised/male",
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
        "torso": "clothes/longsleeve/longsleeve2_buttoned/male",
        "legs": "pants/male",
        "hair": "unkempt/adult",
        "weapon": "magic/wand/male"
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
              "emote": "question",
              "duration": 2000
            }
          }
        ]
      }
    ]
  }
}
```

## Example 64: An attack happens: guard strikes scout, who flees.
```json
{
  "id": "scene_64",
  "soundtrack": "battle",
  "background": "city",
  "entities": [
    {
      "id": "guard1",
      "position": {
        "x": 400,
        "y": 336
      },
      "scale": 2.5,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/sleeveless/sleeveless2/female",
        "legs": "fur/thin",
        "feet": "boots/rimmed/thin"
      }
    },
    {
      "id": "scout1",
      "position": {
        "x": 620,
        "y": 393
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt_scoop/male",
        "legs": "formal_striped/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "move",
        "entityId": "guard1",
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
        "entityId": "guard1",
        "params": {
          "targetId": "scout1",
          "weapon": "punch"
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
          "targetId": "guard1",
          "duration": 2000,
          "speed": 1.5
        }
      }
    ]
  }
}
```

## Example 65: cleric casts a healing spell on the injured king.
```json
{
  "id": "scene_65",
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
        "torso": "clothes/sleeveless/sleeveless2/female",
        "hair": "natural/adult",
        "feet": "sandals/thin",
        "hat": "pirate/cavalier/adult"
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
        "head": "heads/orc/female",
        "torso": "clothes/longsleeve/longsleeve/male",
        "legs": "shorts/shorts/male",
        "hair": "jewfro/adult",
        "feet": "sandals/male"
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
          "targetId": "king1",
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

## Example 66: A hero crawls to a location and falls asleep.
```json
{
  "id": "scene_66",
  "soundtrack": "calm",
  "background": "city",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 200,
        "y": 300
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/pig/adult",
        "torso": "clothes/shortsleeve/tshirt_buttoned/male",
        "legs": "shorts/shorts/male",
        "feet": "shoes/revised/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "crouch",
        "entityId": "hero1",
        "params": {
          "duration": 1000
        }
      },
      {
        "type": "action",
        "name": "crawl",
        "entityId": "hero1",
        "params": {
          "destination": {
            "x": 410,
            "y": 385
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
        "entityId": "hero1",
        "params": {
          "duration": 5000
        }
      }
    ]
  }
}
```

## Example 67: scout patrols an area with physics active.
```json
{
  "id": "scene_67",
  "background": "mountain",
  "entities": [
    {
      "id": "scout1",
      "position": {
        "x": 400,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/orc/female",
        "torso": "clothes/longsleeve/longsleeve2_polo/male",
        "legs": "pants/male",
        "hair": "afro/adult",
        "feet": "boots/revised/male"
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
          "height": 89,
          "distance": 58
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
            "x": 721,
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
          "x": 613,
          "y": 346,
          "scale": 0.5,
          "isObject": true,
          "shape": "heart",
          "color": "#d62828ff"
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
              "angle": 873,
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

## Example 69: king gives a potion to rogue.
```json
{
  "id": "scene_69",
  "background": "city",
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
        "torso": "clothes/longsleeve/longsleeve2/female",
        "feet": "shoes/basic/thin",
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
        "torso": "clothes/sleeveless/sleeveless1/male",
        "legs": "fur/male"
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
      "shape": "square",
      "color": "#f38181ff"
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

## Example 70: villain wanders randomly and then speaks.
```json
{
  "id": "scene_70",
  "background": "forest",
  "entities": [
    {
      "id": "villain1",
      "position": {
        "x": 584,
        "y": 346
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/sheep/adult",
        "torso": "armour/legion/male",
        "hair": "afro/adult",
        "facial": "monocle/right/adult"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "wander",
        "entityId": "villain1",
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
        "entityId": "villain1",
        "params": {
          "direction": "DOWN"
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "villain1",
        "params": {
          "text": "I sense danger.",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 71: hunter chases goblin across the area.
```json
{
  "id": "scene_71",
  "soundtrack": "battle",
  "background": "desert",
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
        "head": "heads/vampire/adult",
        "torso": "clothes/longsleeve/longsleeve2/male",
        "legs": "pantaloons/male",
        "hair": "messy1/adult",
        "hat": "formal/crown/adult",
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
        "torso": "clothes/longsleeve/longsleeve2_polo/female",
        "legs": "formal_striped/thin"
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

## Example 72: warrior and villain engage in a dramatic duel.
```json
{
  "id": "scene_72",
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
        "torso": "clothes/shortsleeve/shortsleeve/female",
        "legs": "shorts/shorts/thin",
        "hair": "long_messy/adult",
        "weapon": "magic/wand/female"
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
        "body": "bodies/female",
        "head": "heads/sheep/adult",
        "torso": "clothes/shortsleeve/tshirt_vneck/female",
        "legs": "cuffed/thin",
        "feet": "shoes/ghillies/thin",
        "hat": "formal/tiara/adult",
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
        "entityId": "warrior1",
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
            "entityId": "warrior1",
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

## Example 73: guard, peasant, and hero have a dance party.
```json
{
  "id": "scene_73",
  "soundtrack": "dance",
  "background": "city",
  "entities": [
    {
      "id": "guard1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "aprons/suspenders/male",
        "legs": "shorts/short_shorts/male",
        "feet": "shoes/revised/male",
        "hat": "headband/thick/adult",
        "facial": "monocle/right/adult",
        "beards": "beard",
        "shield": "heater/revised/trim",
        "arms": "gloves/male"
      }
    },
    {
      "id": "peasant1",
      "position": {
        "x": 500,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/vampire/adult",
        "torso": "clothes/sleeveless/sleeveless1/female",
        "hair": "curly_short/adult",
        "feet": "boots/revised/thin"
      }
    },
    {
      "id": "hero1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "aprons/overalls/male",
        "feet": "shoes/basic/male",
        "hat": "helmet/nasal/adult",
        "beards": "beard",
        "neck": "tie/bowtie2/adult",
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
            "entityId": "guard1",
            "params": {
              "text": "Let's dance!",
              "duration": 1500
            }
          },
          {
            "type": "action",
            "name": "emote",
            "entityId": "peasant1",
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
            "entityId": "guard1",
            "params": {
              "duration": 3000
            }
          },
          {
            "type": "action",
            "name": "dance",
            "entityId": "peasant1",
            "params": {
              "duration": 3000
            }
          },
          {
            "type": "action",
            "name": "dance",
            "entityId": "hero1",
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

## Example 74: rogue sneaks up and steals a key from peasant.
```json
{
  "id": "scene_74",
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
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/sleeveless/sleeveless2_buttoned/female",
        "legs": "cuffed/thin",
        "feet": "boots/fold/thin"
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
        "torso": "clothes/longsleeve/longsleeve2_buttoned/male",
        "legs": "shorts/short_shorts/male",
        "hair": "curly_short/adult",
        "feet": "shoes/basic/male"
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
      "color": "#00b894ff"
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

## Example 75: A solemn scene: friends mourn a fallen warrior.
```json
{
  "id": "scene_75",
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
        "head": "heads/human/male",
        "torso": "armour/legion/male",
        "legs": "formal/male",
        "hair": "afro/adult",
        "feet": "boots/rimmed/male",
        "beards": "mustache"
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
        "torso": "clothes/shortsleeve/tshirt_scoop/male",
        "legs": "leggings/male",
        "hair": "longhawk/adult",
        "feet": "shoes/ghillies/male",
        "hat": "helmet/greathelm/male",
        "weapon": "magic/wand/female"
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
        "torso": "aprons/suspenders/male",
        "hair": "parted/adult",
        "feet": "boots/rimmed/male",
        "hat": "helmet/close/male",
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

## Example 76: warrior and mage race to the finish line.
```json
{
  "id": "scene_76",
  "soundtrack": "dance",
  "background": "park",
  "entities": [
    {
      "id": "warrior1",
      "position": {
        "x": 150,
        "y": 380
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/tshirt/female",
        "legs": "leggings/thin",
        "hair": "twists_fade/adult"
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
        "torso": "armour/legion/female",
        "legs": "pantaloons/thin",
        "hair": "spiked/adult",
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
        "entityId": "warrior1",
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
            "entityId": "warrior1",
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
        "entityId": "warrior1",
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
  "background": "beach",
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
        "torso": "aprons/suspenders/female",
        "feet": "shoes/revised/thin"
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
      "shape": "cylinder",
      "color": "#ff6b6bff"
    },
    {
      "id": "ball_b",
      "position": {
        "x": 520,
        "y": 460
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "cylinder",
      "color": "#d62828ff"
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
        "body": "bodies/male",
        "head": "heads/orc/male",
        "torso": "clothes/shortsleeve/shortsleeve_polo/male",
        "legs": "shorts/short_shorts/male",
        "facial": "glasses/secretary/adult"
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
        "head": "heads/wolf/female",
        "torso": "clothes/shortsleeve/shortsleeve/male",
        "legs": "shorts/short_shorts/male",
        "hair": "curly_short/adult",
        "feet": "slippers/male"
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

## Example 79: knight escorts hero safely across the battlefield.
```json
{
  "id": "scene_79",
  "soundtrack": "calm",
  "background": "city",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 200,
        "y": 430
      },
      "scale": 2.2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/lizard/female",
        "torso": "clothes/sleeveless/sleeveless2_buttoned/female",
        "legs": "pants2/thin",
        "hair": "cornrows/adult",
        "feet": "boots/rimmed/thin"
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
        "head": "heads/human/female",
        "torso": "aprons/suspenders/female",
        "legs": "hose/thin",
        "hair": "pixie/adult"
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
            "entityId": "knight1",
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
              "targetId": "knight1",
              "duration": 4000,
              "speed": 1
            }
          }
        ]
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "knight1",
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

## Example 80: mage and rogue rest around a campfire.
```json
{
  "id": "scene_80",
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
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/sleeveless/sleeveless2_buttoned/male",
        "legs": "shorts/shorts/male",
        "hair": "dreadlocks_short/adult",
        "weapon": "magic/wand/female",
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
        "head": "heads/orc/female",
        "torso": "armour/legion/male",
        "legs": "hose/male",
        "hair": "curly_short/adult",
        "feet": "boots/rimmed/male",
        "facial": "masks/plain"
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
              "targetId": "rogue1"
            }
          },
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "rogue1",
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
            "entityId": "mage1",
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
  "background": "beach",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 215,
        "y": 417
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
        "x": 498,
        "y": 444
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
        "name": "move",
        "entityId": "knight1",
        "params": {
          "destination": {
            "x": 478,
            "y": 444
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

## Example 82: A hero throws a bottle at a villain.
```json
{
  "id": "scene_82",
  "background": "city",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 284,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "formal/thin",
        "hair": "page/adult"
      }
    },
    {
      "id": "villain1",
      "position": {
        "x": 912,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/male",
        "hair": "long/adult",
        "feet": "boots/fold/male",
        "hat": "helmet/barbuta/male"
      }
    },
    {
      "id": "bottle1",
      "position": {
        "x": 256,
        "y": 450
      },
      "scale": 0.5,
      "isObject": true,
      "shape": "square",
      "color": "#6a0572ff"
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
        "entityId": "hero1",
        "params": {
          "targetId": "villain1"
        }
      },
      {
        "type": "action",
        "name": "throw",
        "entityId": "hero1",
        "params": {
          "objectId": "bottle1",
          "target": {
            "x": 860,
            "y": 400
          },
          "arcHeight": 55
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
          "strength": 66
        }
      }
    ]
  },
  "soundtrack": "mystical"
}
```

## Example 83: cleric and scout have a friendly conversation.
```json
{
  "id": "scene_83",
  "background": "mountain",
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
        "head": "heads/orc/child",
        "torso": "clothes/longsleeve/longsleeve2/female",
        "legs": "formal/thin",
        "weapon": "magic/wand/female",
        "shield": "heater/original/pattern/cross"
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
        "torso": "clothes/shortsleeve/tshirt_vneck/male",
        "legs": "shorts/short_shorts/male",
        "hair": "messy1/adult",
        "feet": "shoes/ghillies/male"
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

## Example 84: An attack happens: villain strikes peasant, who flees.
```json
{
  "id": "scene_84",
  "soundtrack": "battle",
  "background": "forest",
  "entities": [
    {
      "id": "villain1",
      "position": {
        "x": 400,
        "y": 354
      },
      "scale": 2.5,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve_polo/female",
        "legs": "pantaloons/thin",
        "hair": "dreadlocks_long/adult",
        "shield": "heater/original/pattern/cross"
      }
    },
    {
      "id": "peasant1",
      "position": {
        "x": 620,
        "y": 410
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2_buttoned/male",
        "legs": "shorts/shorts/male",
        "hair": "bangs/adult",
        "feet": "shoes/ghillies/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "move",
        "entityId": "villain1",
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
        "entityId": "villain1",
        "params": {
          "targetId": "peasant1",
          "weapon": "punch"
        }
      },
      {
        "type": "parallel",
        "children": [
          {
            "type": "action",
            "name": "knockBack",
            "entityId": "peasant1",
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
            "entityId": "peasant1",
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
        "entityId": "peasant1",
        "params": {
          "targetId": "villain1",
          "duration": 2000,
          "speed": 1.5
        }
      }
    ]
  }
}
```

## Example 85: hero casts a healing spell on the injured warrior.
```json
{
  "id": "scene_85",
  "soundtrack": "mystical",
  "background": "beach",
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
        "torso": "clothes/shortsleeve/shortsleeve_cardigan/male",
        "legs": "pantaloons/male",
        "hair": "ponytail/adult/fg",
        "feet": "boots/fold/male",
        "hat": "cloth/bandana2/adult"
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
        "body": "bodies/male",
        "head": "heads/lizard/male",
        "torso": "clothes/shortsleeve/tshirt/male",
        "legs": "leggings2/male",
        "hair": "flat_top_fade/adult",
        "feet": "shoes/ghillies/male"
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
          "targetId": "warrior1",
          "amount": 32,
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

## Example 86: A rogue crawls to a location and falls asleep.
```json
{
  "id": "scene_86",
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
        "head": "heads/lizard/male",
        "torso": "clothes/longsleeve/longsleeve2_cardigan/female",
        "legs": "hose/thin",
        "hair": "bob/adult",
        "feet": "boots/rimmed/thin"
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
            "x": 425,
            "y": 443
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

## Example 87: guard patrols an area with physics active.
```json
{
  "id": "scene_87",
  "background": "desert",
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
        "head": "heads/orc/female",
        "torso": "clothes/longsleeve/longsleeve2_vneck/male",
        "legs": "pantaloons/male",
        "hair": "plain/adult",
        "feet": "sandals/male",
        "facial": "glasses/glasses/adult",
        "weapon": "magic/wand/male"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "jump",
        "entityId": "guard1",
        "params": {
          "height": 61,
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
        "entityId": "guard1",
        "params": {
          "pointA": {
            "x": 400,
            "y": 450
          },
          "pointB": {
            "x": 774,
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
          "x": 533,
          "y": 320,
          "scale": 0.5,
          "isObject": true,
          "shape": "square",
          "color": "#6c5ce7ff"
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
              "angle": 841,
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

## Example 89: king gives a scroll to friend.
```json
{
  "id": "scene_89",
  "background": "forest",
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
        "torso": "clothes/longsleeve/longsleeve2_buttoned/female",
        "legs": "pants2/thin",
        "hair": "pixie/adult",
        "feet": "boots/rimmed/thin",
        "shield": "heater/original/trim"
      }
    },
    {
      "id": "friend1",
      "position": {
        "x": 700,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/minotaur/male",
        "torso": "clothes/sleeveless/sleeveless1/male",
        "legs": "shorts/shorts/male",
        "hair": "jewfro/adult",
        "feet": "boots/rimmed/male"
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
      "shape": "rectangle",
      "color": "#00b894ff"
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
          "targetId": "friend1",
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
        "entityId": "friend1",
        "params": {
          "duration": 2000
        }
      }
    ]
  }
}
```

## Example 90: villain wanders randomly and then speaks.
```json
{
  "id": "scene_90",
  "background": "city",
  "entities": [
    {
      "id": "villain1",
      "position": {
        "x": 674,
        "y": 395
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/male",
        "torso": "clothes/shortsleeve/shortsleeve_cardigan/female",
        "legs": "pants2/thin",
        "hair": "afro/adult",
        "feet": "shoes/revised/thin",
        "shield": "heater/revised/trim"
      }
    }
  ],
  "timeline": {
    "type": "sequence",
    "children": [
      {
        "type": "action",
        "name": "wander",
        "entityId": "villain1",
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
        "entityId": "villain1",
        "params": {
          "direction": "UP"
        }
      },
      {
        "type": "action",
        "name": "speak",
        "entityId": "villain1",
        "params": {
          "text": "I'm lost.",
          "duration": 1500
        }
      }
    ]
  }
}
```

## Example 91: guard chases villain across the area.
```json
{
  "id": "scene_91",
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
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2/male",
        "hair": "mop/adult",
        "facial": "patches/eyepatch/ambi/adult"
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
        "head": "heads/sheep/adult",
        "torso": "clothes/longsleeve/longsleeve/female",
        "legs": "pants/thin",
        "hair": "pigtails/adult"
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

## Example 92: hero and troll engage in a dramatic duel.
```json
{
  "id": "scene_92",
  "soundtrack": "battle",
  "background": "desert",
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
        "torso": "clothes/longsleeve/longsleeve2_buttoned/female",
        "legs": "pantaloons/thin",
        "hat": "formal/bowler/adult",
        "neck": "tie/bowtie/adult"
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
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2_vneck/male",
        "legs": "cuffed/male",
        "hair": "bedhead/adult",
        "hat": "holiday/christmas/adult",
        "shield": "heater/original/trim"
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
        "entityId": "hero1",
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
            "entityId": "hero1",
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

## Example 93: knight, rogue, and peasant have a dance party.
```json
{
  "id": "scene_93",
  "soundtrack": "dance",
  "background": "park",
  "entities": [
    {
      "id": "knight1",
      "position": {
        "x": 300,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/male",
        "head": "heads/human/male",
        "torso": "clothes/longsleeve/longsleeve2/male",
        "legs": "pants/male",
        "weapon": "magic/wand/male"
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
        "torso": "clothes/shortsleeve/shortsleeve/female",
        "hair": "jewfro/adult",
        "feet": "boots/basic/thin",
        "hat": "pirate/bicorne/athwart/basic/adult",
        "shield": "heater/original/trim"
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
        "body": "bodies/female",
        "head": "heads/orc/male",
        "torso": "clothes/sleeveless/sleeveless1/female",
        "hair": "cornrows/adult",
        "feet": "shoes/revised/thin",
        "facial": "glasses/nerd/adult"
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
            "entityId": "knight1",
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
            "entityId": "knight1",
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
            "entityId": "peasant1",
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

## Example 94: rogue sneaks up and steals a gem from mage.
```json
{
  "id": "scene_94",
  "background": "city",
  "entities": [
    {
      "id": "rogue1",
      "position": {
        "x": 800,
        "y": 430
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/human/female",
        "torso": "clothes/shortsleeve/shortsleeve/female",
        "legs": "fur/thin",
        "hair": "curly_long/adult",
        "feet": "boots/fold/thin",
        "facial": "patches/eyepatch/ambi/adult"
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
        "torso": "clothes/sleeveless/sleeveless2_buttoned/male",
        "legs": "formal_striped/male"
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
      "shape": "circle",
      "color": "#023e8aff"
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
        "head": "heads/vampire/adult",
        "torso": "clothes/sleeveless/sleeveless2_vneck/male",
        "legs": "formal/male",
        "hair": "lob/adult",
        "hat": "helmet/greathelm/female",
        "beards": "mustache",
        "shield": "heater/revised/trim"
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
        "head": "heads/alien/adult",
        "torso": "clothes/shortsleeve/tshirt_buttoned/male",
        "legs": "fur/male",
        "feet": "slippers/male"
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
        "head": "heads/orc/child",
        "torso": "clothes/shortsleeve/shortsleeve_polo/male",
        "hair": "parted/adult",
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

## Example 96: rogue and mage race to the finish line.
```json
{
  "id": "scene_96",
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
        "body": "bodies/female",
        "head": "heads/vampire/adult",
        "torso": "clothes/sleeveless/sleeveless1/female",
        "legs": "leggings/thin",
        "feet": "shoes/ghillies/thin"
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
        "torso": "clothes/sleeveless/sleeveless2_vneck/female",
        "legs": "shorts/short_shorts/thin"
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
        "entityId": "rogue1",
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
        "torso": "armour/plate/male",
        "legs": "fur/male",
        "hair": "bedhead/adult",
        "feet": "shoes/basic/male",
        "hat": "helmet/horned/adult",
        "facial": "glasses/sunglasses/adult",
        "weapon": "magic/wand/female",
        "shield": "heater/revised/pattern/chevron"
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
      "color": "#023e8aff"
    },
    {
      "id": "ball_b",
      "position": {
        "x": 520,
        "y": 460
      },
      "scale": 0.4,
      "isObject": true,
      "shape": "triangle",
      "color": "#ffe66dff"
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

## Example 98: goblin ambushes guard from behind.
```json
{
  "id": "scene_98",
  "soundtrack": "battle",
  "background": "forest",
  "entities": [
    {
      "id": "goblin1",
      "position": {
        "x": 800,
        "y": 400
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/orc/child",
        "torso": "clothes/shortsleeve/tshirt/female",
        "legs": "formal_striped/thin",
        "feet": "boots/rimmed/thin"
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
        "head": "heads/human/male",
        "torso": "clothes/shortsleeve/tshirt_buttoned/male",
        "legs": "shorts/short_shorts/male",
        "hair": "plain/adult",
        "feet": "boots/rimmed/male"
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
        "entityId": "goblin1",
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
        "entityId": "goblin1",
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
        "entityId": "goblin1",
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
  "background": "mountain",
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
        "torso": "aprons/suspenders/male",
        "legs": "pants2/male",
        "hair": "spiked/adult"
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
        "torso": "clothes/shortsleeve/tshirt_scoop/female",
        "hair": "longhawk/adult",
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

## Example 100: hero and rogue rest around a campfire.
```json
{
  "id": "scene_100",
  "soundtrack": "calm",
  "background": "forest",
  "entities": [
    {
      "id": "hero1",
      "position": {
        "x": 380,
        "y": 450
      },
      "scale": 2,
      "appearance": {
        "body": "bodies/female",
        "head": "heads/wolf/male",
        "torso": "clothes/sleeveless/sleeveless1/female",
        "legs": "formal_striped/thin",
        "hat": "helmet/kettle/adult",
        "weapon": "magic/wand/female",
        "shield": "heater/revised/pattern/cross"
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
        "torso": "clothes/longsleeve/longsleeve2/male",
        "legs": "leggings2/male",
        "feet": "sandals/male",
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
      "shape": "star",
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
              "targetId": "rogue1"
            }
          },
          {
            "type": "action",
            "name": "turnTowards",
            "entityId": "rogue1",
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
            "entityId": "hero1",
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
