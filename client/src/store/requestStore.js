import { create } from "zustand";

const useRequestStore = create((set) => ({
   allRequests: [],
   setAllRequests: (allRequests) => set({ allRequests }),
}));

export default useRequestStore;
