import { useEffect } from "react";
import useTitle from "../hooks/useTitle";
import UserItem from "../components/People/user-item";
import useUserStore from "../store/userStore";
import useRequestStore from "../store/requestStore";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useListenUpdateRequests from "../hooks/useListenUpdateRequests";
import useAuthStore from "../store/authStore";

const People = () => {
   useTitle("People");
   useListenUpdateRequests();

   const axiosPrivate = useAxiosPrivate();
   const currentUserId = useAuthStore((state) => state.userId);
   const allUsers = useUserStore((state) => state.allUsers);
   const setAllRequests = useRequestStore((state) => state.setAllRequests);
   const currentUser = allUsers?.find((user) => user._id === currentUserId);

   useEffect(() => {
      const getAllRequests = async () => {
         const requests = await axiosPrivate.get("/request");
         setAllRequests(requests.data);
      };

      getAllRequests();
   }, [axiosPrivate, setAllRequests]);

   return (
      <div className="flex min-h-svh">
         <div className="w-[300px] bg-white border-r px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-700 ">People</h1>

            <div className="pb-4 mt-4 max-h-[calc(100svh-100px)] overflow-auto space-y-2 tiny-scrollbar">
               {allUsers?.map(
                  (user) =>
                     !currentUser?.friends?.includes(user._id) &&
                     currentUser?._id !== user._id && (
                        <UserItem key={user._id} user={user} />
                     )
               )}
            </div>
         </div>
         <div className="flex-1">People</div>
      </div>
   );
};

export default People;
