import { Breadcrumb } from "@/components/breadcrumb"
import { Header } from "@/components/header"
import { SectionEditor } from "@/components/sections/section-editor"
import { SectionSidebar } from "@/components/sections/section-sidebar"
import { capitalize } from "@/lib/utils"

export default function SectionPage({
  params,
}: {
  params: { type: string; section: string }
}) {
  const sectionTitle = decodeURIComponent(params.section)
  const typeTitle = capitalize(params.type)

  return (
    <div className="flex h-full flex-col">
      <Header title={sectionTitle}>
        <Breadcrumb
          items={[
            { label: "Home", href: "/overview" },
            { label: `${typeTitle} Sections`, href: `/sections/${params.type}` },
            { label: sectionTitle, href: "#", active: true },
          ]}
        />
      </Header>
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto p-6">
          <SectionEditor type={params.type} section={params.section} />
        </div>
        <SectionSidebar type={params.type} section={params.section} />
      </div>
    </div>
  )
}
