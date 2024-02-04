import { create } from "zustand";

const useUserStore = create((set) => ({
   currentUser: {},
   setCurrentUser: (currentUser) => set({ currentUser }),

   allUsers: [],
   setAllUsers: (allUsers) => set({ allUsers }),

   onlineUsers: [],
   setOnlineUsers: (onlineUsersIds) => set({ onlineUsersIds }),
}));

export default useUserStore;
