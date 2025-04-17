import React, { useEffect, useState } from "react";
import MapView from "../../components/(MLOPs)/MapView";
import axios from "axios";

const RoutePlannerMLOPs = () => {
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    axios.post("http://127.0.0.1:8000/optimize-route", {
      coordinates: [
        [77.61981631
            , 12.97251111
        ],
        [77.62159964
            , 12.97281667
        ],
        [77.64033296
            , 12.98395
        ],
        [77.66351629
            , 12.99415
        ]
      ]
    }).then(res => {
      setCoords(res.data.ordered_coordinates);
    }).catch(console.error);
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "1rem" }}>Optimized Bus Route</h2>
      <MapView coordinates={coords} />
    </div>
  );
};

export default RoutePlannerMLOPs;
