"use client"

import { useChatStore } from "@/lib/stores/chat-store"
import { ChatMessages } from "../chat/chat-messages"

interface SectionSidebarProps {
  type: string
  section: string
}

export function SectionSidebar({ type, section }: SectionSidebarProps) {
  const { messages } = useChatStore()
  const sectionTitle = decodeURIComponent(section)

  // Filter messages related to this section
  const sectionMessages = messages.filter((message) => {
    // This is a simple filter - in a real app, you'd have a more robust way to associate messages with sections
    return message.content.toLowerCase().includes(sectionTitle.toLowerCase())
  })

  return (
    <div className="hidden w-80 border-l bg-gray-50 p-4 dark:bg-gray-800 lg:block">
      <h3 className="mb-4 text-lg font-semibold">Chat History</h3>
      {sectionMessages.length > 0 ? (
        <div className="overflow-y-auto">
          <ChatMessages messages={sectionMessages} />
        </div>
      ) : (
        <p className="text-center text-gray-500">No chat history for this section.</p>
      )}
    </div>
  )
}
