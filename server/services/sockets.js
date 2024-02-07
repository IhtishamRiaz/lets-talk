import { Server } from "socket.io";
import http from "http";
import express from "express";
import allowedOrigins from "../config/allowedOrigins.js";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
   cors: {
      allowedOrigins,
   },
});

let onlineUsers = [];

const getUserSocketId = (userId) => {
   const user = onlineUsers.find((user) => user.userId === userId);
   return user?.socketId;
};

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

   // Requests Sockets
   socket.on("sendRequest", () => {
      io.emit("updateRequests");
   });
});

export { server, app, io, getUserSocketId };
