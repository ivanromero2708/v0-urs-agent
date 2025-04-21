"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Paperclip, Send } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { FilePreview } from "./file-preview"
import { ModelSelector } from "./model-selector"

interface ChatInputProps {
  onSendMessage: (text: string, attachment?: any) => void
  isLoading?: boolean
}

export function ChatInput({ onSendMessage, isLoading = false }: ChatInputProps) {
  const [text, setText] = useState("")
  const [attachment, setAttachment] = useState<any | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [dropzoneOpen, setDropzoneOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: {
      "image/*": [],
      "application/pdf": [],
      "audio/mpeg": [],
      "text/plain": [],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return

      const file = acceptedFiles[0]
      setIsUploading(true)

      try {
        // Create form data
        const formData = new FormData()
        formData.append("file", file)

        // Upload the file
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error("Failed to upload file")
        }

        const data = await response.json()
        setAttachment(data)
      } catch (error) {
        console.error("Error uploading file:", error)
      } finally {
        setIsUploading(false)
        setDropzoneOpen(false)
      }
    },
  })

  const handleSend = () => {
    if (isLoading || isUploading) return
    onSendMessage(text, attachment)
    setText("")
    setAttachment(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="space-y-4">
      {dropzoneOpen && (
        <div
          {...getRootProps()}
          className={cn(
            "rounded-md border-2 border-dashed p-8 text-center transition-all duration-300",
            isDragActive ? "border-primary bg-primary/10" : "border-gray-300 hover:border-primary",
          )}
        >
          <input {...getInputProps()} />
          <p className="text-sm text-gray-500">
            Drag & drop a file here, or{" "}
            <button type="button" className="text-primary hover:underline" onClick={open}>
              browse
            </button>
          </p>
          <p className="mt-1 text-xs text-gray-400">Supports images, PDFs, MP3s, and text files</p>
          <Button variant="outline" size="sm" className="mt-4 rounded-md" onClick={() => setDropzoneOpen(false)}>
            Cancel
          </Button>
        </div>
      )}

      {attachment && !dropzoneOpen && (
        <div className="rounded-md border p-4 shadow-sm">
          <FilePreview file={attachment} onRemove={() => setAttachment(null)} />
        </div>
      )}

      <div className="flex items-end space-x-2">
        <div className="flex-1">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="procaps-input min-h-[60px] resize-none rounded-md"
            disabled={isLoading || isUploading}
          />
        </div>

        <div className="flex space-x-2">
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => setDropzoneOpen(!dropzoneOpen)}
            disabled={isLoading || isUploading}
            className="rounded-md h-10 w-10 transition-all duration-300 hover:bg-primary/10"
          >
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>

          <ModelSelector />

          <Button
            type="button"
            onClick={handleSend}
            disabled={(!text.trim() && !attachment) || isLoading || isUploading}
            className="procaps-button bg-primary/90 hover:bg-primary/80"
          >
            <Send className="mr-2 h-4 w-4" />
            Send
          </Button>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            // Handle file selection
          }
        }}
      />
    </div>
  )
}
