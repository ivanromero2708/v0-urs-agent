import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { Section } from "@/lib/types"
import { cn } from "@/lib/utils"

interface SectionCardProps {
  section: Section
}

export function SectionCard({ section }: SectionCardProps) {
  const statusColors = {
    "not-started": "bg-gray-100 text-gray-800 hover:bg-gray-200",
    "in-progress": "bg-secondary/20 text-secondary hover:bg-secondary/30",
    done: "bg-primary/20 text-primary/80 hover:bg-primary/30",
  }

  return (
    <Card className="procaps-card group">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl">{section.title}</CardTitle>
          <Badge className={cn("procaps-badge", statusColors[section.status])}>
            {section.status === "not-started"
              ? "Not Started"
              : section.status === "in-progress"
                ? "In Progress"
                : "Done"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-transform duration-300 group-hover:scale-110">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <p className="mt-4 line-clamp-2 text-sm text-gray-500">{section.description || "No description available."}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/sections/${section.type}/${encodeURIComponent(section.title)}`} className="w-full">
          <Button className="procaps-button w-full bg-primary/90 hover:bg-primary/80 group-hover:shadow-lg">
            Open
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
