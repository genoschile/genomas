import { NextRequest, NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ message: "Hello from test API!" });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    return NextResponse.json(
      { fileName: file.name, success: true, message: "File received" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: `Error: ${error}`,
        success: false,
      },
      { status: 500 }
    );
  }
}
