import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

//to accept the json data
app.use(express.json({limit: "16kb"}))

//urlecoded is used to decrypt the encrypted url recived by the express
app.use(express.urlencoded({extended: true, limit:"16kb"}))

//static is used to store the assets like favicong or images
app.use(express.static("public"))


export {app}