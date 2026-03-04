from dotenv import load_dotenv
load_dotenv()

import json
from typing import TypedDict, List, Dict

from langchain_groq import ChatGroq
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from langgraph.graph import StateGraph, END

class SceneState(TypedDict):
    prompt: str
    intent: Dict
    retrieved_scenes: List[Dict]
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


def planner_agent(state: SceneState):

    prompt = f"""
You are a scene planning AI.

USER INTENT:
{state['intent']}

REFERENCE SCENES:
{state['retrieved_scenes']}

Create NEW timeline plan.

Return JSON:
{{
 "timeline":[]
}}
"""

    response = llm.invoke(prompt)

    try:
        plan = json.loads(response.content)
    except:
        plan = {"raw_plan": response.content}

    state["plan"] = plan
    return state

def scene_builder_agent(state: SceneState):

    prompt = f"""
Build FINAL SceneDefinition.

INTENT:
{state['intent']}

PLAN:
{state['plan']}

Return STRICT JSON SceneDefinition.
"""

    response = llm.invoke(prompt)

    try:
        final_scene = json.loads(response.content)
    except:
        final_scene = {"raw_scene": response.content}

    state["final_scene"] = final_scene
    return state

def timeline_runner(state: SceneState):

    print("FINAL TIMELINE RUNNER SCENE")
    print(json.dumps(state["final_scene"], indent=2))

    return state

workflow = StateGraph(SceneState)

workflow.add_node("intent_agent", intent_agent)
workflow.add_node("retrieve_scene_agent", retrieve_scene_agent)
workflow.add_node("planner_agent", planner_agent)
workflow.add_node("scene_builder_agent", scene_builder_agent)
workflow.add_node("timeline_runner", timeline_runner)

workflow.set_entry_point("intent_agent")

workflow.add_edge("intent_agent", "retrieve_scene_agent")
workflow.add_edge("retrieve_scene_agent", "planner_agent")
workflow.add_edge("planner_agent", "scene_builder_agent")
workflow.add_edge("scene_builder_agent", "timeline_runner")
workflow.add_edge("timeline_runner", END)

app = workflow.compile()

if __name__ == "__main__":

    result = app.invoke({
        "prompt": "A girl playing football happily in park"
    })