import { generateAccessToken, verifyRefreshToken } from "@/lib/api/auth/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const cookies = req.headers.get("cookie");
    const refreshToken = cookies
      ?.split("; ")
      .find((c) => c.startsWith("refreshToken="))
      ?.split("=")[1];

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No hay refresh token" },
        { status: 401 }
      );
    }

    const payload = verifyRefreshToken(refreshToken) as {
      id: string;
      email: string;
    };

    const newAccessToken = generateAccessToken({
      id: payload.id,
      email: payload.email,
    });

    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Error al refrescar token:", error);
    return NextResponse.json(
      { success: false, message: "Refresh token inválido" },
      { status: 401 }
    );
  }
}
