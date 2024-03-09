import { useQuery } from "@tanstack/react-query";
import useChatStore from "../store/chatStore.js";
import useAxiosPrivate from "./useAxiosPrivate.js";

export default function useFetchChats() {
   const axiosPrivate = useAxiosPrivate();
   const setAllChats = useChatStore((state) => state.setAllChats);

   const fetchChats = async () => {
      const response = await axiosPrivate.get("/chat");
      return response.data;
   };

   const { data: allChats } = useQuery({
      queryKey: ["Chats"],
      queryFn: fetchChats,
   });

   setAllChats(allChats);
}
