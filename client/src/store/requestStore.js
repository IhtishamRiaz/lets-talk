import { create } from "zustand";

const useRequestStore = create((set) => ({
   allRequests: [],
   setAllRequests: (allRequests) => set({ allRequests }),
   addNewRequest: (newRequest) =>
      set((state) => ({ allRequests: [...state.allRequests, newRequest] })),
}));

export default useRequestStore;
