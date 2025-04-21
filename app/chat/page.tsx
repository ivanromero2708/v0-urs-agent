import { ChatInterface } from "@/components/chat/chat-interface"
import { Header } from "@/components/header"

export default function ChatPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Chat" />
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  )
}
