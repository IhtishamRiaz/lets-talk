import { useEffect, useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUserStore from "../store/userStore";

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
   const axiosPrivate = useAxiosPrivate();
   const currentUser = useUserStore((state) => state.currentUser);
   const setAllUsers = useUserStore((state) => state.setAllUsers);
   const setOnlineUsers = useUserStore((state) => state.setOnlineUsers);

   const [socket, setSocket] = useState(null);

   useEffect(() => {
      const newSocket = io("http://localhost:8080");

      newSocket.on("connect", () => {
         setSocket(newSocket);
      });

      return () => {
         newSocket.disconnect();
      };
   }, [setSocket]);

   useEffect(() => {
      if (!currentUser._id || socket === null) return;
      socket.emit("addNewUser", currentUser?._id);

      socket.on("getOnlineUsers", (users) => {
         setOnlineUsers(users);
      });

      return () => {
         socket.off("getOnlineUsers");
      };
   }, [currentUser, socket, setOnlineUsers]);

   useEffect(() => {
      if (!socket) return;

      socket.on("updateRequests", async () => {
         const users = await axiosPrivate.get("/user");
         setAllUsers(users.data);
      });
   }, [socket, axiosPrivate, setAllUsers]);

   return (
      <SocketContext.Provider value={{ socket }}>
         {children}
      </SocketContext.Provider>
   );
};

export default SocketContextProvider;
