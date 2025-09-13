import { NextResponse } from "next/server";
import { UserType } from "@/core/interfaces/enums";
import { useCaseUser } from "@/core/instances";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // verify id is valid
    const id = (await params).id;
    const body = await request.json();

    if (!id || !body) {
      return NextResponse.json(
        { message: "ID or body is missing", success: false },
        { status: 400 }
      );
    }

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

type ApiResponse<T = undefined> = {
  status: number;
  success: boolean;
  message: string;
  data?: T;
};

type UserData = {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const currentListUsers = (
      await useCaseUser.getAllUsersOrganization(id)
    ).map((user) => ({
      ...user,
      name: user.name ?? "",
    }));

    if (!currentListUsers) {
      return NextResponse.json(
        { message: "Organization not created" },
        { status: 400 }
      );
    }

    return NextResponse.json<ApiResponse<UserData[]>>({
      status: 200,
      data: currentListUsers,
      success: true,
      message: "Organization created successfully",
    });
  } catch (error) {
    console.error("Error creating organization:", error);

    return NextResponse.json({
      message: "Error creating organization",
    });
  }
}

type DeleteRequestBody = {
  userId: string;
};

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: orgId } = await params;
    const body: DeleteRequestBody = await request.json();

    if (!orgId || !body?.userId) {
      return NextResponse.json(
        { message: "Organization ID or User ID is missing", success: false },
        { status: 400 }
      );
    }

    console.log("DELETE request body:", body.userId);
    const updatedUser = await useCaseUser.removeUserFromOrg(orgId, body.userId);

    return NextResponse.json(
      {
        message: "Usuario eliminado correctamente de la organización",
        success: true,
        data: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/organization/[id]/users", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unexpected error",
        success: false,
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
    const body = await request.json();

    if (!id || !body) {
      return NextResponse.json(
        { message: "ID or body is missing", success: false },
        { status: 400 }
      );
    }

    console.log("PATCH request body:", body);
    return {
      message: "Funcionalidad no implementada",
      success: false,
    };
  } catch (error) {
    console.error("Error in PATCH /api/organization/[id]/users", error);

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unexpected error",
        success: false,
      },
      { status: 500 }
    );
  }
}
