import { Router } from "express";
import {uploadImageController} from "../controller/uploadImage.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router()
 
router.route("/upload-image").post(upload.single('file'),uploadImageController)


export default router