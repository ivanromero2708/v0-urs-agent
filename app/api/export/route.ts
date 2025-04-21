import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const format = searchParams.get("format") || "json"

    // In a real application, you would call your FastAPI backend
    // const response = await fetch(`${process.env.BACKEND_URL}/export?format=${format}`, {
    //   method: "GET",
    // });

    // For demo purposes, we'll just echo back a response
    if (format === "json") {
      const data = {
        sections: [
          {
            id: "1",
            title: "Propósito",
            type: "primary",
            description: "Define the purpose of the system",
            content:
              "El propósito de este sistema es facilitar la generación de documentos URS mediante un enfoque multi-agente.",
            status: "in-progress",
          },
          {
            id: "2",
            title: "Alcance",
            type: "primary",
            description: "Define the scope of the system",
            content: "El alcance de este sistema incluye la generación, edición y exportación de documentos URS.",
            status: "not-started",
          },
          // More sections would be included here
        ],
      }

      return NextResponse.json(data)
    } else if (format === "pdf") {
      // In a real application, you would generate a PDF
      // For demo purposes, we'll just return a mock PDF response
      return new NextResponse("PDF content would be here", {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="urs-export-${new Date().toISOString().split("T")[0]}.pdf"`,
        },
      })
    } else {
      return NextResponse.json({ error: "Unsupported format" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error in export API:", error)
    return NextResponse.json({ error: "Failed to export URS" }, { status: 500 })
  }
}
