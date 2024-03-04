import { useEffect } from "react";
import useChatStore from "../store/chatStore";
import useSocketContext from "./useSocketContext";

const useListenMessages = () => {
   const { socket } = useSocketContext();
   const addNewMessage = useChatStore((state) => state.addNewMessage);

   useEffect(() => {
      if (!socket) return;
      socket.on("newMessage", (newMessage) => {
         addNewMessage(newMessage);
      });

      return () => {
         socket.off("newMessage");
      };
   }, [addNewMessage, socket]);
};
export default useListenMessages;
