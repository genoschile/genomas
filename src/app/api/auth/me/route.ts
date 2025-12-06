import { NextResponse } from "next/server";
import { verifyAccessToken, AuthPayload } from "@/features/auth/auth";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json(
      { success: false, error: "No token provided" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const user: AuthPayload = await verifyAccessToken(token);

    return NextResponse.json({
      success: true,
      message: "Authenticated",
      user,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
