import { Router } from "express";
import { authController } from "../controller/auth.controller.js";

const router = Router();


router.route("/auth").post(authController)


export default router