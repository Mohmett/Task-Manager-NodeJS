import mongoose from "mongoose";

const teachersSchema= new mongoose.Schema({
    name:String,
    sex:String,
});

const TeachersModel= mongoose.model("TeachersModel",teachersSchema);
export default TeachersModel;