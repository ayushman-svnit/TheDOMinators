from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from langchain_core.messages import HumanMessage,AIMessage
from rag_agent import ask_question

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

class Message(BaseModel):
    id: int
    text: str
    sender: str  # 'user', 'bot'


class AskRequest(BaseModel):
    question: List[Message]

@app.post("/ask")
def ask_route(request: AskRequest):
    try:
        lc_messages = []
        for msg in request.question:  # <-- changed from 'messages' to 'request.question'
            if msg.sender == "user":
                lc_messages.append(HumanMessage(content=msg.text))
            elif msg.sender == "bot":
                lc_messages.append(AIMessage(content=msg.text))
        response = ask_question(lc_messages)
        return {"answer": response}
    except Exception as e:
        return {"error": str(e)}
