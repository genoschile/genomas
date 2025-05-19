import { NextResponse } from "next/server";
import { CreateOrganizationUseCase } from "@/core/use-cases/organization/createOrganization";
import { OrganizationRepository } from "@/core/repositories/organizationRepository";
import { OrgDTO } from "@/core/use-cases/organization/organizationType";
import { generateSecurePassword } from "@/core/helpers/randomPwdSecure";
import { useCaseUsers } from "@/core/use-cases/user/useCaseUsers";
import { UserRepository } from "@/core/repositories/userRepository";
import { UserType } from "@/core/interfaces/enums";

const useCaseOrganization = new CreateOrganizationUseCase(
  new OrganizationRepository()
);

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
};

/* Create a new organization for the first time */
export async function POST(request: Request) {
  const body = await request.json();

  console.log({ body });

  try {
    const org: OrgDTO = await useCaseOrganization.execute(body);

    if (!org) {
      return NextResponse.json(
        { message: "Organization not created" },
        { status: 400 }
      );
    }

    const { id, name, email } = org;

    const defaultUserPasswordSecure = generateSecurePassword();

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

  // const defaultUserAdminOrg = await createDefaultUserAdminOrg(
}

/*

await prisma.user.create({
  data: {
    email: "admin@example.com",
    encryptedPassword: "hashed_password",
    organizationId: newOrg.id,
    isDefaultAdmin: true,
    userType: "ADMIN",
  }
});


*/
