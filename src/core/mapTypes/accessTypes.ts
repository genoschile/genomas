import { AccessType as PrismaAccessType } from "@prisma/client";
import { AccessType as DomainAccessType } from "@/core/interfaces/enums";

export const mapFromPrismaAccessType = (access: PrismaAccessType): DomainAccessType => {
  switch (access) {
    case PrismaAccessType.VIEW:
      return DomainAccessType.VIEW;
    case PrismaAccessType.EDIT:
      return DomainAccessType.EDIT;
    case PrismaAccessType.ADMIN:
      return DomainAccessType.ADMIN;
    default:
      throw new Error("Unknown access type: " + access);
  }
};
export const mapToPrismaAccessType = (access: DomainAccessType): PrismaAccessType => {
  switch (access) {
    case DomainAccessType.VIEW:
      return PrismaAccessType.VIEW;
    case DomainAccessType.EDIT:
      return PrismaAccessType.EDIT;
    case DomainAccessType.ADMIN:
      return PrismaAccessType.ADMIN;
    default:
      throw new Error("Unknown access type: " + access);
  }
};