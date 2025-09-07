# # from fastapi import APIRouter, HTTPException
# # from pydantic import BaseModel

# # router = APIRouter()

# # # Simple in-memory user store
# # users_db = {}

# # class User(BaseModel):
# #     username: str
# #     password: str

# # @router.post("/api/register")
# # def register(user: User):
# #     if user.username in users_db:
# #         raise HTTPException(status_code=400, detail="User already exists")
# #     users_db[user.username] = {"password": user.password, "watchlist": []}
# #     return {"message": "User registered"}

# # @router.post("/api/login")
# # def login(user: User):
# #     stored = users_db.get(user.username)
# #     if not stored or stored["password"] != user.password:
# #         raise HTTPException(status_code=401, detail="Invalid credentials")
# #     return {"message": "Login successful"}

# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session
# from pydantic import BaseModel
# from passlib.hash import bcrypt
# from database import SessionLocal
# from models.user import User

# router = APIRouter()

# class UserInput(BaseModel):
#     username: str
#     password: str

# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# @router.post("/api/register")
# def register(user: UserInput, db: Session = Depends(get_db)):
#     existing = db.query(User).filter(User.username == user.username).first()
#     if existing:
#         raise HTTPException(status_code=400, detail="User already exists")

#     hashed_pw = bcrypt.hash(user.password)
#     new_user = User(username=user.username, hashed_password=hashed_pw)
#     db.add(new_user)
#     db.commit()
#     return {"message": "User registered"}

# @router.post("/api/login")
# def login(user: UserInput, db: Session = Depends(get_db)):
#     found = db.query(User).filter(User.username == user.username).first()
#     if not found or not bcrypt.verify(user.password, found.hashed_password):
#         raise HTTPException(status_code=401, detail="Invalid credentials")

#     return {"message": "Login successful"}



from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from passlib.hash import bcrypt
from database import SessionLocal
from models.user import User

router = APIRouter()

class UserInput(BaseModel):
    username: str
    password: str

# DB Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/api/register")
def register(user: UserInput, db: Session = Depends(get_db)):
    if db.query(User).filter(User.username == user.username).first():
        raise HTTPException(status_code=400, detail="Username already taken")
    hashed_pw = bcrypt.hash(user.password)
    new_user = User(username=user.username, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    return {"message": "✅ Registered successfully!"}

@router.post("/api/login")
def login(user: UserInput, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == user.username).first()
    if not existing or not bcrypt.verify(user.password, existing.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "✅ Login successful"}

