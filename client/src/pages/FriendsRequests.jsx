import RequestItem from "../components/FriendRequests/request-item";
import useTitle from "../hooks/useTitle";
import useRequestStore from "../store/requestStore";
import useListenUpdateRequests from "../hooks/useListenUpdateRequests";
import useAuthStore from "../store/authStore";
import useFetchRequests from "../hooks/useFetchRequests";

const FriendsRequests = () => {
   useTitle("FriendsRequests");
   useListenUpdateRequests();
   useFetchRequests();

   const allRequests = useRequestStore((state) => state.allRequests);
   const currentUserId = useAuthStore((state) => state.userId);
   const allMyRequests = allRequests?.filter(
      (req) => req.receiver._id === currentUserId
   );

   return (
      <div className="flex min-h-svh">
         <div className="w-[300px] bg-white border-r px-4 py-6">
            <h1 className="text-3xl font-bold text-gray-700 ">
               Friends Requests
            </h1>

            <div className="pb-4 mt-4 max-h-[calc(100svh-100px)] overflow-auto space-y-2 tiny-scrollbar">
               {allMyRequests?.map((req) => (
                  <RequestItem key={req._id} req={req} />
               ))}
            </div>
         </div>
         <div className="flex-1">FriendsRequests</div>
      </div>
   );
};

export default FriendsRequests;
