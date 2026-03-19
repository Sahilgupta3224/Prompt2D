from dotenv import load_dotenv
load_dotenv()
from neo4j import GraphDatabase
import os
import json
from typing import TypedDict, List, Dict,Any,Optional,Union,Literal
from pydantic import BaseModel,Field,ValidationError
from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langgraph.graph import StateGraph, END
import re

def clean_llm_json(raw: str):
    raw = re.sub(r"```json|```", "", raw)
    return raw.strip()
class Position(BaseModel):
    x: float
    y: float

class Animation(BaseModel):
    row: int
    frames: int

class EntityDefinition(BaseModel):
    id: str

    type: Optional[Literal["character", "object", "prop"]] = None

    position: Position

    scale: Optional[float] = None

    spriteSheet: Optional[str] = None
    frameWidth: Optional[int] = None
    frameHeight: Optional[int] = None

    isObject: Optional[bool] = None

    shape: Optional[str] = None
    color: Optional[str] = None

    animations: Optional[Dict[str, Animation]] = None

    attachments: Optional[
        Dict[
            str,
            Dict[str, Union[Position, List[Position]]]
        ]
    ] = None

    appearance: Optional[Any] = None

class ActionNode(BaseModel):
    type: Literal["action"]
    name: str
    params: Any
    entityId: Optional[str] = None
    id: Optional[str] = None


class SequenceNode(BaseModel):
    type: Literal["sequence"]
    children: List["TimelineNode"]
    id: Optional[str] = None


class ParallelNode(BaseModel):
    type: Literal["parallel"]
    children: List["TimelineNode"]
    id: Optional[str] = None


class LoopNode(BaseModel):
    type: Literal["loop"]
    iterations: int = Field(..., gt=0)
    child: "TimelineNode"
    id: Optional[str] = None

TimelineNode = Union[
    ActionNode,
    SequenceNode,
    ParallelNode,
    LoopNode
]

SequenceNode.model_rebuild()
ParallelNode.model_rebuild()
LoopNode.model_rebuild()

class NodeState(BaseModel):
    completed: bool
    active: bool

    sequenceIndex: Optional[int] = None
    loopCounter: Optional[int] = None

    childrenStates: Optional[List["NodeState"]] = None
    childState: Optional["NodeState"] = None

    actionState: Optional[Any] = None


NodeState.model_rebuild()

class SceneDefinition(BaseModel):
    id: str
    name: Optional[str] = None
    background: Optional[str] = None

    entities: List[EntityDefinition]

    timeline: TimelineNode

def validate_scene(data: dict):
    try:
        scene = SceneDefinition(**data)
        return {
            "valid": True,
            "data": scene.model_dump()
        }
    except ValidationError as e:
        return {
            "valid": False,
            "errors": e.errors()
        }
class SceneState(TypedDict):
    prompt: str
    intent: Dict
    retrieved_scenes: List[Dict]
    graph_knowledge: Dict
    plan: Dict
    final_scene: Dict

def get_llm():
    return ChatGroq(
        model="llama-3.1-8b-instant",
        temperature=0.3,
    )


llm = get_llm()

embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

db = FAISS.load_local(
    "RAG_Databases/scene_memory_db",
    embeddings,
    allow_dangerous_deserialization=True
)
driver = GraphDatabase.driver(
    os.getenv("NEO4J_URI"),
    auth=(os.getenv("NEO4J_USER"), os.getenv("NEO4J_PASSWORD"))
)

def validate_with_retry(raw: str, llm, max_retries=2):
    attempt = 0
    current = raw

    while attempt <= max_retries:
        try:
            parsed = json.loads(current)
            scene = SceneDefinition(**parsed)
            return scene.model_dump()

        except (json.JSONDecodeError, ValidationError) as e:
            fix_prompt = f"""
              Fix this JSON to match SceneDefinition schema.
              ERROR:
              {str(e)}
              JSON:
              {current}
              Return ONLY valid JSON.
            """
            response = llm.invoke(fix_prompt)
            current = response.content

        attempt += 1

    raise Exception("Failed to generate valid SceneDefinition")

def intent_agent(state: SceneState):

    prompt = f"""
    Extract structured intent from user prompt.
    Return JSON:
    {{
        "entities": [],
        "objects": [],
        "actions": [],
        "background": ""
    }}

    USER PROMPT:
    {state['prompt']}
    """

    response = llm.invoke(prompt)

    try:
        intent = json.loads(response.content)
    except:
        intent = {"raw": response.content}

    state["intent"] = intent
    return state

def retrieve_scene_agent(state: SceneState):

    docs = db.similarity_search(state["prompt"], k=5)

    results = []

    for d in docs:
        results.append({
            "content": d.page_content,
            "metadata": d.metadata
        })

    state["retrieved_scenes"] = results
    return state

