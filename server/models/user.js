import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema({
        name: { 
            type: String, 
            required: true 
        },
        age: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true 
        },
        mobile: { 
            type: String, 
            required: true 
        },
        address: { 
            type: String, 
            required: true 
        },
        adhar: { 
            type: String, 
            required: true 
        },
        password:{
            type:String,
            required:true
        },
        role: { 
            type: String, 
            enum: ["Admin", "Driver"], 
            required: true 
        }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.models.User || model("User", schema);