import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {getImage} from "../controller/getImage.controller.js"

const router = Router()


router.route("/getImage").post(verifyJWT,getImage)


export default router