import { create } from "zustand";

const useUserStore = create((set) => ({
   currentUser: {},
   setCurrentUser: (currentUser) => set({ currentUser }),

   allUsers: [],
   setAllUsers: (newAllUsers) => set({ allUsers: newAllUsers }),

   onlineUsers: [],
   setOnlineUsers: (onlineUsers) => set({ onlineUsers }),
}));

export default useUserStore;
