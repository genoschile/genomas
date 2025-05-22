import { OrganizationRepository } from "@/core/repositories/organizationRepository";
import { useCaseOrganizationUseCase } from "@/core/use-cases/organization/useCaseOrganization";
import { NextRequest, NextResponse } from "next/server";

const useCaseOrganization = new useCaseOrganizationUseCase(
  new OrganizationRepository()
);

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  const orgGroupsList = await useCaseOrganization.findGroupsByOrgId(id);

  if (!orgGroupsList) {
    return NextResponse.json({
      success: false,
      message: `No groups found for org with id: ${id}`,
      status: 400,
    });
  }

  return NextResponse.json({
    success: true,
    message: `Groups for org with id: ${id}`,
    data: orgGroupsList,
    status: 200,
  });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // verify id is valid
    const id = (await params).id;
    const body = await request.json();

    const currentGroup = await useCaseOrganization.addGroupToOrg(id, body);

    if (!currentGroup) {
      throw new Error("Error al crear el grupo");
    }

    return NextResponse.json(
      {
        message: "Grupo añadido correctamente",
        success: true,
        data: currentGroup,
      },
      { status: 200 }
    );
  } catch (error) {

    console.error("Error in POST /api/organization/[id]/groups", error);

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
