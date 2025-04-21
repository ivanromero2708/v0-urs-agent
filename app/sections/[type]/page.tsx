import { Header } from "@/components/header"
import { SectionGrid } from "@/components/sections/section-grid"
import { capitalize } from "@/lib/utils"

export default function SectionTypePage({
  params,
}: {
  params: { type: string }
}) {
  const title = capitalize(params.type)

  return (
    <div className="flex h-full flex-col">
      <Header title={`${title} Sections`} />
      <div className="flex-1 overflow-auto p-6">
        <SectionGrid type={params.type} />
      </div>
    </div>
  )
}
