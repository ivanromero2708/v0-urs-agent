"use client"

import { useSectionStore } from "@/lib/stores/section-store"
import { SectionCard } from "./section-card"

interface SectionGridProps {
  type?: string
}

export function SectionGrid({ type }: SectionGridProps) {
  const { sections } = useSectionStore()

  // Filter sections by type if provided
  const filteredSections = type ? sections.filter((section) => section.type === type) : sections

  if (filteredSections.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-center text-gray-500">No sections found. Start by creating a new section.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredSections.map((section) => (
        <SectionCard key={section.id} section={section} />
      ))}
    </div>
  )
}
