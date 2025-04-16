from pydantic import BaseModel
from typing import List, Tuple

class RouteRequest(BaseModel):
    coordinates: List[Tuple[float, float]]  # List of (longitude, latitude)

class RouteResponse(BaseModel):
    distance: float  # in meters
    duration: float  # in seconds
    ordered_coordinates: List[Tuple[float, float]]