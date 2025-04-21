import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Message } from "@/lib/types"

interface ChatState {
  messages: Message[]
  sendMessage: (message: Message) => void
  clearMessages: () => void
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      sendMessage: (message) =>
        set((state) => ({
          messages: [...state.messages, message],
        })),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "chat-store",
    },
  ),
)
