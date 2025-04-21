import { Header } from "@/components/header"
import { SectionGrid } from "@/components/sections/section-grid"

export default function OverviewPage() {
  return (
    <div className="flex h-full flex-col">
      <Header title="Overview" actions={<ExportButton />} />
      <div className="flex-1 overflow-auto p-6">
        <SectionGrid />
      </div>
    </div>
  )
}

function ExportButton() {
  return (
    <button className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90">
      Export URS
    </button>
  )
}
