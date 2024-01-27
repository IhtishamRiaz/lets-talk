import { HiDotsVertical } from "react-icons/hi";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useUserStore from "../../store/userStore";
import useChatStore from "../../store/chatStore";

const FriendItem = ({ user }) => {
   const navigate = useNavigate();
   const axiosPrivate = useAxiosPrivate();
   const currentUser = useUserStore((state) => state.currentUser);
   const allChats = useChatStore((state) => state.allChats);

   const handleClick = async () => {
      try {
         const existingChat = allChats?.find((chat) =>
            chat.members.includes(user?._id, currentUser._id)
         );

         if (existingChat) {
            navigate(`/chats?id=${existingChat._id}`);
            return;
         } else {
            const res = await axiosPrivate.post("/chat", {
               members: [user?._id, currentUser._id],
            });
            navigate(`/chats?id=${res.data.newChat._id}`);
         }
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div
         onClick={handleClick}
         className="flex gap-2 p-1 transition-all rounded-md cursor-pointer select-none hover:bg-primary-50"
      >
         <div className="relative">
            <img
               src="/images/temp-avatar.png"
               alt="avatar"
               className="w-12 h-12"
            />
            <span className="absolute right-0 w-4 h-4 bg-green-700 border-2 border-white rounded-full bottom-1"></span>
         </div>
         <div className="relative flex-1">
            <h3 className="font-semibold">{user?.name}</h3>
            <p className="text-sm">@{user?.username}</p>
            <div className="absolute flex items-center justify-center -translate-y-1/2 right-1 top-1/2">
               <DropdownMenu>
                  <DropdownMenuTrigger>
                     <span className=" text-lg transition-all py-1 active:scale-[85%]">
                        <HiDotsVertical />
                     </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem>Chat</DropdownMenuItem>
                     <DropdownMenuItem>Unfriend</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      </div>
   );
};

export default FriendItem;
