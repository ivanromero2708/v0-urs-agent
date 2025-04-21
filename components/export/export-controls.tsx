"use client"

import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function ExportControls() {
  const { toast } = useToast()

  const handleExport = async (format: string) => {
    try {
      // Call the export API
      const response = await fetch(`/api/export?format=${format}`, {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error(`Failed to export URS as ${format.toUpperCase()}`)
      }

      // Handle the response based on the format
      if (format === "json") {
        const data = await response.json()

        // Create a blob and download it
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `urs-export-${new Date().toISOString().split("T")[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      } else if (format === "pdf") {
        // For PDF, we get a blob directly
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `urs-export-${new Date().toISOString().split("T")[0]}.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
      }

      toast({
        title: "Export successful",
        description: `URS exported as ${format.toUpperCase()} successfully.`,
      })
    } catch (error) {
      console.error("Error exporting URS:", error)
      toast({
        title: "Export failed",
        description: `Failed to export URS as ${format.toUpperCase()}.`,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <Select onValueChange={(value) => handleExport(value)} defaultValue="pdf">
        <SelectTrigger className="w-[180px] rounded-md border-gray-200 transition-all duration-300 hover:border-primary hover:shadow-sm">
          <SelectValue placeholder="Select format" />
        </SelectTrigger>
        <SelectContent className="rounded-md shadow-md border-gray-100">
          <SelectItem value="pdf" className="focus:bg-primary/10">
            PDF
          </SelectItem>
          <SelectItem value="json" className="focus:bg-primary/10">
            JSON
          </SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={() => handleExport("pdf")} className="procaps-button bg-primary/90 hover:bg-primary/80">
        <Download className="mr-2 h-4 w-4" />
        Export URS
      </Button>
    </div>
  )
}
