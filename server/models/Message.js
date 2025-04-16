import mongoose, { Schema, Types, model } from "mongoose";

const schema = new Schema(
  {
    sender: { 
        type: String, 
        default: 'admin' 
    }, // or can be a reference to Admin model if needed
    recipient: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Crew', required: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Message = mongoose.models.Message || model("Message", schema)