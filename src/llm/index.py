import os
from dotenv import load_dotenv
load_dotenv(os.path.join(os.path.dirname(__file__), "..", "..", ".env"))

import json
import re
from typing import Optional, List, Dict, Any, Union, Literal

from pydantic import BaseModel, Field, ValidationError
from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

def clean_llm_json(raw: str) -> str:
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
    scale: float
    spriteSheet: Optional[str] = None
    frameWidth: Optional[int] = None
    frameHeight: Optional[int] = None
    isObject: Optional[bool] = None
    shape: Optional[str] = None
    color: Optional[str] = None
    animations: Optional[Dict[str, Animation]] = None
    attachments: Optional[Dict[str, Any]] = Field(default_factory=dict)
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

TimelineNode = Union[ActionNode, SequenceNode, ParallelNode, LoopNode]

SequenceNode.model_rebuild()
ParallelNode.model_rebuild()
LoopNode.model_rebuild()

class SceneDefinition(BaseModel):
    id: str
    name: Optional[str] = None
    background: Optional[str] = None
    entities: List[EntityDefinition]
    timeline: TimelineNode

def validate_with_retry(raw: str, llm, max_retries: int = 2) -> dict:
    current = raw
    for _ in range(max_retries + 1):
        try:
            parsed = json.loads(current)
            scene = SceneDefinition(**parsed)
            return scene.model_dump(exclude_none=True)
        except (json.JSONDecodeError, ValidationError) as e:
            fix_prompt = f"""Fix this JSON to match SceneDefinition schema.
ERROR: {str(e)}
JSON: {current}
Return ONLY valid JSON."""
            current = llm.invoke(fix_prompt).content

    raise Exception("Failed to generate valid SceneDefinition")

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.3,
    api_key=os.getenv("VITE_GROQ_API_KEY")
)

embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

db = FAISS.load_local(
    os.path.join(os.path.dirname(__file__), "RAG_Databases", "scene_memory_db"),
    embeddings,
    allow_dangerous_deserialization=True
)

STATIC_DOC_FILES = [
    "0-engine-rules-brief.md",
    "1-engine-architecture-and-schemas.md",
    "2-action-primitives.md",
    "3-timeline-and-logic.md",
    "4-appearance-and-assets.md",
    "6-appearance-layers-compact.md",
]

RAG_DOCS_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "rag_docs")

def load_static_docs() -> str:
    sections = []
    for filename in STATIC_DOC_FILES:
        filepath = os.path.join(RAG_DOCS_DIR, filename)
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                sections.append(f.read())
        except FileNotFoundError:
            pass
    return "\n\n---\n\n".join(sections)

STATIC_CONTEXT = load_static_docs()


# ─── Neo4j (commented out for now) ─────────────────────────────────────────

# driver = GraphDatabase.driver(
#     os.getenv("NEO4J_URI"),
#     auth=(os.getenv("NEO4J_USER"), os.getenv("NEO4J_PASSWORD"))
# )
#
# def query_action_relationships(actions):
#     with driver.session() as session:
#         result = session.run(
#             """
#             MATCH (a {id:$action})-[r]->(b)
#             RETURN a.id AS action, type(r) AS relation, b.id AS target
#             """,
#             {"action": actions}
#         )
#         return [record.data() for record in result]
#
# def query_entity_relationships(entities):
#     with driver.session() as session:
#         result = session.run(
#             """
#             MATCH (a)-[r]->(b)
#             WHERE a.id IN $entities OR b.id IN $entities
#             RETURN a.id AS source, type(r) AS relation, b.id AS target
#             """,
#             {"entities": entities}
#         )
#         return [record.data() for record in result]


_session_total = 0

def _log_usage(response) -> None:
    global _session_total
    t = response.response_metadata.get("token_usage", {}).get("total_tokens", 0)
    _session_total += t
    print(f"Tokens this request: {t:,} | Total used today (session): {_session_total:,}")

def generate_scene(user_prompt: str) -> dict:
    similar_docs = db.similarity_search(user_prompt, k=3)
    examples_text = "\n\n".join(doc.page_content for doc in similar_docs)

    prompt = f"""You are a 2D animation scene generator for a PixiJS engine.

=== ENGINE DOCUMENTATION ===
{STATIC_CONTEXT}

=== SIMILAR SCENE EXAMPLES (use these as reference) ===
{examples_text}

=== USER REQUEST ===
{user_prompt}

=== INSTRUCTIONS ===
Generate a complete, valid SceneDefinition JSON for the user's request.
- Follow the engine rules and schemas from the documentation above.
- Use ONLY actions from the Action Primitives Catalog.
- Include proper appearance for all characters (body, head, torso, legs, feet, gloves at minimum).
- Use valid backgrounds: park, city, forest, mountain, beach, desert.
- Add wait steps (300-500ms) between physical actions on the same entity.
- Ensure all entity IDs referenced in the timeline exist in the entities array.
- Don't use undefined/null values for any fields.
- Every entity MUST include: id, position, scale, appearance, and attachments (even if empty).
- Return ONLY the JSON object. No explanations, no markdown fences.
"""
    response = llm.invoke(prompt)
    _log_usage(response)
    raw = clean_llm_json(response.content)

    try:
        return validate_with_retry(raw, llm)
    except Exception:
        return {"error": "Invalid scene", "raw_scene": response.content}


app_api = FastAPI()
app_api.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app_api.post("/generate_scene")
def generate_scene_api(req: PromptRequest):
    try:
        return generate_scene(req.prompt)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))