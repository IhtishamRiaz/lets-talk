import { useEffect } from "react";
import useSocketContext from "./useSocketContext";
import { useQueryClient } from "@tanstack/react-query";

const useListenUpdateRequests = () => {
   const { socket } = useSocketContext();
   const queryClient = useQueryClient();

   useEffect(() => {
      if (!socket) return;

      socket.on("updateRequests", () => {
         queryClient.invalidateQueries({ queryKey: ["Requests"] });
         console.log("Updating Requests");
      });

      return () => {
         socket.off("updateRequests");
      };
   }, [socket, queryClient]);
};

export default useListenUpdateRequests;
