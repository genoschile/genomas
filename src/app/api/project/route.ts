import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const projectIds = (await params).id;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const projectIds = (await params).id;

  return NextResponse.json({ message: "Proyecto actualizado correctamente" });
}
