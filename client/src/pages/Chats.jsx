import { useEffect, useState } from "react";
import ChatItem from "../components/Chats/chat-item";
import useTitle from "../hooks/useTitle";
import { useSearchParams } from "react-router-dom";
import useChatStore from "../store/chatStore";
import ChatArea from "../components/Chats/chat-area";
import { TiMessages } from "react-icons/ti";
import useListenMessages from "../hooks/useListenMessages";
import useFetchChats from "../hooks/useFetchChats";

const Chats = () => {
   useTitle("Chats");
   useListenMessages();
   useFetchChats();

   const [searchParams] = useSearchParams();
   const currentChatId = searchParams.get("id");
   const allChats = useChatStore((state) => state.allChats);
   const [currentChat, setCurrentChat] = useState({});

   useEffect(() => {
      if (!currentChatId) return;
      const chat = allChats?.find((chat) => chat._id === currentChatId);
      setCurrentChat(chat);
   }, [currentChatId, allChats]);

   return (
      <div className="flex min-h-svh">
         <div className="w-[300px] bg-white border-r px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-700 ">Chats</h1>

            <div className="pb-4 mt-4 max-h-[calc(100svh-100px)] overflow-auto space-y-2 tiny-scrollbar">
               {allChats?.map((chat) => (
                  <ChatItem key={chat._id} chat={chat} />
               ))}
            </div>
         </div>

         <div className="flex-1">
            {currentChat?._id && <ChatArea chat={currentChat} />}
            {!currentChat?._id && (
               <div>
                  Welcome John Doe. <br /> Select a chat to start messaging
                  <TiMessages className="text-5xl" />
               </div>
            )}
         </div>
      </div>
   );
};

export default Chats;
