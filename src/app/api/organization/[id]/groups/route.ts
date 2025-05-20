// obtener todos los grupos de una organización

import { NextRequest, NextResponse } from "next/server";

/*

const orgWithGroups = await prisma.organization.findUnique({
  where: { id: "org_id" },
  include: { groups: true },
});

*/

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  console.log("Fetching groups for organization ID:", { id });

  if (!id) {
    return NextResponse.json({
      message: "Organization ID is required",
      status: 400,
      success: false,
    });
  }
  try {
    return NextResponse.json({
      status: 200,
      data: [],
      success: true,
      message: "Organization created successfully",
    });
  } catch (error) {
    console.error("Error creating organization:", error);

    return NextResponse.json({
      message: "Error creating organization",
    });
  }
}
