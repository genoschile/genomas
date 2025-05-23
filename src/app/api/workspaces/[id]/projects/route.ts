import { useCaseProject } from "@/core/instances";
import { UserType } from "@/core/interfaces/enums";
import { NextRequest, NextResponse } from "next/server";

type ApiResponse<T = undefined> = {
  status: number;
  success: boolean;
  message: string;
  data?: T;
};

type UserData = {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const projectsWorkspaceId =
      await useCaseProject.getAllProjectsByWorkspaceId(id);

    if (!projectsWorkspaceId) {
      return NextResponse.json(
        { message: "Organization not created", success: false },
        { status: 400 }
      );
    }

    return NextResponse.json<ApiResponse<UserData[]>>({
      status: 200,
      data: projectsWorkspaceId,
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
