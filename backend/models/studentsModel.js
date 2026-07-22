import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";


const studentSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    }
})

studentSchema.pre("save", async function (next){
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt);
})

studentSchema.methods.comparePassword= async function (inputPassword){
    return await bcrypt.compare(inputPassword,this.password);
}

const Students = mongoose.model('Students', studentSchema);
export default Students;