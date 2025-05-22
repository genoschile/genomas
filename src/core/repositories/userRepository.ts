import prisma from "@/lib/actions/prisma";
import { IUser, IUserRepository, UserDTO } from "@core/interfaces/IUser";
import { mapToIUser, MapToPrismaUserType } from "../mapTypes/userTypes";
import bcrypt from "bcrypt";

export const userRepository = {
  async create(user: Omit<IUser, "id">): Promise<IUser> {
    const prismaUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        userType: MapToPrismaUserType(user.userType), // dominio → prisma
        organizationId: user.organizationId,
        encryptedPassword: "hashed",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return mapToIUser(prismaUser);
  },
};

export class UserRepository implements IUserRepository {
  async getAllUsersOrganization(id: string): Promise<UserDTO[]> {
    const users = await prisma.user.findMany({
      where: {
        organizationId: id,
      },
    });

    return users.map(mapToIUser);
  }

  async create(user: Omit<IUser, "id">): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(user.encryptedPassword, 10);

    const data = {
      email: user.email,
      name: user.name,
      userType: MapToPrismaUserType(user.userType),
      organizationId: user.organizationId,
      isDefaultAdmin: user.isDefaultAdmin,
      encryptedPassword: hashedPassword,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    console.log("UserRepository", { data });

    const prismaUser = await prisma.user.create({ data });

    return mapToIUser(prismaUser);
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user ? mapToIUser(user) : null;
  }

  async findAll(): Promise<IUser[]> {
    const users = await prisma.user.findMany();
    return users.map(mapToIUser);
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return user ? mapToIUser(user) : null;
  }

  async delete(id: string): Promise<IUser | null> {
    const user = await prisma.user.delete({
      where: { id },
    });

    return user ? mapToIUser(user) : null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user ? mapToIUser(user) : null;
  }

  async findByOrganizationId(organizationId: string): Promise<IUser[]> {
    const users = await prisma.user.findMany({
      where: { organizationId },
    });

    return users.map(mapToIUser);
  }

  async findByGroupId(groupId: string): Promise<IUser[]> {
    const userGroups = await prisma.userGroup.findMany({
      where: { groupId },
      include: {
        user: true, 
      },
    });

    return userGroups.map((ug) => mapToIUser(ug.user));
  }
}
