import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  return NextResponse.json({
    message: `Groups for org ${id}`,
    success: true,
    data: [],
  });
}
