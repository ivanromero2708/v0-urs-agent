"use client"

import { useRef, useState } from "react"
import { ChatInput } from "./chat-input"
import { ChatMessages } from "./chat-messages"
import { useChatStore } from "@/lib/stores/chat-store"

export function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, sendMessage } = useChatStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (text: string, attachment?: any) => {
    if (!text.trim() && !attachment) return

    // Add user message to the chat
    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      attachment: attachment,
      timestamp: new Date(),
    }

    sendMessage(userMessage)
    setIsLoading(true)

    try {
      // Prepare the payload
      const payload = {
        text,
        attachment: attachment
          ? {
              url: attachment.url,
              type: attachment.type,
              name: attachment.name,
            }
          : undefined,
      }

      // Send the message to the API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      // Parse the response
      const data = await response.json()

      // Add the agent's response to the chat
      const agentMessage = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.text,
        timestamp: new Date(),
      }

      sendMessage(agentMessage)
    } catch (error) {
      console.error("Error sending message:", error)
      // Add an error message
      const errorMessage = {
        id: Date.now().toString(),
        role: "system",
        content: "Failed to send message. Please try again.",
        timestamp: new Date(),
      }
      sendMessage(errorMessage)
    } finally {
      setIsLoading(false)
      // Scroll to the bottom
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      }, 100)
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <ChatMessages messages={messages} />
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t bg-white p-4 dark:bg-gray-900">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  )
}
