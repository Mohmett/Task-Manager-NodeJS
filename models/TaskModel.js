import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { 
        type: String, 
        enum: ["pending", "in progress", "completed"], 
        default: "pending"
    },
    expiryDate: Date,
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Students"},

}, { timestamps: true }
);


export default mongoose.model("Task",taskSchema);