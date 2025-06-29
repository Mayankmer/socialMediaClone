import dotenv from "dotenv";
// require('dotenv').config({path: './env'})
// import 'dotenv/config'

import connectDB from "./db/server.js";
console.log(process.env.DATABASE_URI); 
dotenv.config({
    path: './.env'
})

connectDB()