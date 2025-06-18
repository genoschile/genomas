import { useCaseProject } from "@/core/instances";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const projectId = (await params).id;

  if (!projectId) {
    return NextResponse.json(
      { message: "Workspace ID is required", success: false },
      { status: 400 }
    );
  }

  try {
    const filesProjectId = await useCaseProject.getFilesByProjectId(projectId);

    if (!filesProjectId) {
      console.log("Files not found for project ID:", projectId);
      return NextResponse.json(
        { message: "Files not found", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: filesProjectId,
        success: true,
        message: "Organization created successfully",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error get projectFilesId:", error);

    return NextResponse.json({
      message: "Error creating organization",
    });
  }
}
