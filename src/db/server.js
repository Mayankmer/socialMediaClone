import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`);
        console.log(`Database connected at host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Databse connection error", error);
        process.exit(1);
    }
}
export default connectDB;
