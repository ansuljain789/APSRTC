from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from models import RouteRequest, RouteResponse
from osrm_client import get_optimized_route
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Define allowed origins — you can add more if needed
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,          # Only allow your frontend origin
    allow_credentials=True,
    allow_methods=["*"],            # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],            # Allow all headers
)

@app.post("/optimize-route", response_model=RouteResponse)
def optimize_route(data: RouteRequest):
    try:
        return get_optimized_route(data.coordinates)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))