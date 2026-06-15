import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import { chatbotRoute } from "./routes/chatbot.js";

dotenv.config();

import { UserRouter } from "./routes/user.js";

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://plantpulse-phi.vercel.app",
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/auth", UserRouter);

app.use("/api", chatbotRoute);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(console.log("MongoDB connected"));

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
