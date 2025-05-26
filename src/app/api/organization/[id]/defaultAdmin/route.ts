import { useCaseUser } from "@/core/instances";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const organizationId = (await params).id;

  try {
    const currentDefaultAdmin = await useCaseUser.findDefaultAdminByOrgId(
      organizationId
    );

    console.log(
      "currentDefaultAdmin in GET /api/organization/[id]/defaultAdmin",
      currentDefaultAdmin
    );

    if (!currentDefaultAdmin) {
      return NextResponse.json(
        { message: "User admin not found, contact us" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        data: currentDefaultAdmin,
        success: true,
        message: "admin user found",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("admin user not found, error ", error);

    return NextResponse.json(
      {
        message: "Error creating organization",
        success: false,
      },
      { status: 500 }
    );
  }
}
