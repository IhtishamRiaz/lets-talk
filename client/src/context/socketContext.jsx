import { useEffect, useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUserStore from "../store/userStore";
import useAuthStore from "../store/authStore";

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
   // const axiosPrivate = useAxiosPrivate();
   const currentUserId = useAuthStore((state) => state.userId);
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
      if (!currentUserId || socket === null) return;
      socket.emit("addNewUser", currentUserId);

      socket.on("getOnlineUsers", (users) => {
         setOnlineUsers(users);
      });

      return () => {
         socket.off("getOnlineUsers");
      };
   }, [currentUserId, socket, setOnlineUsers]);

   return (
      <SocketContext.Provider value={{ socket }}>
         {children}
      </SocketContext.Provider>
   );
};

export default SocketContextProvider;
