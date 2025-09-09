import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { useCaseOrganization } from "@/core/instances";

import { serialize } from "cookie";
import { generateAccessToken, generateRefreshToken } from "@/lib/api/auth/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const org = await useCaseOrganization.organizationByEmail(email);

    if (!org) {
      return NextResponse.json(
        { success: false, message: "La organización no existe" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, org.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    const accessToken = generateAccessToken({ id: org.id, email: org.email });
    const refreshToken = generateRefreshToken({ id: org.id, email: org.email });

    const response = NextResponse.json({
      success: true,
      message: "Login exitoso",
      data: {
        id: org.id,
        email: org.email,
        name: org.name,
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
      { success: false, message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
