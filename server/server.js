import express from "express";
import { app, server } from "./services/sockets.js";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDB from "./config/dbConn.js";
import mongoose from "mongoose";
import { logger, logEvents } from "./middleware/logger.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler.js";
import corsOptions from "./config/corsOptions.js";
import verifyJWT from "./middleware/verifyJWT.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import requestRoutes from "./routes/requestRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 8080;

ConnectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/request", verifyJWT, requestRoutes);
app.use("/chat", verifyJWT, chatRoutes);
app.use("/message", verifyJWT, messageRoutes);

app.use(errorHandler);

mongoose.connection.once("open", () => {
   console.log("Connected to MongoDB");
   server.listen(PORT, () => {
      console.log(`Server Running on port ${process.env.PORT}`);
   });
});

mongoose.connection.on("error", (error) => {
   console.log(error);
   logEvents(
      `${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`,
      "mongoErrLog.log"
   );
});
