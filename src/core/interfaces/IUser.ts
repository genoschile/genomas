import { UserType } from "@core/interfaces/enums";

export interface IUser {
  id: string;
  email: string;
  name: string | null;
  isDefaultAdmin: boolean;
  userType: UserType;
  organizationId: string;
  encryptedPassword: string;
  groupId: string | null;

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
  groupId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<UserDTO>;
  findById(id: string): Promise<UserDTO | null>;
  findAll(): Promise<CreateUserDTO[]>;
  update(id: string, data: Partial<UserDTO>): Promise<CreateUserDTO | null>;
  delete(id: string): Promise<UserDTO | null>;
  getAllUsersOrganization(id: string): Promise<UserDTO[]>;
}
