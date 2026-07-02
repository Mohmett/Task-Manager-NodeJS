import express from "express";
import {createStudent, deleteStudent, getSingleStudent, getStudents, updateStudent } from "../controllers/studentsController.js";

const studentsRoute= express.Router();


studentsRoute.get('/',getStudents);
studentsRoute.get('/:id',getSingleStudent)
studentsRoute.post('/create',createStudent);
// studentsRoute.post('/login',registerStudent);
studentsRoute.delete('/delete/:id', deleteStudent);
studentsRoute.put('/update/:id', updateStudent);



export default studentsRoute;