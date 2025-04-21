import { Header } from "@/components/header"
import { UrsPreview } from "@/components/export/urs-preview"
import { ExportControls } from "@/components/export/export-controls"

export default function ExportPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Export URS" />
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6">
          <ExportControls />
        </div>
        <UrsPreview />
      </div>
    </div>
  )
}
