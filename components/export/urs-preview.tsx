"use client"

import { useSectionStore } from "@/lib/stores/section-store"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function UrsPreview() {
  const { sections } = useSectionStore()

  // Group sections by type
  const groupedSections = sections.reduce(
    (acc, section) => {
      if (!acc[section.type]) {
        acc[section.type] = []
      }
      acc[section.type].push(section)
      return acc
    },
    {} as Record<string, typeof sections>,
  )

  return (
    <Card className="procaps-card">
      <CardContent className="p-8">
        <div className="mx-auto max-w-3xl space-y-10">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative h-16 w-40">
                <Image src="/images/procaps-logo.png" alt="Procaps Logo" fill className="object-contain" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary/90">URS Document</h1>
            <p className="mt-3 text-gray-500 italic">Generated on {new Date().toLocaleDateString()}</p>
          </div>

          {Object.entries(groupedSections).map(([type, typeSections]) => (
            <div key={type} className="space-y-6">
              <h2 className="text-2xl font-bold capitalize border-b border-secondary/30 pb-2 text-secondary">
                {type} Sections
              </h2>

              {typeSections.map((section) => (
                <div key={section.id} className="space-y-3">
                  <h3 className="text-xl font-semibold text-primary">{section.title}</h3>
                  <div className="rounded-md bg-accent p-5 shadow-inner">
                    <p className="whitespace-pre-wrap leading-relaxed">{section.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
