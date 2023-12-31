import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoutes.js";
import usersRoute from "./routes/userRoutes.js";
import roomsRoute from "./routes/roomRoutes.js";
import hotelsRoute from "./routes/hotelRoutes.js";

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
app.use((req, res, next) => {
  console.log(req.url);
  next();
});
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//Error handling middleware
app.use((err, req, res, next) => {
  const errorState = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorState).json({
    success: false,
    status: errorState,
    message: errorMessage,
    stack: err.stack,
  });
});

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
