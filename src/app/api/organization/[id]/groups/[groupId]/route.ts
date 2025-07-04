import { useCaseGroups, useCaseOrganization } from "@/core/instances";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; groupId: string }> }
) {
  try {
    const id = (await params).id;
    const groupId = (await params).groupId;
    const deletedGroup = await useCaseGroups.deleteGroup(id, groupId);

    if (!deletedGroup) {
      throw new Error("Error al eliminar el grupo");
    }

    console.log("Grupo eliminado correctamente:", deletedGroup);

    return NextResponse.json(
      {
        message: "Grupo eliminado correctamente",
        success: true,
        data: deletedGroup,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/organization/[id]/groups/[id]", error);

    return NextResponse.json(
      {
        message: `Error: ${
          error instanceof Error ? error.message : String(error)
        }`,
        success: false,
      },
      { status: 500 }
    );
  }
}
