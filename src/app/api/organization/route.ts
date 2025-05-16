import { NextResponse } from "next/server";

// import { getOrganization } from "@/domain/use-cases/organization/getOrganization";
// import { updateOrganization } from "@/domain/use-cases/organization/updateOrganization";
// import { deleteOrganization } from "@/domain/use-cases/organization/deleteOrganization";
import { CreateOrganizationUseCase } from "@/core/use-cases/organization/createOrganization";
import { OrganizationRepository } from "@/core/repositories/organizationRepository";

// POST /api/organization

const useCase = new CreateOrganizationUseCase(new OrganizationRepository());

export async function POST(request: Request) {
  const body = await request.json();

  console.log({ body });

  const org = await useCase.execute(body);

  return NextResponse.json(org, { status: 201 });
}

// PUT /api/organization?id=xxx
// export async function PUT(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");
//   const body = await request.json();

//   if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

//   const updated = await updateOrganization(id, body);
//   return NextResponse.json(updated);
// }

// DELETE /api/organization?id=xxx
// export async function DELETE(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");

//   if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

//   await deleteOrganization(id);
//   return NextResponse.json({ success: true });
// }

// GET /api/organization?id=xxx
// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get("id");

//   if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

//   const org = await getOrganization(id);
//   return NextResponse.json(org);
// }