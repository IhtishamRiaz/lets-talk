import { create } from "zustand";

const useRequestStore = create((set) => ({
   allRequests: [],
   setAllRequests: (allRequests) => set({ allRequests }),
   addNewRequest: (newRequest) =>
      set((state) => ({ allRequests: [...state.allRequests, newRequest] })),
   removeRequest: (requestId) =>
      set((state) => ({
         allRequests: state.allRequests.filter(
            (request) => request._id !== requestId
         ),
      })),
}));

export default useRequestStore;
