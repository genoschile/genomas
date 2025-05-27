import { useCaseUser } from "@/core/instances";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const isExistUser = await useCaseUser.findByEmail(email);

    if (!isExistUser) {
      return NextResponse.json(
        { success: false, message: "Usuario no existe" },
        { status: 401 }
      );
    }

    console.log("isExistUser y passowrd ", isExistUser.encryptedPassword);
    console.log("isExistUser y email ", password);

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(
      password,
      isExistUser.encryptedPassword
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
        id: isExistUser.id,
        email: isExistUser.email,
        name: isExistUser.name,
        userType: isExistUser.userType,
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
