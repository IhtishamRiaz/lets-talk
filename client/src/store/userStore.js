import { create } from "zustand";

const useUserStore = create((set) => ({
   currentUser: {},
   setCurrentUser: (currentUser) => set({ currentUser }),

   allUsers: [],
   setAllUsers: (newAllUsers) => set({ allUsers: newAllUsers }),

   onlineUsers: [],
   setOnlineUsers: (onlineUsersIds) => set({ onlineUsersIds }),
}));

export default useUserStore;
