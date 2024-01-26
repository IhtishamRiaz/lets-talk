import ChatItem from "../components/Chats/chat-item"
import useTitle from "../hooks/useTitle"
import { useSearchParams } from "react-router-dom";

const Chats = () => {
   useTitle('Chats')

   let [searchParams, setSearchParams] = useSearchParams({ id: "", });
   const currentChat = searchParams.get("id");

   const handleChatSelect = () => {
      setSearchParams(prev => {
         prev.set("id", "1")
         return prev
      })
   }

   return (
      <div className="flex min-h-svh">
         <div className="w-[300px] bg-white border-r px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-700 ">Chats</h1>

            <div className="pb-4 mt-4 max-h-[calc(100svh-100px)] overflow-auto space-y-2 tiny-scrollbar">
               {
                  Array(10).fill(1).map((_, index) => <ChatItem key={index} onClick={handleChatSelect} selected={currentChat === index} />)
               }
            </div>

         </div>
         <div className="flex-1">
            Chats
         </div>
      </div>
   )
}

export default Chats