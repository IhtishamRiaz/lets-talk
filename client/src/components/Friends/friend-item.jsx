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
import useAuthStore from "../../store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const FriendItem = ({ user }) => {
   const navigate = useNavigate();
   const queryClient = useQueryClient();
   const axiosPrivate = useAxiosPrivate();
   const currentUserId = useAuthStore((state) => state.userId);
   const allChats = useChatStore((state) => state.allChats);
   const onlineUsers = useUserStore((state) => state.onlineUsers);
   const isOnline = onlineUsers?.some(
      (onlineUser) => onlineUser.userId === user?._id
   );

   const handleOpenChat = async () => {
      try {
         const existingChat = allChats?.find((chat) =>
            chat.members.some((member) => member._id === user?._id)
         );

         if (existingChat) {
            navigate(`/chats?id=${existingChat._id}`);
            return;
         } else {
            const res = await axiosPrivate.post("/chat", {
               members: [user?._id, currentUserId],
            });
            navigate(`/chats?id=${res.data.newChat._id}`);
         }
      } catch (error) {
         console.log(error);
      }
   };

   const handleUnfriend = async () => {
      axiosPrivate.patch("/user/unfriend", {
         friendId: user?._id,
      });
   };

   const { mutate: handleUnfriendMutate } = useMutation({
      mutationFn: handleUnfriend,
      onSettled: (_, error) => {
         if (error) {
            toast.error(error.response.data.message);
         } else {
            queryClient.invalidateQueries({ queryKey: ["Users"] });
            toast.success("Unfriended Successfully!");
         }
      },
   });

   return (
      <div className="flex gap-2 p-1 transition-all rounded-md select-none">
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
                     <DropdownMenuItem onClick={handleOpenChat}>
                        Chat
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={handleUnfriendMutate}>
                        Unfriend
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      </div>
   );
};

export default FriendItem;
