import { create } from "zustand";

const useUserStore = create((set) => ({
   allUsers: [],
   setAllUsers: (newAllUsers) => set({ allUsers: newAllUsers }),

   onlineUsers: [],
   setOnlineUsers: (onlineUsers) => set({ onlineUsers }),
}));

export default useUserStore;
