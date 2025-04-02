import { NextRequest, NextResponse } from "next/server";

// Obtener todos los registros (GET)
export async function GET(req: NextRequest) {
  try {
    return NextResponse.json({ message: "GET request successful" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// Crear un nuevo registro (POST)
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    return NextResponse.json({ message: "POST request successful", data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create record" }, { status: 500 });
  }
}

// Actualizar un registro (PUT o PATCH)
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    return NextResponse.json({ message: "PUT request successful", data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    return NextResponse.json({ message: "PATCH request successful", data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to patch record" }, { status: 500 });
  }
}

// Eliminar un registro (DELETE)
export async function DELETE(req: NextRequest) {
  try {
    return NextResponse.json({ message: "DELETE request successful" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete record" }, { status: 500 });
  }
}
