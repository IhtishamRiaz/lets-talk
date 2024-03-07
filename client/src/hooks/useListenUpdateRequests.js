import { useEffect } from "react";
import useRequestStore from "../store/requestStore";
import useSocketContext from "./useSocketContext";

const useListenUpdateRequests = () => {
   const { socket } = useSocketContext();
   const removeRequest = useRequestStore((state) => state.removeRequest);

   useEffect(() => {
      if (!socket) return;

      socket.on("updateRequests", (requestId) => {
         removeRequest(requestId);
         console.log("Updating Requests");
      });

      return () => {
         socket.off("updateRequests");
      };
   }, [socket, removeRequest]);
};

export default useListenUpdateRequests;
