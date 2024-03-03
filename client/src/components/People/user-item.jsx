import { useEffect, useState } from "react";
import { BsPersonFillAdd, BsPersonFillX } from "react-icons/bs";
import { cn } from "../../utils/utils";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useUserStore from "../../store/userStore";
import useSocketContext from "../../hooks/useSocketContext";

const UserItem = ({ user, allRequests }) => {
   const axiosPrivate = useAxiosPrivate();
   const onlineUsers = useUserStore((state) => state.onlineUsers);
   const { socket } = useSocketContext();
   const isOnline = onlineUsers?.some(
      (onlineUser) => onlineUser?._id === user?._id
   );

   const [isLoading, setIsLoading] = useState(false);
   const [isRequestSent, setIsRequestSent] = useState(
      allRequests?.some((request) => request?.receiver._id === user?._id)
   );

   useEffect(() => {
      setIsRequestSent(
         allRequests?.some((request) => request?.receiver._id === user?._id)
      );
   }, [allRequests, user?._id]);

   const handleRequestSend = async () => {
      setIsLoading(true);
      await axiosPrivate
         .post("/request", { receiverId: user?._id })
         .then(() => {
            if (socket) {
               socket.emit("sendRequest");
            }
            setIsRequestSent(true);
         })
         .catch(() => {
            setIsRequestSent(false);
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

   const handleRequestCancel = async () => {
      setIsLoading(true);
      await axiosPrivate
         .delete("/request/cancel", { receiverId: user?._id })
         .then(() => {
            if (socket) {
               socket.emit("sendRequest");
            }
            setIsRequestSent(false);
         })
         .catch(() => {
            setIsRequestSent(true);
         })
         .finally(() => {
            setIsLoading(false);
         });
   };

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
            <p className="text-sm">{"@" + user?.username}</p>
            <div className="absolute right-0 flex items-center justify-center -translate-y-1/2 top-1/2">
               {isLoading ? (
                  <div className="w-5 h-5 border-b-2 border-gray-600 rounded-full animate-spin" />
               ) : (
                  <button
                     className={cn(
                        "p-1 text-2xl text-green-700 transition-all active:scale-90",
                        isRequestSent && "text-red-700"
                     )}
                     onClick={() =>
                        isRequestSent
                           ? handleRequestCancel()
                           : handleRequestSend()
                     }
                  >
                     {isRequestSent ? <BsPersonFillX /> : <BsPersonFillAdd />}
                  </button>
               )}
            </div>
         </div>
      </div>
   );
};

export default UserItem;
