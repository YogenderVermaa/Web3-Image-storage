import { Router } from "express";
import { authController } from "../controller/auth.controller";

const router = Router();


router.route("/auth").post(authController)


export default router