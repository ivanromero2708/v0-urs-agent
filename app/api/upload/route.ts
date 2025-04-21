import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // In a real application, you would upload this to your FastAPI backend
    // const formDataToSend = new FormData();
    // formDataToSend.append("file", file);
    // const response = await fetch(`${process.env.BACKEND_URL}/upload`, {
    //   method: "POST",
    //   body: formDataToSend,
    // });
    // const data = await response.json();

    // For demo purposes, we'll just echo back a response
    const data = {
      url: URL.createObjectURL(file), // This won't work in a real API route, just for demo
      type: file.type,
      name: file.name,
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in upload API:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
