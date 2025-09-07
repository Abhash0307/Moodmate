from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import face_detection 
from routes import chatbot
from routes import movie
from routes import  auth
from database import engine
from models import user
from routes import Music



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
user.Base.metadata.create_all(bind=engine)
app.include_router(face_detection.router)
app.include_router(chatbot.router, prefix="/api")
app.include_router(movie.router)
app.include_router(auth.router)
app.include_router(Music.router)




# Register the router





