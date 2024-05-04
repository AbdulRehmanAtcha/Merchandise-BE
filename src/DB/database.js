import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;

const DBConnectionHandler = async () => {
  try {
    await mongoose.connect(MONGODB_CONNECTION_URL, {
      dbName: DB_NAME,
    });
    console.log("!!! DB CONNECTED !!!");
  } catch (error) {
    console.log("DB Connection Error:", error);
    process.exit(1);
  }
};

export default DBConnectionHandler;
