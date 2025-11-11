import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {errorHandler} from "./middleware/errors.middlewares.js";
import { authController } from "./controller/auth.controller.js";



const app = express()
console.log("cors:",process.env.CORS_ORIGIN)
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"],
}))
console.log("cross-origin",process.env.CORS_ORIGIN)
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({
    limit:"16kb",
    credentials:true
}))

app.use("/api",authController)

app.use(errorHandler)





export  {app}