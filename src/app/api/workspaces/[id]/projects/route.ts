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
  const currentWorkspacesid = (await params).id;

  try {
    const projectsWorkspaceId =
      await useCaseProject.getAllProjectsByWorkspaceId(currentWorkspacesid);

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

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const currentWorkspacesid = (await params).id;

  try {
    const body = await request.json();

    console.log("data before create", body);

    const newProject = useCaseProject.createProject(currentWorkspacesid, body);

    if (!newProject) {
      return NextResponse.json(
        { message: "Project not created", success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        data: newProject,
        success: true,
        message: "Organization created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating organization:", error);

    return NextResponse.json({
      message: "Error creating organization",
    });
  }
}
