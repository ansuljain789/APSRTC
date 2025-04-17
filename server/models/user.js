import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    aadharCardNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "driver"], // Add "Conductor" to match frontend
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.models.User || model("User", schema);
