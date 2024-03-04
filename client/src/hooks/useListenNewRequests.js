import { useEffect } from "react";
import useRequestStore from "../store/requestStore";
import useSocketContext from "./useSocketContext";

const useListenNewRequests = () => {
   const { socket } = useSocketContext();
   const addNewRequest = useRequestStore((state) => state.addNewRequest);

   useEffect(() => {
      if (!socket) return;
      socket.on("newRequest", (newRequest) => {
         addNewRequest(newRequest);
      });

      return () => {
         socket.off("newRequest");
      };
   }, [socket, addNewRequest]);
};

export default useListenNewRequests;
