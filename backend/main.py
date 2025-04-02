from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.hotel_requests import router

app = FastAPI()

# CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# API routes
app.include_router(router)
