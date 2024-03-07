import { cn } from "../../utils/utils";
import useUserStore from "../../store/userStore";
import { useSearchParams } from "react-router-dom";
import useAuthStore from "../../store/authStore";

const ChatItem = ({ chat }) => {
   const [searchParams, setSearchParams] = useSearchParams();
   const currentChatId = searchParams.get("id");
   const selected = currentChatId === chat?._id;
   const onlineUsers = useUserStore((state) => state.onlineUsers);

   const currentUserId = useAuthStore((state) => state.userId);
   const otherUser = chat?.members?.find((mem) => mem._id !== currentUserId);

   const isOnline = onlineUsers?.some(
      (onlineUser) => onlineUser?.userId === otherUser?._id
   );

   const handleChatSelect = () => {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("id", chat?._id);
      setSearchParams(newSearchParams);
   };

   return (
      <div
         onClick={handleChatSelect}
         className={cn(
            "flex gap-2 p-1 transition-all rounded-md cursor-pointer hover:bg-primary-50",
            selected && "bg-primary-100 hover:bg-primary-100"
         )}
      >
         <div className="relative">
            <img
               src="/images/temp-avatar.png"
               alt="avatar"
               className="w-12 h-12"
            />
            {isOnline && (
               <span className="absolute right-0 w-4 h-4 bg-green-700 border-2 border-white rounded-full bottom-1"></span>
            )}
         </div>
         <div className="relative flex-1">
            <h3 className="font-semibold ">{otherUser?.name}</h3>
            <p className="text-sm ">No, I dont &#183; Oct 12</p>
            <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-medium text-white -translate-y-1/2 rounded-full right-1 bg-primary-700 top-1/2">
               2
            </span>
         </div>
      </div>
   );
};

export default ChatItem;
