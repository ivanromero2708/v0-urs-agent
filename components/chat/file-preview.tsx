"use client"

import { File, FileText, X } from "lucide-react"
import Image from "next/image"

interface FilePreviewProps {
  file: {
    url: string
    type: string
    name: string
  }
  onRemove?: () => void
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  const getFileIcon = () => {
    if (file.type.startsWith("image/")) {
      return (
        <div className="relative h-16 w-16 overflow-hidden rounded">
          <Image src={file.url || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
        </div>
      )
    } else if (file.type === "application/pdf") {
      return (
        <div className="flex h-16 w-16 items-center justify-center rounded bg-red-100">
          <FileText className="h-8 w-8 text-red-500" />
        </div>
      )
    } else if (file.type === "audio/mpeg") {
      return (
        <div className="flex h-16 w-16 items-center justify-center rounded bg-purple-100">
          <File className="h-8 w-8 text-purple-500" />
        </div>
      )
    } else {
      return (
        <div className="flex h-16 w-16 items-center justify-center rounded bg-blue-100">
          <FileText className="h-8 w-8 text-blue-500" />
        </div>
      )
    }
  }

  return (
    <div className="flex items-center space-x-3">
      {getFileIcon()}
      <div className="flex-1 truncate">
        <p className="truncate font-medium">{file.name}</p>
        <p className="text-sm text-gray-500">{file.type.split("/")[1]?.toUpperCase() || file.type}</p>
      </div>
      {onRemove && (
        <button type="button" onClick={onRemove} className="rounded-full p-1 hover:bg-gray-100">
          <X className="h-5 w-5 text-gray-500" />
          <span className="sr-only">Remove file</span>
        </button>
      )}
    </div>
  )
}
