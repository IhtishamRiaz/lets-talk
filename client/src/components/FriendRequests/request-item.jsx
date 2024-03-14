import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { HiDotsVertical } from "react-icons/hi";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const RequestItem = ({ req }) => {
   const axiosPrivate = useAxiosPrivate();
   const queryClient = useQueryClient();
   const user = req.sender;

   const handleRequestAccept = async () => {
      try {
         const response = await axiosPrivate.patch("/request/accept", {
            requestId: req._id,
         });
         toast.success(response.data.message);
         queryClient.invalidateQueries({ queryKey: ["Requests"] });
      } catch (error) {
         toast.error(error.response.data.message);
      }
   };

   const handleRequestReject = async () => {
      try {
         const response = await axiosPrivate.patch("/request/reject", {
            requestId: req._id,
         });

         toast.success(response.data.message);
         queryClient.invalidateQueries({ queryKey: ["Requests"] });
      } catch (error) {
         toast.error(error.response.data.message);
      }
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
            <div className="absolute flex items-center justify-center -translate-y-1/2 right-1 top-1/2">
               <DropdownMenu>
                  <DropdownMenuTrigger>
                     <span className=" text-lg transition-all py-1 active:scale-[85%]">
                        <HiDotsVertical />
                     </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                     <DropdownMenuItem onClick={handleRequestAccept}>
                        Accept
                     </DropdownMenuItem>
                     <DropdownMenuItem onClick={handleRequestReject}>
                        Reject
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
      </div>
   );
};

export default RequestItem;
