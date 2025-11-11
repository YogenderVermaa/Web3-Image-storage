import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {errorHandler} from "./middleware/errors.middlewares.js"



const app = express()
app.use(cors({
    origin:process.env.CROSS_ORIGIN,
    credentials:true,
    methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"],
}))
app.use(cookieParser())
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({
    limit:"16kb",
    credentials:true
}))

app.use("/api",autController)

app.use(errorHandler)





export  {app}