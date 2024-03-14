import { useQuery } from "@tanstack/react-query";
import useRequestStore from "../store/requestStore.js";
import useAxiosPrivate from "./useAxiosPrivate.js";
import { useEffect } from "react";

export default function useFetchRequests() {
   const axiosPrivate = useAxiosPrivate();
   const setAllRequests = useRequestStore((state) => state.setAllRequests);

   const fetchRequests = async () => {
      const response = await axiosPrivate.get("/request");
      return response.data;
   };

   const { data: allRequests } = useQuery({
      queryKey: ["Requests"],
      queryFn: fetchRequests,
   });

   useEffect(() => {
      setAllRequests(allRequests);
   }, [setAllRequests, allRequests]);
}
