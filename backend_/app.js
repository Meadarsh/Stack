import  express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"
import fileUpload from "express-fileupload";
const app=express()

console.log('Current working directory:', process.cwd());

app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials: true,
}));


app.use(express.json({
    limit:"100mb",
}))
app.use(express.urlencoded({
    extended:true,
    limit:"100mb"
}))
app.use(cookieParser())

import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users",userRouter)

export {app}
