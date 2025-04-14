import mongoose, { Schema, Types, model } from "mongoose";

const schema = new mongoose.Schema({
  trip_id: String,
  arrival_time: String,
  departure_time: String,
  stop_id: String,
  stop_sequence: Number,
});

export const StopTime = mongoose.models.StopTime || model("StopTime", schema);