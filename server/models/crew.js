import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema({
        name: { 
            type: String, 
            required: true 
        },
        shift: { 
            type: String, 
            enum: ["morning", "afternoon", "evening"], 
            required: true 
        },
        tempShift: { 
            type: String, 
            enum: ["morning", "afternoon", "evening"], 
            default: null 
        },
        tempShiftDate: { 
            type: String, 
            default: null 
        },
        nextWeekShift: { 
            type: String, 
            enum: ["morning", "afternoon", "evening"], 
            default: null 
        },
        status: { 
            type: String, 
            enum: ["active", "assigned", "resting"], 
            default: "active" 
        },
        assignedBus: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Bus", 
            default: null 
        },
        assignedBusVehicleId: { 
            type: String, 
            default: null 
        },
        lastAssignedBus: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Bus", 
            default: null 
        },
        restUntil: { 
            type: String, 
            default: null 
        },
        shiftStartTime: { 
            type: String, 
            required: true 
        },
        shiftEndTime: { 
            type: String, 
            required: true 
        },
        currentShiftStartDate: { 
            type: String, 
            required: true 
        }
    },
    {
        timestamps: true
    }
);

export const Crew = mongoose.models.Crew || model("Crew", schema);