import { UserRepository } from "@/core/repositories/userRepository";
import { useCaseUsers } from "@/core/use-cases/user/useCaseUsers";
import { NextResponse } from "next/server";

const useCaseUser = new useCaseUsers(new UserRepository());

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // verify id is valid
    const id = (await params).id;
    const body = await request.json();

    const currentUser = await useCaseUser.addUserToOrg(id, body);

    if (!currentUser) {
      return NextResponse.json(
        { message: "Error al añadir el usuario", success: false },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Usuario añadido correctamente",
        success: true,
        data: currentUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in POST /api/organization/[id]/users", error);

    return NextResponse.json(
      {
        message: `Error: ${
          error instanceof Error ? error.message : String(error)
        }`,
        success: false,
      },
      { status: 500 }
    );
  }
}
