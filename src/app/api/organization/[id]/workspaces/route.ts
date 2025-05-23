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

  const orgWorkspacesList = await useCaseOrganization.findWorkspacesByOrgId(id);

  if (!orgWorkspacesList) {
    return NextResponse.json({
      success: false,
      message: `No groups found for org with id: ${id}`,
      status: 400,
    });
  }

  return NextResponse.json({
    success: true,
    message: `Groups for org with id: ${id}`,
    data: orgWorkspacesList,
    status: 200,
  });
}
