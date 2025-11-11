import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./DB/index.js";

const port = process.env.PORT || 3000;
connectDB()
.then(() => {
    app.listen(port,() => {
    console.log(`App is listining at port : ${port}`)
})
})
.catch((error) => {
    console.log("mongodb Connection error:",error)
    process.exit(1)
})