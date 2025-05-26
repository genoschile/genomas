import { useCaseUser } from "@/core/instances";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const defaultAdmin = await useCaseUser.switchSession(email, password);

    console.log("defaultAdmin", defaultAdmin);

    return NextResponse.json(
      {
        success: true,
        message: "switch exitoso",
        data: {
          email: defaultAdmin.email,
          name: defaultAdmin.name,
          userType: defaultAdmin.userType,
          id: defaultAdmin.id,
        },
      },
      { status: 200 }
    );
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
