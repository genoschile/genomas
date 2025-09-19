import { useCaseOrganization } from "@/core/instances";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  if (!id) {
    return NextResponse.json(
      {
        success: false,
        message: "Organization ID is required",
      },
      { status: 400 }
    );
  }

  const orgWorkspacesList = await useCaseOrganization.findWorkspacesByOrgId(id);

  if (!orgWorkspacesList) {
    return NextResponse.json(
      {
        success: false,
        message: `No groups found for org with id: ${id}`,
      },
      { status: 400 }
    );
  }

  return NextResponse.json({
    success: true,
    message: `Groups for org with id: ${id}`,
    data: orgWorkspacesList,
    status: 200,
  });
}
