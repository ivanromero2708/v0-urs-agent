export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  attachment?: {
    url: string
    type: string
    name: string
  }
  timestamp: Date
}

export type SectionStatus = "not-started" | "in-progress" | "done"

export interface Section {
  id: string
  title: string
  type: string // "primary", "secondary", "tertiary"
  description?: string
  content: string
  status: SectionStatus
}
