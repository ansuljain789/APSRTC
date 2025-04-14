import mongoose, { Schema, Types, model } from "mongoose";

const schema = new mongoose.Schema({
  stop_code: String,
  stop_id: String,
  stop_lat: Number,
  stop_lon: Number,
  stop_name: String,
  zone_id: String,
});

export const Stop = mongoose.models.Stop || model("Stop", schema);