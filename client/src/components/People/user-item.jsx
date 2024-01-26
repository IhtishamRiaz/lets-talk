import { useState } from "react";
import { BsPersonFillAdd, BsPersonFillX } from "react-icons/bs";
import { cn } from "../../utils/utils";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useEffect } from "react";
import useUserStore from "../../store/userStore";

const UserItem = ({ user }) => {
   const [isRequestSent, setIsRequestSent] = useState(false);
   const axiosPrivate = useAxiosPrivate();
   const currentUser = useUserStore((state) => state.currentUser);

   const handleRequestSend = async () => {
      await axiosPrivate.post("/request", { to: user?._id });
   };

   const handleRequestCancel = async () => {
      await axiosPrivate.patch("/request/cancel", { otherUserId: user?._id });
   };

   useEffect(() => {
      const isRequested = user?.requests?.includes(currentUser?._id);
      setIsRequestSent(isRequested);
   }, [user, currentUser]);

   return (
      <div className="flex gap-2 p-1 transition-all rounded-md cursor-pointer select-none hover:bg-primary-50">
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
            <p className="text-sm">{"@" + user?.username}</p>
            <div className="absolute right-0 flex items-center justify-center -translate-y-1/2 top-1/2">
               <button
                  className={cn(
                     "p-1 text-2xl text-green-700 transition-all active:scale-90",
                     isRequestSent && "text-red-700"
                  )}
                  onClick={() =>
                     isRequestSent ? handleRequestCancel() : handleRequestSend()
                  }
               >
                  {isRequestSent ? <BsPersonFillX /> : <BsPersonFillAdd />}
               </button>
            </div>
         </div>
      </div>
   );
};

export default UserItem;
