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
  editUserInOrg(
    orgId: string,
    userId: string,
    updates: Partial<IUser>
  ): Promise<IUser>;
}

export interface UserProps {
  id: string;
  name?: string | null;
  email: string;
  encryptedPassword: string;
  userType: UserType;
  organizationId: string;
  isDefaultAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private props: UserProps;

  constructor(props: UserProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string | null | undefined {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get userType(): UserType {
    return this.props.userType;
  }

  get organizationId(): string {
    return this.props.organizationId;
  }

  get isDefaultAdmin(): boolean {
    return this.props.isDefaultAdmin;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  // ✅ Métodos de negocio (reglas de dominio)
  public changeName(newName: string): void {
    if (!newName || newName.trim().length === 0) {
      throw new Error("Name cannot be empty");
    }
    this.props.name = newName.trim();
  }

  public promoteToAdmin(): void {
    this.props.userType = UserType.ADMIN;
  }

  public isAdmin(): boolean {
    return this.props.userType === UserType.ADMIN;
  }

  public isDefault(): boolean {
    return this.props.isDefaultAdmin;
  }

  // ✅ Método de fábrica para crear usuarios nuevos
  static createNew(
    name: string,
    email: string,
    encryptedPassword: string,
    organizationId: string,
    userType: UserType = UserType.CLIENT,
    isDefaultAdmin = false
  ): User {
    return new User({
      id: crypto.randomUUID(), // o cuid si quieres ser consistente con Prisma
      name,
      email,
      encryptedPassword,
      userType,
      organizationId,
      isDefaultAdmin,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
