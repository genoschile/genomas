import { useCaseUser } from "@/core/instances";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/features/auth/auth";
import { serialize } from "cookie";

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

    const accessToken = await generateAccessToken({
      id: isExistUser.id,
      type: "user",
    });
    const refreshToken = await generateRefreshToken({
      id: isExistUser.id,
      type: "user",
    });

    const response = NextResponse.json({
      success: true,
      message: "Login exitoso",
      data: {
        id: isExistUser.id,
        email: isExistUser.email,
        name: isExistUser.name,
        userType: isExistUser.userType,
        organizationId: isExistUser.organizationId,
        accessToken,
      },
    });

    response.headers.append(
      "Set-Cookie",
      serialize("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60, // 7 días
        path: "/",
      })
    );

    return response;
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
