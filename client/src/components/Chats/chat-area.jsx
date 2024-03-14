import { BiSolidSend } from "react-icons/bi";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useRef } from "react";
import Message from "./message";
import ChatHeader from "./chat-header";
import useAuthStore from "../../store/authStore";
import { useQuery } from "@tanstack/react-query";
import useChatStore from "../../store/chatStore";

const ChatArea = ({ chat }) => {
   const axiosPrivate = useAxiosPrivate();
   const currentUserId = useAuthStore((state) => state.userId);
   const newMessages = useChatStore((state) => state.newMessages);
   const setNewMessages = useChatStore((state) => state.setNewMessages);
   const addNewMessage = useChatStore((state) => state.addNewMessage);
   const inputRef = useRef();
   const scrollRef = useRef();
   const receiver = chat?.members?.find((user) => user?._id !== currentUserId);

   const fetchAllMessages = async () => {
      if (!chat?._id) return;
      const res = await axiosPrivate.get(`/message/${chat?._id}`);
      return res.data;
   };

   const { data: initialMessages } = useQuery({
      queryKey: ["Messages", chat?._id],
      queryFn: fetchAllMessages,
   });

   // Send New Message
   const sendMessage = async (e) => {
      try {
         e.preventDefault();
         const content = inputRef.current.value;
         if (!content || !chat?._id) return;

         const res = await axiosPrivate.post("/message", {
            chatId: chat?._id,
            content,
            receiverId: receiver?._id,
         });
         addNewMessage(res.data);
         inputRef.current.value = "";
      } catch (error) {
         console.log(error);
      }
   };

   // Scroll into view
   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }
   }, [newMessages, initialMessages]);
   useEffect(() => {
      setNewMessages([]);
   }, [chat?._id, setNewMessages]);

   return (
      <div className="relative min-h-svh">
         <ChatHeader chat={chat} />
         <section
            ref={scrollRef}
            className="flex flex-col items-start gap-4 px-6 py-4 max-h-[calc(100svh-140px)] overflow-auto"
         >
            {initialMessages?.map((message) => (
               <>
                  <Message
                     key={message._id}
                     message={message}
                     chat={chat}
                     ref={scrollRef}
                  />
               </>
            ))}
            {newMessages?.map((message) => (
               <Message
                  key={message._id}
                  message={message}
                  chat={chat}
                  ref={scrollRef}
               />
            ))}
         </section>

         <div className="absolute bottom-0 left-0 w-full px-5 py-3 bg-white border-t">
            <form onSubmit={(e) => sendMessage(e)} className="flex gap-5">
               <input
                  type="text"
                  className="w-full min-h-[50px] rounded-lg outline-none px-4 bg-slate-200"
                  ref={inputRef}
               />
               <button className="w-[50px] h-[50px] rounded-full bg-primary-500 hover:bg-primary-600 transition-all active:scale-95 text-2xl text-white flex items-center justify-center">
                  <BiSolidSend className="-rotate-45" />
               </button>
            </form>
         </div>
      </div>
   );
};

export default ChatArea;
