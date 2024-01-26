import FriendItem from "../components/Friends/friend-item";
import useTitle from "../hooks/useTitle";
import useUserStore from "../store/userStore";

const Friends = () => {
   useTitle("Friends");

   const allUsers = useUserStore((state) => state.allUsers);
   const currentUser = useUserStore((state) => state.currentUser);

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
