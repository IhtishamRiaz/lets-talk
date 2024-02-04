// import { IoChevronBack } from "react-icons/io5";
// import { BsThreeDotsVertical } from "react-icons/bs";
import useUserStore from "../../store/userStore";
import { cn } from "../../utils/utils";
import { TbTriangleFilled } from "react-icons/tb";
import { TbChecks } from "react-icons/tb";
import { TbCheck } from "react-icons/tb";

const Message = ({ message, chat }) => {
   const currentUser = useUserStore((state) => state.currentUser);

   const sender = chat?.members?.find(
      (user) => user?._id === message?.senderId
   );

   const receiver = chat?.members?.find(
      (user) => user?._id !== message?.senderId
   );

   const utcDate = new Date(message.createdAt);
   const options = {
      hour12: true,
      hour: "numeric",
      minute: "numeric",
   };
   const localTime = utcDate.toLocaleTimeString("en-US", options);

   const isSender = currentUser?._id === message?.senderId;

   return (
      <div
         className={cn(
            "relative inline-block px-3 py-1 pb-5 rounded-md bg-zinc-200 min-w-[100px] max-w-[60%] drop-shadow-sm",
            isSender && "ml-auto bg-primary-200"
         )}
      >
         <p>{message.content}</p>

         <div className="absolute flex items-center gap-1 text-xs text-gray-600 bottom-1 right-2">
            {localTime}
            {isSender && (
               <div>
                  <TbCheck className="text-lg text-gray-500" />
               </div>
            )}
         </div>

         <div
            className={cn(
               "absolute -top-[2px] -left-[7px] rotate-180 text-zinc-200",
               isSender && "-right-[7px] text-primary-200"
            )}
         >
            <TbTriangleFilled />
         </div>
      </div>
   );
};

export default Message;
