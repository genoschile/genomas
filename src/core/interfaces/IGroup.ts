import { Role } from "@core/interfaces/enums";
import { IUser } from "./IUser";
import { IOrganization } from "./IOrganization";

export interface IGroup {
  id: string;
  name: string;
  role: Role[];
  users: Omit<IUser, "encryptedPassword">[];
  organizationId: string;
  organization: IOrganization;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface CreateGroupDTO {
  name: string;
  role: Role[];
  organizationId: string;
  description?: string;
  users?: Omit<IUser, "encryptedPassword">[];
}

export interface ResponseGroupDTO {
  id: string;
  name: string;
  role: Role[];
  organizationId: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  users: Omit<IUser, "encryptedPassword">[];
}
