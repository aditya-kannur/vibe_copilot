from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.hotel_requests import router as hotel_router
from routes.flight_requests import router as flight_router
from routes.cab_requests import router as cab_router
from routes.transport_requests import router as transport_router
from routes.allowance_requests import router as allowance_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://localhost:5174"  
    ],
    allow_origin_regex="https://vibe-copilot.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
    expose_headers=["*"],  
    max_age=600  
)

app.include_router(hotel_router)
app.include_router(flight_router)
app.include_router(cab_router)
app.include_router(transport_router)
app.include_router(allowance_router)