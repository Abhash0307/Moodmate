from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
# from routes.auth import users_db

# Temporary in-memory users_db for development/testing
users_db = {}

router = APIRouter()

class WatchItem(BaseModel):
    username: str
    movie_id: int
    title: str
    poster: str

@router.post("/api/watchlist/add")
def add_to_watchlist(item: WatchItem):
    user = users_db.get(item.username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    if any(i['movie_id'] == item.movie_id for i in user['watchlist']):
        return {"message": "Already in watchlist"}
    user['watchlist'].append(item.dict())
    return {"message": "Added to watchlist"}

@router.post("/api/watchlist/remove")
def remove_from_watchlist(item: WatchItem):
    user = users_db.get(item.username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user['watchlist'] = [m for m in user['watchlist'] if m["movie_id"] != item.movie_id]
    return {"message": "Removed from watchlist"}

@router.get("/api/watchlist/{username}")
def get_watchlist(username: str):
    user = users_db.get(username)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user['watchlist']