def query_action_relationships(actions):

    with driver.session() as session:

        result = session.run(
        """
        MATCH (a {id:$action})-[r]->(b)
        RETURN a.id AS action, type(r) AS relation, b.id AS target
        """,
        {"action": actions}
        )

        return [record.data() for record in result]

def query_entity_relationships(entities):

    with driver.session() as session:

        result = session.run(
        """
        MATCH (a)-[r]->(b)
        WHERE a.id IN $entities OR b.id IN $entities
        RETURN a.id AS source, type(r) AS relation, b.id AS target
        """,
        {"entities": entities}
        )

        return [record.data() for record in result]
    
def retrieve_common_sequence_Knowledge(state: SceneState):

    intent = state["intent"]

    actions = intent.get("actions", [])
    objects = intent.get("objects", [])
    entities = intent.get("entities", [])

    action_relations = query_action_relationships(actions)

    entity_relations = query_entity_relationships(entities)

    graph_knowledge = {
        "action_relations": action_relations,
        "entity_relations": entity_relations
    }

    state["graph_knowledge"] = graph_knowledge

    return state

def planner_agent(state: SceneState):

    prompt = f"""
You are a scene planning AI for a 2D animation engine.

IMPORTANT:
- Generate ONLY PHYSICAL, VISUAL actions.
- DO NOT generate abstract or NLP actions like:
  (extract, identify, tokenize, process, analyze)

Allowed actions examples:
- walk, run, jump, kick, throw, sit, stand, play, smile

Goal:
Convert user intent into a visual animation timeline.

Return JSON:
{{
  "timeline": {{
    "type": "sequence",
    "children": []
  }}
}}

Example:
User: "A girl playing football in park"

Output:
{{
  "timeline": {{
    "type": "sequence",
    "children": [
      {{
        "type": "action",
        "name": "run",
        "params": {{}},
        "entityId": "girl_1"
      }},
      {{
        "type": "action",
        "name": "kick",
        "params": {{}},
        "entityId": "girl_1"
      }}
    ]
  }}
}}

USER INTENT:
{state['intent']}
"""

    response = llm.invoke(prompt)

    try:
        raw = clean_llm_json(response.content)
        plan = json.loads(raw)
    except:
        plan = {"raw_plan": response.content}

    state["plan"] = plan
    return state
def scene_builder_agent(state: SceneState):

    prompt = f"""
You are building a 2D animation scene.

STRICT RULES:
- Entities must represent real-world objects/characters
- Actions must be physical and visible
- Timeline must describe animation, not logic

Entities must match intent.

Example:
Input: "A girl playing football in park"

Output:
{{
  "id": "scene_1",
  "name": "girl playing football",
  "background": "park",
  "entities": [
    {{
      "id": "girl_1",
      "type": "character",
      "position": {{ "x": 0, "y": 0 }}
    }},
    {{
      "id": "ball_1",
      "type": "object",
      "position": {{ "x": 1, "y": 0 }}
    }}
  ],
  "timeline": {{
    "type": "sequence",
    "children": [
      {{
        "type": "action",
        "name": "run",
        "params": {{}},
        "entityId": "girl_1"
      }},
      {{
        "type": "action",
        "name": "kick",
        "params": {{}},
        "entityId": "girl_1"
      }}
    ]
  }}
}}


INTENT:
{state['intent']}

PLAN:
{state['plan']}
"""
    response = llm.invoke(prompt)

    try:
        raw = clean_llm_json(response.content)
        parsed = json.loads(raw)
        if "SceneDefinition" in parsed:
            parsed = parsed["SceneDefinition"]

        final_scene = validate_with_retry(json.dumps(parsed), llm)

    except Exception:
        final_scene = {
            "error": "Invalid scene",
            "raw_scene": response.content
        }

    state["final_scene"] = final_scene
    return state

def timeline_runner(state: SceneState):

    print("FINAL TIMELINE RUNNER SCENE")
    print(json.dumps(state["final_scene"], indent=2))

    return state

workflow = StateGraph(SceneState)

workflow.add_node("intent_agent", intent_agent)
workflow.add_node("retrieve_scene_agent", retrieve_scene_agent)
workflow.add_node("retrieve_common_sequence_Knowledge",retrieve_common_sequence_Knowledge)
workflow.add_node("planner_agent", planner_agent)
workflow.add_node("scene_builder_agent", scene_builder_agent)
workflow.add_node("timeline_runner", timeline_runner)

workflow.set_entry_point("intent_agent")

workflow.add_edge("intent_agent", "retrieve_scene_agent")
workflow.add_edge("retrieve_scene_agent","retrieve_common_sequence_Knowledge")
workflow.add_edge("retrieve_common_sequence_Knowledge","planner_agent")
workflow.add_edge("planner_agent", "scene_builder_agent")
workflow.add_edge("scene_builder_agent", "timeline_runner")
workflow.add_edge("timeline_runner", END)

app = workflow.compile()

if __name__ == "__main__":

    result = app.invoke({
        "prompt": "A girl playing football happily in park"
    })