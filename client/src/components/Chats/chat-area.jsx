import { BiSolidSend } from "react-icons/bi";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect, useRef, useState } from "react";
import Message from "./message";

const ChatArea = ({ chat }) => {
   const axiosPrivate = useAxiosPrivate();
   const [initialMessages, setInitialMessages] = useState([]);
   const inputRef = useRef();

   const sendMessage = async () => {
      try {
         const content = inputRef.current.value;
         if (!content || !chat?._id) return;

         await axiosPrivate.post("/message", {
            chatId: chat?._id,
            content,
         });
         inputRef.current.value = "";
      } catch (error) {
         console.log(error);
      }
   };

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

   return (
      <div className="relative min-h-svh">
         {initialMessages?.map((message) => (
            <>
               <Message key={message._id} message={message} chat={chat} />
            </>
         ))}

         <div className="absolute bottom-0 left-0 w-full px-5 py-3 bg-white border-t">
            <div className="flex gap-5">
               <input
                  type="text"
                  className="w-full min-h-[50px] rounded-lg outline-none px-4 bg-slate-200"
                  ref={inputRef}
               />
               <button
                  onClick={sendMessage}
                  className="w-[50px] h-[50px] rounded-full bg-primary-500 hover:bg-primary-600 transition-all active:scale-95 text-2xl text-white flex items-center justify-center"
               >
                  <BiSolidSend className="-rotate-45" />
               </button>
            </div>
         </div>
      </div>
   );
};

export default ChatArea;
