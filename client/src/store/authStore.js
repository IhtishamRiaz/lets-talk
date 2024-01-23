import { create } from "zustand"

const useAuthStore = create((set) => ({
   userId: "",
   setUserId: (userId) => set({ userId }),

   accessToken: "",
   setAccessToken: (accessToken) => set({ accessToken }),
}))

export default useAuthStore;