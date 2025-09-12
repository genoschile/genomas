import { UserType } from "@core/interfaces/enums";
import { IProject } from "./IProject";
import { ResponseWorkspacesDTO } from "./IWorkspace";

export interface IUser {
  id: string;
  email: string;
  name: string | null;
  isDefaultAdmin: boolean;
  userType: UserType;
  organizationId: string;
  encryptedPassword: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserDTO {
  email: string;
  name: string | null;
  isDefaultAdmin: boolean;
  userType: UserType;
  organizationId: string;
  encryptedPassword: string;
}

export interface UserDTO {
  id: string;
  email: string;
  name: string | null;
  isDefaultAdmin: boolean;
  userType: UserType;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserDefaultAdminResponse {
  id: string;
  email: string;
  isDefaultAdmin: boolean;
  encryptedPassword: string;
}

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<UserDTO>;
  findById(id: string): Promise<UserDTO | null>;
  findAll(): Promise<CreateUserDTO[]>;
  update(id: string, data: Partial<UserDTO>): Promise<CreateUserDTO | null>;
  delete(id: string): Promise<UserDTO | null>;
  getAllUsersOrganization(id: string): Promise<UserDTO[]>;
  addUserToOrg(
    orgId: string,
    data?: Omit<IUser, "id"> & { userId?: string }
  ): Promise<UserDTO>;
  findByEmail(email: string): Promise<IUser | null>;
  findDefaultAdminByOrgId(
    orgId: string
  ): Promise<UserDefaultAdminResponse | null>;
  switchSession(email: string, password: string): Promise<IUser>;
  currentProjectsByUserId(id: string): Promise<IProject[]>;
  findWorkspacesByUserId(
    userId: string
  ): Promise<ResponseWorkspacesDTO[] | null>;
  removeUserFromOrg(orgId: string, userId: string): Promise<IUser>;
}
