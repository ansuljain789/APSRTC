import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema({
  vehicle_id: { 
    type: String, 
    required: true, 
    unique: true 
},
  trip_id: { 
    type: String, 
    required: true 
},
  route_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Route" 
},
  latitude: { 
    type: Number, 
    required: true 
},
  longitude: { 
    type: Number, 
    required: true 
},
  next_stop: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Stop" 
},
  directions: { 
    type: String 
},
  timestamp: { 
    type: Number, 
    required: true 
},
}, { collection: 'live_buses' });

export const LiveBus = mongoose.models.LiveBus || model("LiveBus", schema);