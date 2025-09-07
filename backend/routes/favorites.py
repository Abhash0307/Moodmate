from fastapi import APIRouter, Request
from typing import List
from pydantic import BaseModel

router = APIRouter()

favorites_db = {}  # Ideally replace with real database

class Book(BaseModel):
    id: str
    title: str
    author: str
    summary: str
    image: str

@router.get("/api/favorites")
def get_favorites(request: Request):
    user_id = request.cookies.get("user_id", "guest")
    return favorites_db.get(user_id, [])

@router.post("/api/favorites")
def save_book(book: Book, request: Request):
    user_id = request.cookies.get("user_id", "guest")
    if user_id not in favorites_db:
        favorites_db[user_id] = []
    if not any(b['id'] == book.id for b in favorites_db[user_id]):
        favorites_db[user_id].append(book.dict())
    return {"message": "Book saved."}
