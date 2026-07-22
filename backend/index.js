import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import studentsRoute from "./routes/studentsRoute.js";
import teachersRoute from "./routes/teachersRoute.js";
import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import { globalError } from "./middlewares/globalError.js";
import authRoute from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import uploadRoute from "./routes/upload.js";
import tasksRoute from "./routes/tasksRoute.js";
import path from "path"
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express"
import { swaggerSpec } from "./utils/sawagger.js";
import { limiter } from "./middlewares/ratelimiter.js";



const app= express();
const PORT = process.env.PORT;


////////////////////  MIDDLEWARES \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use(express.json());
app.use(logger);
app.use(limiter)
app.use(morgan('combined'))
app.use(cors(
    {
        origin:["http://localhost:5173"]
    }
))
//////////////////// ROUTES \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use('/api/students', studentsRoute);
app.use('/api/teachers', teachersRoute);
app.use('/api/auth', authRoute);
app.use('/api/dashboard', adminRoutes);
app.use('/api/upload',uploadRoute);
app.use('/api/tasks', tasksRoute)
app.use('/api/', (req,res)=>{
    res.send("System Health is Good 😁");
})
///////////////////SWAGGER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use("/api/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));


// Server frontend in production
if(process.env.MONGO_URI_DEV == "production"){
    const _dirname= path.dirname(fileURLToPath(import.meta.url));
    app.use(express.static(path.join(_dirname,'../frontend/dist')));

    // serve frontend
    app.get(/.*/, (req,res)=>{
        res.send(path.join(_dirname,'..','frontend','dist','index.html'));
    })
};



//////////////////// NOT FOUND MIDDLEWARE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use(notFound)
app.use(globalError); //Last Middleware



///////////////////MONGO DB\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

mongoose.connect(process.env.NODE_ENV=="development" ? process.env.MONGO_URI_DEV : process.env.MONGO_URI_PRO)
.then(()=>console.log("✅ Connected to MongoDB Successfully!"))
.catch((error)=>console.log("❌Error:",error))


///////////////////APP LISTEN \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`)
})


