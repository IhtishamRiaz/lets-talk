import UserItem from "../components/FriendRequests/user-item";
import useTitle from "../hooks/useTitle";
import useUserStore from "../store/userStore";

const FriendsRequests = () => {
   useTitle("FriendsRequests");

   const currentUser = useUserStore((state) => state.currentUser);
   const allUsers = useUserStore((state) => state.allUsers);

   let allRequests = allUsers?.filter((user) =>
      currentUser?.requests?.includes(user._id)
   );

   console.log(allUsers);

   return (
      <div className="flex min-h-svh">
         <div className="w-[300px] bg-white border-r px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-700 ">
               Friends Requests
            </h1>

            <div className="pb-4 mt-4 max-h-[calc(100svh-100px)] overflow-auto space-y-2 tiny-scrollbar">
               {/* {allUsers?.map(
                  (user) =>
                     currentUser?.requests?.includes(user._id) && (
                        <UserItem key={user._id} user={user} />
                     )
               )} */}
               {allRequests?.map((user) => (
                  <UserItem key={user._id} user={user} />
               ))}
            </div>
         </div>
         <div className="flex-1">FriendsRequests</div>
      </div>
   );
};

export default FriendsRequests;
