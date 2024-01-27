import { create } from "zustand";

const useChatStore = create((set) => ({
   allChats: [],
   setAllChats: (allChats) => set({ allChats }),
}));

export default useChatStore;
