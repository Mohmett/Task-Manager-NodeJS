import express from "express"
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/authorize.js";
const adminRoutes = express.Router();

adminRoutes.get("/admin",protect,authorize("admin"), (req,res)=>{
    res.json(`${req.student.name},Welcome to the Admin dashboard`);
})

export default adminRoutes;