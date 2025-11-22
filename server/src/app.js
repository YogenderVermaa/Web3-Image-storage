import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {errorHandler} from "./middleware/errors.middlewares.js";
import authRouter from "./routes/auth.route.js"
import uploadImageRouter from "./routes/uploadImage.route.js"


const app = express()
console.log("cors:",process.env.CORS_ORIGIN)
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization","selected-address"],
}))
console.log("cross-origin",process.env.CORS_ORIGIN)
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({
    limit:"16kb",
    credentials:true
}))

app.use("/api",authRouter)
app.use("/api",uploadImageRouter)

app.use(errorHandler)





export  {app}