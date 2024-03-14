import { useEffect, useState } from "react";
import { BsPersonFillAdd, BsPersonFillX } from "react-icons/bs";
import { cn } from "../../utils/utils";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useUserStore from "../../store/userStore";
import { toast } from "sonner";
import useRequestStore from "../../store/requestStore";
import { useQueryClient } from "@tanstack/react-query";

const UserItem = ({ user }) => {
   const axiosPrivate = useAxiosPrivate();
   const queryClient = useQueryClient();

   const onlineUsers = useUserStore((state) => state.onlineUsers);
   const allRequests = useRequestStore((state) => state.allRequests);
   const addNewRequest = useRequestStore((state) => state.addNewRequest);
   const removeRequest = useRequestStore((state) => state.removeRequest);

   const isOnline = onlineUsers?.some(
      (onlineUser) => onlineUser.userId === user?._id
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
      try {
         setIsLoading(true);
         const response = await axiosPrivate.post("/request", {
            receiverId: user?._id,
         });
         addNewRequest(response.data.newRequest);
         queryClient.invalidateQueries({ queryKey: ["Requests"] });
         toast.success(response.data.message);
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         setIsLoading(false);
      }
   };

   const handleRequestCancel = async () => {
      try {
         setIsLoading(true);
         const response = await axiosPrivate.delete("/request/cancel", {
            receiverId: user?._id,
         });
         removeRequest(response.data.deletedRequestId);
         queryClient.invalidateQueries({ queryKey: ["Requests"] });
         toast.success(response.data.message);
      } catch (error) {
         toast.error(error.response.data.message);
      } finally {
         setIsLoading(false);
      }
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
