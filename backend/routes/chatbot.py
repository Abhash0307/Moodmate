from fastapi import APIRouter
from pydantic import BaseModel
from models.chatbot_model import generate_response

router = APIRouter()

class ChatRequest(BaseModel):
    emotion: str
    message: str

@router.post("/chatbot_response")
def chatbot_reply(req: ChatRequest):
    reply = generate_response(req.emotion, req.message)
    return {"message": reply}
