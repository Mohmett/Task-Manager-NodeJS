import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import morgan from "morgan";
import studentsRoute from "./routes/studentsRoute.js";
import teachersRoute from "./routes/teachersRoute.js";
import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import { globalError } from "./middlewares/globalError.js";
import authRoute from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import uploadRoute from "./routes/upload.js";
import tasksRoute from "./routes/tasksRoute.js";

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
//////////////////// ROUTES \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use('/students', studentsRoute);
app.use('/teachers', teachersRoute);
app.use('/auth', authRoute);
app.use('/dashboard', adminRoutes);
app.use('/upload',uploadRoute);
app.use("/tasks", tasksRoute)
///////////////////SWAGGER \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use("/docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

//////////////////// NOT FOUND MIDDLEWARE \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use(notFound)
app.use(globalError); //Last Middleware

///////////////////MONGO DB\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

mongoose.connect(process.env.NODE_ENV=="development" ? process.env.MONGO_URI_DEV :process.env.MONGO_URI_PRO)
.then(()=>console.log("✅ Connected to MongoDB Successfully!"))
.catch((error)=>console.log("❌Error:",error))


///////////////////APP LISTEN \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`)
})
