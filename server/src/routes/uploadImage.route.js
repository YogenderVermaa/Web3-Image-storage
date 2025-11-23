import { Router } from "express";
import {uploadImageController} from "../controller/uploadImage.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router()
 
router.route("/upload-image").post(verifyJWT,upload.single('file'),uploadImageController)


export default router