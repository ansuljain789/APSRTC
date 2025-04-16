import requests
from typing import List, Tuple
from models import RouteResponse

OSRM_BASE_URL = "http://router.project-osrm.org/trip/v1/driving/"

def get_optimized_route(coordinates: List[Tuple[float, float]]) -> RouteResponse:
    coord_str = ";".join([f"{lon},{lat}" for lon, lat in coordinates])
    url = f"{OSRM_BASE_URL}{coord_str}?source=first&roundtrip=false"

    response = requests.get(url)
    if response.status_code != 200:
        raise Exception("OSRM request failed")

    data = response.json()
    if "trips" not in data or not data["trips"]:
        raise Exception("No route found")

    trip = data["trips"][0]
    waypoints = data["waypoints"]
    
    # Sort coordinates by waypoint order
    sorted_coords = [coordinates[wp['waypoint_index']] for wp in sorted(waypoints, key=lambda x: x['waypoint_index'])]

    return RouteResponse(
        distance=trip["distance"],
        duration=trip["duration"],
        ordered_coordinates=sorted_coords
    )
