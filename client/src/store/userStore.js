import { create } from 'zustand'

const useUserStore = create((set) => ({
   currentUser: {},
   setCurrentUser: (currentUser) => set({ currentUser }),

   allUsers: [],
   setAllUsers: (allUsers) => set({ allUsers }),

   onlineUsersIds: [],
   setOnlineUsersIds: (onlineUsersIds) => set({ onlineUsersIds }),
}))

export default useUserStore;