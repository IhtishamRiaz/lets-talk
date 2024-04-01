import { useQuery } from "@tanstack/react-query";
import useChatStore from "../store/chatStore.js";
import useAxiosPrivate from "./useAxiosPrivate.js";
import { useEffect } from "react";

export default function useFetchChats() {
   const axiosPrivate = useAxiosPrivate();
   const setAllChats = useChatStore((state) => state.setAllChats);
   const setAllUnseenMessages = useChatStore(
      (state) => state.setAllUnseenMessages
   );

   const fetchChats = async () => {
      const response = await axiosPrivate.get("/chat");
      return response.data;
   };

   const fetchAllNonSeenMessages = async () => {
      const response = await axiosPrivate.get("/message/non-seen");
      return response.data;
   };

   const { data: allChats } = useQuery({
      queryKey: ["Chats"],
      queryFn: fetchChats,
   });

   const { data: allNonSeenMessages } = useQuery({
      queryKey: ["NonSeenMessages"],
      queryFn: fetchAllNonSeenMessages,
   });

   useEffect(() => {
      setAllChats(allChats);
      setAllUnseenMessages(allNonSeenMessages);
   }, [setAllChats, setAllUnseenMessages, allChats, allNonSeenMessages]);
}
