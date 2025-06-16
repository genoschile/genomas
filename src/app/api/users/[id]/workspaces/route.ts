import { useCaseUser } from "@/core/instances";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const orgWorkspacesList = await useCaseUser.findWorkspacesByUserId(id);

  if (!orgWorkspacesList) {
    return NextResponse.json({
      success: false,
      message: `No groups found for org with id: ${id}`,
      status: 400,
    });
  }

  return NextResponse.json({
    success: true,
    message: `Groups for org with id: ${id}`,
    data: orgWorkspacesList,
    status: 200,
  });
}
