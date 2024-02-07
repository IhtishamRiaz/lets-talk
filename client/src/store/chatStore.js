import { create } from "zustand";

const useChatStore = create((set) => ({
   allChats: [],
   setAllChats: (allChats) => set({ allChats }),

   newMessages: [],
   setNewMessages: (newMessages) => set({ newMessages }),
   addNewMessage: (newMessage) =>
      set((state) => ({ newMessages: [...state.newMessages, newMessage] })),
}));

export default useChatStore;
