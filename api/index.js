import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

import authRoute from "./routes/auth.js";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected successfully!");
  } catch (error) {
    throw error;
  }
};

//Middlewares
app.use("/auth", authRoute);

mongoose.connection.on("disconnected", () => {
  console.log("MongoDb disconnected!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDb connected!");
});

app.listen(8800, () => {
  connect();
  console.log("connected to backend");
});
