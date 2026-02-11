from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from routes.hotel_requests import router as hotel_router
from routes.flight_requests import router as flight_router
from routes.cab_requests import router as cab_router
from routes.transport_requests import router as transport_router
from routes.allowance_requests import router as allowance_router

app = FastAPI()

# UPDATED CORS CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://localhost:5174",
        "https://vibe-copilot.vercel.app",
        "https://vibe-copilot-git-feat-implement-90b885-aditya-kannurs-projects.vercel.app"
    ],
    allow_origin_regex=r"https://vibe-copilot-.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
    expose_headers=["*"],  
    max_age=600  
)

#  MANUAL PREFLIGHT HANDLER 
@app.options("/{rest_of_path:path}")
async def preflight_handler(request: Request, rest_of_path: str):
    response = Response()
    origin = request.headers.get("Origin")
    if origin:
        response.headers["Access-Control-Allow-Origin"] = origin
    response.headers["Access-Control-Allow-Methods"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response

# ROUTERS
app.include_router(hotel_router)
app.include_router(flight_router)
app.include_router(cab_router)
app.include_router(transport_router)
app.include_router(allowance_router)