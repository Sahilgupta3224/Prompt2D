import os
import json
from dotenv import load_dotenv
from neo4j import GraphDatabase
from typing import List
from pydantic import BaseModel
from langchain_groq import ChatGroq
from langchain.tools import tool
from langchain_community.tools.tavily_search import TavilySearchResults

load_dotenv()

driver =GraphDatabase.driver(
    os.getenv("NEO4J_URI"),
    auth=(os.getenv("NEO4J_USER"),os.getenv("NEO4J_PASSWORD"))
)

llm =ChatGroq(
    model="llama-3.1-8b-instant",
    temperature=0.4,
    response_format={"type": "json_object"} 
)



def parse_scene(scene_name, scene):

    actions = []
    entities = []
    objects = []

    for e in scene["entities"]:

        if e.get("isObject"):
            objects.append(e["id"])
        else:
            entities.append(e["id"])

    for step in scene["timeline"]["children"]:
        if step["type"] == "action":
            actions.append(step["name"])

    return {
        "scene": scene_name,
        "actions": list(set(actions)),
        "entities": entities,
        "objects": objects
    }

def build_prompt(context):

    return f"""
You are building a knowledge graph for a simulation engine.

Scene:
{context["scene"]}

Actions:
{context["actions"]}

Entities:
{context["entities"]}

Objects:
{context["objects"]}

Infer relationships between actions, objects and states.

Return JSON only.
Do not add explanation.
Do not add markdown.
Do not add text before or after JSON.

Format:

{{
 "nodes":[
   {{"id":"","type":""}}
 ],
 "relationships":[
   {{"from":"","relation":"","to":""}}
 ]
}}

Relation types allowed:
CAUSES
REQUIRES_ENTITY
REQUIRES_ACTION
REQUIRES_OBJECT
CREATES_STATE
AFFECTS_ENTITY
PERFORMED_BY
ENABLES
"""
def generate_graph(context):
    prompt=build_prompt(context)
    response=llm.invoke(prompt)
    try:
        graph=json.loads(response.content)
    except:
        import json_repair
        repaired=json_repair.repair(response.content)
        graph=json.loads(repaired)
    return graph



def insert_graph(data):

    with driver.session() as session:
        print("inserting data",data)
        for node in data["nodes"]:

            session.run(
              """
              MERGE (n:Node {id:$id})
              SET n.type=$type
              """,
              node
            )

        for rel in data["relationships"]:

            session.run(
             f"""
             MATCH (a {{id:$from}})
             MATCH (b {{id:$to}})
             MERGE (a)-[:{rel["relation"]}]->(b)
            """,
            {"from": rel["from"], "to": rel["to"]}
          )

def build_graph_from_scenes(scenes):

    for name, scene in scenes.items():

        context = parse_scene(name, scene)

        graph_data = generate_graph(context)

        if graph_data:
            insert_graph(graph_data)

