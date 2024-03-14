import { useQuery } from "@tanstack/react-query";
import useUserStore from "../store/userStore.js";
import useAxiosPrivate from "./useAxiosPrivate.js";
import { useEffect } from "react";

export default function useFetchUsers() {
   const axiosPrivate = useAxiosPrivate();
   const setAllUsers = useUserStore((state) => state.setAllUsers);

   const fetchUsers = async () => {
      const response = await axiosPrivate.get("/user");
      return response.data;
   };

   const { data: allUsers } = useQuery({
      queryKey: ["Users"],
      queryFn: fetchUsers,
   });

   useEffect(() => {
      setAllUsers(allUsers);
   }, [allUsers, setAllUsers]);
}
