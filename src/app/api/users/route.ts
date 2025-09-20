import { NextResponse } from "next/server";
import { UserType } from "@/core/interfaces/enums";
import { useCaseUser } from "@/core/instances";
import { AuthPayload, verifyAccessToken } from "@/lib/api/auth/auth";

export async function PATCH(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "No token provided" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    const organization: AuthPayload = await verifyAccessToken(token);

    if (organization.type !== "organization") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const body = await request.json();

    console.log("PATCH request body:", body);

    if (!body || !body.userId || !body.role) {
      return NextResponse.json(
        { message: "Body, userId or role is missing", success: false },
        { status: 400 }
      );
    }

    const { userId, ...updates } = body;

    const updatedUser = await useCaseUser.editUserInOrg(
      organization.id,
      userId,
      updates
    );
    
  } catch (error) {
    console.error("Error in PATCH /api/users/", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unexpected error",
        success: false,
      },
      { status: 500 }
    );
  }
}
