import { useEffect } from "react";
import useSocketContext from "./useSocketContext";
import { useQueryClient } from "@tanstack/react-query";

const useListenUpdateRequests = () => {
   const { socket } = useSocketContext();
   const queryClient = useQueryClient();

   useEffect(() => {
      if (!socket) return;

      socket.on("updateUsers", () => {
         queryClient.invalidateQueries({ queryKey: ["Users"] });
         console.log("Updating Users");
      });

      return () => {
         socket.off("updateUsers");
      };
   }, [socket, queryClient]);
};

export default useListenUpdateRequests;
