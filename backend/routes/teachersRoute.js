import express from "express";
import { createTeacher, deleteTeacher, getSingleTeacher, getTeachers, updateTeacher } from "../controllers/teachersController.js";

const teachersRoute= express.Router();


teachersRoute.get("/",getTeachers);
teachersRoute.get("/:name",getSingleTeacher);
teachersRoute.post("/create",createTeacher);
teachersRoute.put("/update/:id",updateTeacher);
teachersRoute.delete("/delete/:id",deleteTeacher);

export default teachersRoute;