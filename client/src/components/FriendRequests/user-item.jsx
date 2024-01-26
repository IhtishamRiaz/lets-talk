import { BsPersonFillCheck } from "react-icons/bs";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const UserItem = ({ user }) => {
   const axiosPrivate = useAxiosPrivate();

   const handleRequestSend = async () => {
      const response = await axiosPrivate.patch("/request/accept", {
         otherUserId: user?._id,
      });
      console.log("🚀 ~ handleRequestSend ~ response:", response);
   };

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
                  className="p-1 text-2xl text-green-700 transition-all active:scale-90"
                  onClick={handleRequestSend}
               >
                  <BsPersonFillCheck />
               </button>
            </div>
         </div>
      </div>
   );
};

export default UserItem;
