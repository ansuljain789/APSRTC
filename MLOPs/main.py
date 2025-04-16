from fastapi import FastAPI, HTTPException
from models import RouteRequest, RouteResponse
from osrm_client import get_optimized_route

app = FastAPI()

@app.post("/optimize-route", response_model=RouteResponse)
def optimize_route(data: RouteRequest):
    try:
        return get_optimized_route(data.coordinates)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))