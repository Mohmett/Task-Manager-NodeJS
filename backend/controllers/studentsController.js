import studentSchema from '../models/studentsModel.js'
import { generateToken } from '../utils/generateToken.js';

export const createStudent = async (req, res, next) => {

    let { name, email, password } = req.body;
    try {
        email = email.toLowerCase();
        const exists = await studentSchema.findOne({ email });
        if (exists) return res.status(400).json({ message: "Email already in Use" });

        const student = await studentSchema.create({ name, email, password });
        const token = generateToken(student._id);
        console.log(student);
        res.status(201).json({ token });

    } catch (err) {
        console.log(err)
        next(err);
    }
}

export const getStudents = async (req, res) => {
    // console.log(req.body)
    const students = await studentSchema.find()
    if (students.length < 1) return res.status(200).send("No Students registered Yet!");
    res.json(students);
}

export const getSingleStudent = async (req, res) => {
    const student = await studentSchema.findById(req.params.id);
    if (!student) return res.status(404).send(`${req.params.id} not Found`);
    res.json(student);
}

export const updateStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedStudent = await studentSchema.findByIdAndUpdate(id, req.body, { new: true })
        if (!updatedStudent) {
            return res.status(404).send("User not Found")
        };
        res.json(updatedStudent)
    } catch (error) {
        res.send(error);
    }
}

export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStudent = await studentSchema.findByIdAndDelete(id, { new: true });
        if (!deletedStudent) {
            return res.status(404).send(`User ${id} already was not registered`)
        };
        res.send(`Student ${id} was deleted Successfuly`);
    } catch (error) {
        res.send(error);
    }
}