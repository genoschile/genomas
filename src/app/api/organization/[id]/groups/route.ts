import { OrganizationRepository } from "@/core/repositories/organizationRepository";
import { useCaseOrganizationUseCase } from "@/core/use-cases/organization/useCaseOrganization";
import { stat } from "fs";
import { NextResponse } from "next/server";
import { u } from "tar";

const useCaseOrganization = new useCaseOrganizationUseCase(
  new OrganizationRepository()
);

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

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
  { params }: { params: { id: string } }
) {
  try {
    // verify id is valid
    const { id } = await params;

    const body = await request.json();

    console.log({ body, id });

    // useCaseOrganization.addGroupToOrg(id);

    return NextResponse.json({
      message: "Añadiendo un grupo",
      success: true,
      data: [],
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error creating group",
      success: false,
      status: 500,
    });
  }
}
