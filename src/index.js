import dotenv from "dotenv";
// require('dotenv').config({path: './env'})
// import 'dotenv/config'

import { app } from "./app.js";
import connectDB from "./db/server.js";
console.log(process.env.DATABASE_URI); 
dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 8000;
connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`Process running at port ${port}`)
    })
})
.catch((err) => {
    console.log("Mongo connection error: ", err)
})