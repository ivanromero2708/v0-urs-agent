import type { Message } from "@/lib/types"
import { cn } from "@/lib/utils"
import { FilePreview } from "./file-preview"

interface ChatMessagesProps {
  messages: Message[]
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-center text-gray-500 italic">No messages yet. Start a conversation!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <div key={message.id} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
          <div
            className={cn(
              "max-w-[80%]",
              message.role === "user" ? "chat-bubble-user" : "chat-bubble-assistant",
              message.role === "system" && "bg-yellow-100 text-yellow-800 rounded-lg",
            )}
          >
            {message.attachment && (
              <div className="mb-3">
                <FilePreview file={message.attachment} />
              </div>
            )}
            <div className="whitespace-pre-wrap">{message.content}</div>
            <div
              className={cn(
                "mt-2 text-right text-xs",
                message.role === "user" ? "text-primary-foreground/70" : "text-gray-500",
              )}
            >
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
