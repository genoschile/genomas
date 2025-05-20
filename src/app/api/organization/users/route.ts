import { UserType } from "@/core/interfaces/enums";
import { UserRepository } from "@/core/repositories/userRepository";
import { useCaseUsers } from "@/core/use-cases/user/useCaseUsers";

import { NextResponse } from "next/server";

const useCaseUser = new useCaseUsers(new UserRepository());

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
  groupId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export async function POST(request: Request) {
  const body = await request.json();

  const { id } = body;

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
