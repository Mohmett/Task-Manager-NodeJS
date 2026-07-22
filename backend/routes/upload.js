import express from 'express'
import { protect } from '../middlewares/auth.js';
import { upload } from '../middlewares/upload.js';
import { fileUpload } from '../controllers/uploadController.js';

const uploadRoute=express.Router();


uploadRoute.post("/upload-file",protect,upload.single("file"),fileUpload);

export default uploadRoute;