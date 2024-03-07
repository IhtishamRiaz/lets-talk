import FriendItem from "../components/Friends/friend-item";
import useTitle from "../hooks/useTitle";
import useUserStore from "../store/userStore";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

const Friends = () => {
   useTitle("Friends");

   const axiosPrivate = useAxiosPrivate();
   const allUsers = useUserStore((state) => state.allUsers);
   const setAllUsers = useUserStore((state) => state.setAllUsers);
   const currentUserId = useAuthStore((state) => state.userId);
   const currentUser = allUsers?.find((user) => user._id === currentUserId);

   useEffect(() => {
      const getAllUsers = async () => {
         const users = await axiosPrivate.get("/user");
         setAllUsers(users.data);
      };
      getAllUsers();
   }, [axiosPrivate, setAllUsers]);

   return (
      <div className="flex min-h-svh">
         <div className="w-[300px] bg-white border-r px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-700 ">Friends</h1>

            <div className="pb-4 mt-4 max-h-[calc(100svh-100px)] overflow-auto space-y-2 tiny-scrollbar">
               {allUsers?.map(
                  (user) =>
                     currentUser?.friends?.includes(user._id) && (
                        <FriendItem key={user._id} user={user} />
                     )
               )}
            </div>
         </div>
         <div className="flex-1">Friends</div>
      </div>
   );
};

export default Friends;
