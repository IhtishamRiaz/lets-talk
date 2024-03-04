import UserItem from "../components/FriendRequests/user-item";
import useTitle from "../hooks/useTitle";
import useRequestStore from "../store/requestStore";
import useUserStore from "../store/userStore";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useEffect } from "react";
import useListenNewRequest from "../hooks/useListenNewRequests";

const FriendsRequests = () => {
   useTitle("FriendsRequests");
   useListenNewRequest();
   const axiosPrivate = useAxiosPrivate();

   const allRequests = useRequestStore((state) => state.allRequests);
   const setAllRequests = useRequestStore((state) => state.setAllRequests);
   const currentUser = useUserStore((state) => state.currentUser);
   const allMyRequests = allRequests?.filter(
      (req) => req.receiver._id === currentUser._id
   );

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
            <h1 className="text-3xl font-bold text-gray-700 ">
               Friends Requests
            </h1>

            <div className="pb-4 mt-4 max-h-[calc(100svh-100px)] overflow-auto space-y-2 tiny-scrollbar">
               {allMyRequests?.map((req) => (
                  <UserItem key={req._id} user={req.sender} />
               ))}
            </div>
         </div>
         <div className="flex-1">FriendsRequests</div>
      </div>
   );
};

export default FriendsRequests;
