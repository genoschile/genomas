import { User as PrismaUser } from "@prisma/client";
import { UserType as DomainUserType } from "@/core/interfaces/enums";
import { IUser } from "../interfaces/IUser";

export const MapToDomainUserType = (
  prismaUserType: PrismaUser["userType"]
): DomainUserType => {
  switch (prismaUserType) {
    case "ADMIN":
      return DomainUserType.ADMIN;
    case "CLIENT":
      return DomainUserType.CLIENT;
    default:
      throw new Error("Unknown Prisma UserType");
  }
};

export const MapToPrismaUserType = (
  domainUserType: DomainUserType
): PrismaUser["userType"] => {
  switch (domainUserType) {
    case DomainUserType.ADMIN:
      return "ADMIN";
    case DomainUserType.CLIENT:
      return "CLIENT";
    default:
      throw new Error("Unknown Domain UserType");
  }
};

export const mapToIUser = (user: PrismaUser): IUser => ({
  id: user.id,
  email: user.email,
  name: user.name,
  userType: MapToDomainUserType(user.userType),
  organizationId: user.organizationId,
  isDefaultAdmin: user.isDefaultAdmin,
  groupId: user.groupId,
  encryptedPassword: user.encryptedPassword,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
