import { NextResponse } from "next/server";
import { generateSecurePassword } from "@/core/helpers/randomPwdSecure";
import { UserType } from "@/core/interfaces/enums";
import { OrgDTO } from "@/core/interfaces/IOrganization";
import { useCaseOrganization, useCaseUser } from "@/core/instances";

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
};

/* Create a new organization for the first time */
export async function POST(request: Request) {
  const body = await request.json();

  try {
    const org: OrgDTO = await useCaseOrganization.execute(body);

    if (!org) {
      return NextResponse.json(
        { message: "Organization not created" },
        { status: 400 }
      );
    }

    const { id, name, email } = org;

    // const defaultUserPasswordSecure = generateSecurePassword();
    const defaultUserPasswordSecure = "fermin";

    const currentDataUser = {
      name: name,
      email: email,
      encryptedPassword: defaultUserPasswordSecure,
      organizationId: id,
      isDefaultAdmin: true,
      userType: UserType.ADMIN,
    };

    const currentUser = await useCaseUser.createUserAdmin(currentDataUser);

    if (!currentUser) {
      throw new Error("Error creating default user");
    }

    if (!defaultUserPasswordSecure) {
      throw new Error("Error generating secure password");
    }

    return NextResponse.json<ApiResponse<UserData>>({
      status: 200,
      data: { id, name, email },
      success: true,
      message: "Organization created successfully",
    });
  } catch (error) {
    console.error("Error creating organization:", error);

    return NextResponse.json({
      message: "Error creating organization",
      status: 500,
      success: false,
    });
  }
}
