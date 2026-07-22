import studentSchema from '../models/studentsModel.js'
import { generateToken } from "../utils/generateToken.js";

export const registerStudent = async (req, res, next) => {

    let { name, email, password, role} = req.body;
    try {
        email = email.toLowerCase();
        const exists = await studentSchema.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already in Use" });

        const student = await studentSchema.create({ name, email, password, role });
        const token = generateToken(student._id);
        console.log(student);
        res.status(201).json({ token });

    } catch (err) {
        console.log(err)
        next(err);
    }
}


export const login = async (req, res, next) => {
    let { email, password } = req.body;
    try {
        const student = await studentSchema.findOne({ email: email.trim().toLowerCase() });
        if (!student || !(await student.comparePassword(password))) {
            return res.status(401).json({ message: "Email or Password incorrect" })
        }
        const token = generateToken(student._id);
        console.log(student);
        student.password = undefined; // Remove password from the response
        res.json({token,student});
    } catch (error) {
        next(error);
    }

}