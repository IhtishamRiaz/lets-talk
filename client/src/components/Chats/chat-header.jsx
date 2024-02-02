import useUserStore from "../../store/userStore";

const ChatHeader = ({ chat }) => {
   const currentUser = useUserStore((state) => state.currentUser);

   const sender = chat?.members?.find((user) => user?._id !== currentUser?._id);
   return (
      <div className="px-5 py-2 bg-white border-b">
         <div className="flex items-center gap-2">
            <div>
               <img src="/images/temp-avatar.png" alt="" className="w-12" />
            </div>
            <div>
               <p className="font-semibold">{sender?.name}</p>
               <p className="-mt-1 text-sm text-gray-500">
                  {"@" + sender?.username}
               </p>
            </div>
         </div>
      </div>
   );
};

export default ChatHeader;
