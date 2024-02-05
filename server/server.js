import express from "express";
import { Server } from "socket.io";
import http from "http";
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
import allowedOrigins from "./config/allowedOrigins.js";

dotenv.config();
const app = express();

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

// let expressServer;
mongoose.connection.once("open", () => {
   console.log("Connected to MongoDB");
   // const PORT = process.env.PORT || 8080;
   // expressServer = app.listen(PORT, () =>
   //    console.log(`Server Running on port ${process.env.PORT}`)
   // );
});

mongoose.connection.on("error", (error) => {
   console.log(error);
   logEvents(
      `${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`,
      "mongoErrLog.log"
   );
});

const expressServer = http.createServer(app);
const PORT = process.env.PORT || 8080;

const io = new Server(expressServer, {
   cors: {
      origin: allowedOrigins,
   },
});

let onlineUsers = [];

io.on("connection", (socket) => {
   socket.on("addNewUser", (userId) => {
      !onlineUsers.some((user) => user.userId === userId) &&
         onlineUsers.push({
            userId,
            socketId: socket.id,
         });

      io.emit("getOnlineUsers", onlineUsers);
   });

   socket.on("disconnect", () => {
      onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
      io.emit("getOnlineUsers", onlineUsers);
   });

   socket.on("sendMessage", (data) => {
      console.log(data);

      const user = onlineUsers.find((user) => user.userId === data.receiverId);
      if (!user) return;

      io.to(user.socketId).emit("getMessage", {
         chatId: data.chatId,
         content: data.content,
         senderId: data.senderId,
         createdAt: Date.now(),
      });
   });
});

expressServer.listen(PORT, () => {
   console.log(`Server Running on port ${process.env.PORT}`);
});
