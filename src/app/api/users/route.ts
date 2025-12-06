import { NextResponse } from "next/server";
import { UserType } from "@/core/interfaces/enums";
import { useCaseUser } from "@/core/instances";
import { AuthPayload, verifyAccessToken } from "@/features/auth/auth";

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

    let organization: AuthPayload;
    try {
      organization = await verifyAccessToken(token);
    } catch (err: any) {
      if (err.code === "ERR_JWT_EXPIRED") {
        return NextResponse.json(
          { success: false, error: "Token expired" },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 401 }
      );
    }

    if (organization.type !== "organization") {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const body = await request.json();

    if (!body || !body.name || !body.email || !body.userType || !body.userId) {
      return NextResponse.json(
        {
          message: "Body, name, email, userType or userId is missing",
          success: false,
        },
        { status: 400 }
      );
    }

    const { userId, ...updates } = body;

    const updatedUser = await useCaseUser.editUserInOrg(
      organization.id,
      userId,
      updates
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found or could not be updated", success: false },
        { status: 404 }
      );
    }

    const { encryptedPassword, ...userWithoutPassword } = updatedUser;

    return NextResponse.json(
      {
        message: "User updated successfully",
        success: true,
        data: userWithoutPassword,
      },
      { status: 200 }
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
