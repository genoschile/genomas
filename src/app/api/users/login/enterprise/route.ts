import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { useCaseOrganization } from "@/core/instances";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const isExistOrganization = await useCaseOrganization.organizationByEmail(
      email
    );

    if (!isExistOrganization) {
      return NextResponse.json(
        { success: false, message: "organization no existe" },
        { status: 401 }
      );
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      password,
      isExistOrganization.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "password went wrong" },
        { status: 401 }
      );
    }

    // TODO: generar token JWT

    return NextResponse.json({
      success: true,
      message: "Login exitoso",
      data: {
        id: isExistOrganization.id,
        email: isExistOrganization.email,
        name: isExistOrganization.name,
      },
    });
  } catch (error) {
    console.error("Error en login:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Error en el servidor",
      },
      { status: 500 }
    );
  }
}
