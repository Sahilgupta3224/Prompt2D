from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import json

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

def scene_to_text(prompt, scene):
    return f"""
PROMPT:
{prompt}

BACKGROUND:
{scene['background']}

ENTITIES:
{json.dumps(scene['entities'], indent=2)}

TIMELINE:
{json.dumps(scene['timeline'], indent=2)}
"""

documents=[]

for prompt,scene in Scenes.items():
    text=scene_to_text(prompt,scene)
    documents.append(
        Document(
            page_content=text,
            metadata={
                "prompt":prompt,
                "background":scene["background"]
            }
        )
    )
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)
db=FAISS.from_documents(documents,embeddings)
db.save_local("scene_memory_db")