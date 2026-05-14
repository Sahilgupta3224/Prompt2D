from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import re
import os

EXAMPLES_FILE = os.path.join(
    os.path.dirname(__file__), "..", "..", "..", "rag_docs", "5-100-examples.md"
)

def parse_examples(filepath: str) -> list[Document]:
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    chunks = re.split(r"(?=## Example \d+:)", content)

    documents = []
    for chunk in chunks:
        chunk = chunk.strip()
        if not chunk.startswith("## Example"):
            continue

        header_match = re.match(r"## Example (\d+):\s*(.+)", chunk)
        if not header_match:
            continue

        example_num = header_match.group(1)
        description = header_match.group(2).strip()

        documents.append(
            Document(
                page_content=chunk,
                metadata={
                    "example_num": example_num,
                    "prompt": description,
                }
            )
        )

    return documents


if __name__ == "__main__":

    documents = parse_examples(EXAMPLES_FILE)

    if not documents:
        exit(1)

    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )
    print("Building FAISS index")
    db = FAISS.from_documents(documents, embeddings)
    db.save_local(os.path.join(os.path.dirname(__file__), "scene_memory_db"))