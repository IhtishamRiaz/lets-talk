import { useEffect } from "react";
import useRequestStore from "../store/requestStore";
import useSocketContext from "./useSocketContext";
import useAxiosPrivate from "./useAxiosPrivate";
import useUserStore from "../store/userStore";

const useListenUpdateRequests = () => {
   const { socket } = useSocketContext();
   const removeRequest = useRequestStore((state) => state.removeRequest);
   const axiosPrivate = useAxiosPrivate();
   const setAllUsers = useUserStore((state) => state.setAllUsers);

   useEffect(() => {
      if (!socket) return;

      const updateUsers = async () => {
         const res = await axiosPrivate.get("/user");
         setAllUsers(res.data);
      };

      socket.on("updateUsers", () => {
         updateUsers();
         console.log("Updating Users");
      });

      return () => {
         socket.off("updateUsers");
      };
   }, [socket, removeRequest, axiosPrivate, setAllUsers]);
};

export default useListenUpdateRequests;