Scenes = {
    "Boy playing football in park": {
        "background": "park",
        "entities": [
            {"id": "hero1", "position": {"x": 100, "y": 300}, "scale": 2},
            {"id": "hero2", "position": {"x": 300, "y": 300}, "scale": 2},
            {
                "id": "rock",
                "position": {"x": 670, "y": 50},
                "scale": 0.4,
                "isObject": True,
                "shape": "randomPolygon",
                "color": "#de0404ff",
            },
        ],
        "timeline": {
            "type": "sequence",
            "children": [
                {"type": "action", "name": "grab",
                 "params": {"objectId": "rock", "attachmentPoint": "hand"}},
                {"type": "action", "name": "fade",
                 "params": {"targetAlpha": 0.5}},
                {"type": "action", "name": "speak",
                 "entityId": "hero2",
                 "params": {"text": "Hi!", "duration": 2000}},
                {"type": "action", "name": "attack",
                 "params": {"targetId": "hero2", "weapon": "melee"}},
            ],
        },
    },

    "Girl reading book in library": {
        "background": "library",
        "entities": [
            {"id": "girl", "position": {"x": 200, "y": 320}, "scale": 2},
            {"id": "book", "position": {"x": 220, "y": 340},
             "scale": 0.5, "isObject": True},
        ],
        "timeline": {
            "type": "sequence",
            "children": [
                {"type": "action", "name": "grab",
                 "params": {"objectId": "book"}},
                {"type": "action", "name": "sit",
                 "entityId": "girl",
                 "params": {"duration": 3000}},
                {"type": "action", "name": "read",
                 "entityId": "girl",
                 "params": {"duration": 5000}},
            ],
        },
    },
    "Child flying kite on beach": {
    "background": "beach",
    "entities": [
        {"id": "child", "position": {"x": 120, "y": 300}, "scale": 2},
        {"id": "kite", "position": {"x": 200, "y": 100},
         "scale": 0.5, "isObject": True},
    ],
    "timeline": {
        "type": "sequence",
        "children": [
            {"type": "action","name": "hold",
             "params": {"objectId": "kite"}},
            {"type": "action","name": "run",
             "entityId": "child",
             "params": {"destination": {"x": 500,"y":300}}},
            {"type": "action","name": "emote",
             "entityId": "child",
             "params": {"emote":"happy","duration":1500}},
        ]
    }
},

"Boy drinking water after running": {
    "background": "ground",
    "entities": [
        {"id": "boy","position":{"x":150,"y":320},"scale":2},
        {"id": "bottle","position":{"x":250,"y":330},
         "scale":0.4,"isObject":True}
    ],
    "timeline":{
        "type":"sequence",
        "children":[
            {"type":"action","name":"grab",
             "params":{"objectId":"bottle"}},
            {"type":"action","name":"drink",
             "entityId":"boy",
             "params":{"duration":2000}},
            {"type":"action","name":"relax",
             "entityId":"boy","params":{"duration":1500}}
        ]
    }
},

"Teacher explaining on board": {
    "background":"classroom",
    "entities":[
        {"id":"teacher","position":{"x":300,"y":280},"scale":2},
        {"id":"board","position":{"x":500,"y":200},
         "scale":1,"isObject":True}
    ],
    "timeline":{
        "type":"sequence",
        "children":[
            {"type":"action","name":"walk",
             "entityId":"teacher",
             "params":{"destination":{"x":450,"y":280}}},
            {"type":"action","name":"write",
             "params":{"objectId":"board"}},
            {"type":"action","name":"speak",
             "entityId":"teacher",
             "params":{"text":"Today we learn AI","duration":2500}}
        ]
    }
},

"Robot waving hello": {
    "background":"city",
    "entities":[
        {"id":"robot","position":{"x":250,"y":300},"scale":2}
    ],
    "timeline":{
        "type":"sequence",
        "children":[
            {"type":"action","name":"wave","entityId":"robot"},
            {"type":"action","name":"speak",
             "entityId":"robot",
             "params":{"text":"Hello Human","duration":2000}}
        ]
    }
},

"Girl dancing on stage": {
    "background":"stage",
    "entities":[
        {"id":"girl","position":{"x":400,"y":300},"scale":2}
    ],
    "timeline":{
        "type":"sequence",
        "children":[
            {"type":"action","name":"dance","entityId":"girl"},
            {"type":"action","name":"rotate",
             "entityId":"girl",
             "params":{"angle":360,"duration":1500}},
            {"type":"action","name":"bow","entityId":"girl"}
        ]
    }
},

"Boy planting tree": {
    "background":"garden",
    "entities":[
        {"id":"boy","position":{"x":200,"y":300},"scale":2},
        {"id":"plant","position":{"x":350,"y":340},
         "scale":0.5,"isObject":True}
    ],
    "timeline":{
        "type":"sequence",
        "children":[
            {"type":"action","name":"dig"},
            {"type":"action","name":"place",
             "params":{"objectId":"plant"}},
            {"type":"action","name":"water"},
            {"type":"action","name":"emote",
             "entityId":"boy",
             "params":{"emote":"proud","duration":1200}}
        ]
    }
},

"Child jumping over puddle": {
    "background":"street",
    "entities":[
        {"id":"child","position":{"x":150,"y":300},"scale":2},
        {"id":"puddle","position":{"x":350,"y":340},
         "scale":0.8,"isObject":True}
    ],
    "timeline":{
        "type":"sequence",
        "children":[
            {"type":"action","name":"run"},
            {"type":"action","name":"jump",
             "params":{"height":60}},
            {"type":"action","name":"land"}
        ]
    }
},

"Man typing on laptop": {
    "background":"office",
    "entities":[
        {"id":"man","position":{"x":300,"y":300},"scale":2},
        {"id":"laptop","position":{"x":320,"y":320},
         "scale":0.5,"isObject":True}
    ],
    "timeline":{
        "type":"sequence",
        "children":[
            {"type":"action","name":"sit"},
            {"type":"action","name":"type",
             "params":{"objectId":"laptop","duration":4000}},
            {"type":"action","name":"think"}
        ]
    }
},

"Dog chasing ball": {
    "background":"park",
    "entities":[
        {"id":"dog","position":{"x":100,"y":320},"scale":1.8},
        {"id":"ball","position":{"x":400,"y":300},
         "scale":0.4,"isObject":True}
    ],
    "timeline":{
        "type":"sequence",
        "children":[
            {"type":"action","name":"run"},
            {"type":"action","name":"grab",
             "params":{"objectId":"ball"}},
            {"type":"action","name":"return"}
        ]
    }
},

"Friends greeting each other": {
    "background":"street",
    "entities":[
        {"id":"friend1","position":{"x":100,"y":300},"scale":2},
        {"id":"friend2","position":{"x":600,"y":300},"scale":2}
    ],
    "timeline":{
        "type":"sequence",
        "children":[
            {"type":"action","name":"move",
             "entityId":"friend1",
             "params":{"destination":{"x":300,"y":300}}},
            {"type":"action","name":"move",
             "entityId":"friend2",
             "params":{"destination":{"x":350,"y":300}}},
            {"type":"action","name":"hug"}
        ]
    }
},

"Girl taking photo": {
    "background":"tourist_spot",
    "entities":[
        {"id":"girl","position":{"x":200,"y":300},"scale":2},
        {"id":"camera","position":{"x":210,"y":320},
         "scale":0.4,"isObject":True}
    ],
    "timeline":{
        "type":"sequence",
        "children":[
            {"type":"action","name":"grab",
             "params":{"objectId":"camera"}},
            {"type":"action","name":"aim"},
            {"type":"action","name":"capture"}
        ]
    }
},

"Boy sleeping under tree": {
    "background":"park",
    "entities":[
        {"id":"boy","position":{"x":300,"y":330},"scale":2}
    ],
    "timeline":{
        "type":"sequence",
        "children":[
            {"type":"action","name":"lie_down"},
            {"type":"action","name":"sleep",
             "params":{"duration":5000}}
        ]
    }
},

"Robot charging battery": {
    "background":"lab",
    "entities":[
        {"id":"robot","position":{"x":300,"y":300},"scale":2},
        {"id":"charger","position":{"x":450,"y":320},
         "scale":0.5,"isObject":True}
    ],
    "timeline":{
        "type":"sequence",
        "children":[
            {"type":"action","name":"move",
             "params":{"destination":{"x":450,"y":300}}},
            {"type":"action","name":"connect",
             "params":{"objectId":"charger"}},
            {"type":"action","name":"charge",
             "params":{"duration":4000}}
        ]
    }
}

}

build_graph_from_scenes(Scenes)