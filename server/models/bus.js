import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema({
        vehicleId: { 
            type: String, 
            required: true 
        },
        latitude: { 
            type: Number, 
            required: true 
        },
        longitude: { 
            type: Number, 
            required: true 
        },
        tripId: { 
            type: String, 
            required: true 
        },
    },
    {
        timestamps: true
    }
);

export const Bus = mongoose.models.Bus || model("Bus", schema)