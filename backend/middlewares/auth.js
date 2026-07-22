import jwt from "jsonwebtoken";
import studentSchema from "../models/studentsModel.js";

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "There is no Token" });

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log("midd/auth-Decoded Info:", decode);
        req.student = await studentSchema.findById(decode.id).select("-password");
        next();
    } catch (error) {
        res.status(401).send("Invalid or expired token");
    }

}