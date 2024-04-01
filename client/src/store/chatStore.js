import { create } from "zustand";

const useChatStore = create((set) => ({
   allChats: [],
   setAllChats: (allChats) => set({ allChats }),

   newMessages: [],
   setNewMessages: (newMessages) => set({ newMessages }),
   addNewMessage: (newMessage) =>
      set((state) => ({ newMessages: [...state.newMessages, newMessage] })),

   allUnseenMessages: [],
   setAllUnseenMessages: (allUnseenMessages) => set({ allUnseenMessages }),
}));

export default useChatStore;
