import prisma from "@/lib/actions/prisma";
import { IUser } from "@core/interfaces/Iuser";

export const userRepository = {
  async findByEmail(email: string): Promise<IUser | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  async create(user: Omit<IUser, "id">): Promise<IUser> {
    return prisma.user.create({ data: user });
  },
};
