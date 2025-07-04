import { Role } from "@core/interfaces/enums";
import { IUser } from "./IUser";
import { IOrganization } from "./IOrganization";

export interface IGroup {
  id: string;
  name: string;
  role: Role[];
  users: {
    user: Omit<IUser, "encryptedPassword">;
    // metadata opcional del enlace
    addedAt?: Date;
    addedById?: string;
  }[];
  organizationId: string;
  organization: IOrganization;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface IGroupRepository {
  // findGroupsByOrgId(orgId: string): Promise<IGroup[] | null>;
  // addGroupToOrg(orgId: string, data: CreateGroupDTO): Promise<IGroup | null>;
  deleteGroup(groupId: string): Promise<DeleteGroupsDTO | null>;
}

export interface ResponseGroupDTO {
  id: string;
  name: string;
  role: Role[]; // Mapeado a tu dominio
  description?: string;
  organizationId: string;
  users: {
    user: Omit<IUser, "encryptedPassword">; // Tu tipo de usuario mapeado
    addedAt: Date;
    addedById?: string; // Si este campo existe en UserGroup
  }[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface CreateGroupDTO {
  name: string;
  role: Role[];
  description?: string;
  users?: { id: string; addedById?: string }[];
}

export interface DeleteGroupsDTO {
  groupIds: string;
}

export interface DeletedGroupResponseDTO {
  groupIds: string;
}
