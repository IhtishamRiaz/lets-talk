import { BiSolidSend } from "react-icons/bi";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useRef, useState } from "react";
import Message from "./message";
import ChatHeader from "./chat-header";
import useSocketStore from "../../store/socketStore";
import useUserStore from "../../store/userStore";

const ChatArea = ({ chat }) => {
   const socket = useSocketStore((state) => state.socket);
   const currentUser = useUserStore((state) => state.currentUser);

   const axiosPrivate = useAxiosPrivate();
   const [initialMessages, setInitialMessages] = useState([]);
   const [newMessages, setNewMessages] = useState([]);
   const receiver = chat?.members?.find(
      (user) => user?._id !== currentUser?._id
   );

   const inputRef = useRef();
   const scrollRef = useRef();

   // Send New Message
   const sendMessage = async (e) => {
      try {
         e.preventDefault();
         const content = inputRef.current.value;
         if (!content || !chat?._id) return;

         const randomId =
            Math.floor(Math.random() * 1000000).toString() + Date.now();

         // Save message to database
         await axiosPrivate
            .post("/message", {
               chatId: chat?._id,
               content,
            })
            .then(() => {
               // Save message to state
               setNewMessages((prev) => [
                  ...prev,
                  {
                     _id: randomId,
                     senderId: currentUser?._id,
                     chatId: chat?._id,
                     content,
                     createdAt: Date.now(),
                  },
               ]);

               // Send message to socket
               socket.emit("sendMessage", {
                  chatId: chat?._id,
                  senderId: currentUser?._id,
                  receiverId: receiver._id,
                  content,
               });
            });

         inputRef.current.value = "";
      } catch (error) {
         console.log(error);
      }
   };

   // Fetch All Messages on initial load
   useEffect(() => {
      const fetchAllMessages = async () => {
         try {
            if (!chat?._id) return;
            const res = await axiosPrivate.get(`/message/${chat?._id}`);
            setInitialMessages(res.data);
         } catch (error) {
            console.log(error);
         }
      };
      fetchAllMessages();
   }, [chat?._id, axiosPrivate]);

   // Listen for new messages
   useEffect(() => {
      if (!socket) return;

      socket.on("getMessage", (data) => {
         if (data?.chatId !== chat?._id) return;

         setNewMessages((prev) => [...prev, data]);
      });

      return () => {
         socket.off("getMessage");
      };
   }, [socket, chat?._id]);

   // Scroll into view
   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      }
   }, [newMessages]);

   return (
      <div className="relative min-h-svh">
         <ChatHeader chat={chat} />
         <section
            ref={scrollRef}
            className="flex flex-col items-start gap-4 px-6 py-4 max-h-[calc(100svh-140px)] border border-red-500 overflow-auto"
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
