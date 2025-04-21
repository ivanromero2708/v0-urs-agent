"use client"

import { useState } from "react"
import { RefreshCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useSectionStore } from "@/lib/stores/section-store"
import { useToast } from "@/components/ui/use-toast"

interface SectionEditorProps {
  type: string
  section: string
}

export function SectionEditor({ type, section }: SectionEditorProps) {
  const { sections, updateSection } = useSectionStore()
  const { toast } = useToast()
  const [isRegenerating, setIsRegenerating] = useState(false)

  const sectionTitle = decodeURIComponent(section)
  const sectionData = sections.find((s) => s.type === type && s.title === sectionTitle)

  const [content, setContent] = useState(sectionData?.content || "")

  if (!sectionData) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-center text-gray-500 italic">Section not found.</p>
      </div>
    )
  }

  const handleRegenerate = async () => {
    setIsRegenerating(true)

    try {
      // Call the API to regenerate the section
      const response = await fetch(`/api/section/${encodeURIComponent(sectionData.title)}/run`, {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to regenerate section")
      }

      const data = await response.json()

      // Update the section content
      setContent(data.content)
      updateSection({
        ...sectionData,
        content: data.content,
        status: "in-progress",
      })

      toast({
        title: "Section regenerated",
        description: "The section content has been regenerated.",
      })
    } catch (error) {
      console.error("Error regenerating section:", error)
      toast({
        title: "Error",
        description: "Failed to regenerate section. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRegenerating(false)
    }
  }

  const handleMarkDone = () => {
    updateSection({
      ...sectionData,
      content,
      status: "done",
    })

    toast({
      title: "Section marked as done",
      description: "The section has been marked as complete.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={handleRegenerate} disabled={isRegenerating} className="procaps-button">
          <RefreshCw className={`mr-2 h-4 w-4 ${isRegenerating ? "animate-spin" : ""}`} />
          Regenerate
        </Button>
        <Button
          onClick={handleMarkDone}
          disabled={sectionData.status === "done"}
          className="procaps-button bg-secondary hover:bg-secondary/90"
        >
          <Check className="mr-2 h-4 w-4" />
          Mark Done
        </Button>
      </div>

      <Card className="procaps-card p-6">
        <div
          className="min-h-[300px] w-full rounded-md border border-input bg-transparent px-4 py-3 text-lg leading-relaxed focus-visible:outline-none"
          contentEditable
          suppressContentEditableWarning
          onBlur={(e) => setContent(e.currentTarget.textContent || "")}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </Card>
    </div>
  )
}
