import { Role as DomainRole } from "../interfaces/enums";

export const mapToDomainRole = (role: string): DomainRole => {
  switch (role) {
    case "ADMIN":
      return DomainRole.ADMIN;
    case "OWNER":
      return DomainRole.OWNER;
    case "EDITOR":
      return DomainRole.EDITOR;
    case "VIEWER":
      return DomainRole.VIEWER;
    default:
      throw new Error("Unknown Role");
  }
};

export const mapToDomainRoles = (roles: string[]): DomainRole[] => {
  return roles.map(mapToDomainRole);
};
