import { useEffect, useState } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useUserStore from "../store/userStore";
import useRequestStore from "../store/requestStore";

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
   // const axiosPrivate = useAxiosPrivate();
   // const setAllUsers = useUserStore((state) => state.setAllUsers);
   const currentUser = useUserStore((state) => state.currentUser);
   const setOnlineUsers = useUserStore((state) => state.setOnlineUsers);
   const addNewRequest = useRequestStore((state) => state.addNewRequest);
   const allRequests = useRequestStore((state) => state.allRequests);

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

   return (
      <SocketContext.Provider value={{ socket }}>
         {children}
      </SocketContext.Provider>
   );
};

export default SocketContextProvider;
