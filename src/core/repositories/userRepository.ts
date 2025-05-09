import prisma from "@/lib/actions/prisma";
import { IUser } from "@core/interfaces/IUser";
import { mapToIUser, MapToPrismaUserType } from "../mapTypes/userTypes";

export const userRepository = {
  async create(user: Omit<IUser, "id">): Promise<IUser> {
    const prismaUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        userType: MapToPrismaUserType(user.userType), // dominio → prisma
        organizationId: user.organizationId,
        groupId: user.groupId,
        encryptedPassword: "hashed",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return mapToIUser(prismaUser);
  },
};
