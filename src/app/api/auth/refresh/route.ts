import { NextResponse } from "next/server";
import { generateAccessToken, verifyRefreshToken } from "@/features/auth/auth";

export async function POST(req: Request) {
  try {
    const refreshToken = req.headers
      .get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("refreshToken="))
      ?.split("=")[1];

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "No refresh token" },
        { status: 401 }
      );
    }

    // verify refresh token
    const payload = await verifyRefreshToken(refreshToken);

    // Generar nuevo access token con la info del payload
    const newAccessToken = await generateAccessToken({
      id: payload.id as string,
      type: payload.type as "user" | "organization",
      userType: payload.userType,
      role: payload.role,
    });

    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Error en refresh:", error);
    return NextResponse.json(
      { success: false, message: "Invalid refresh token" },
      { status: 401 }
    );
  }
}
