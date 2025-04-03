from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.hotel_requests import router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://vibe-copilot.vercel.app",
        "http://localhost:3000",
        "https://localhost:3000"  
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  
    allow_headers=["*"],
    expose_headers=["*"],  
    max_age=600  
)

app.include_router(router)