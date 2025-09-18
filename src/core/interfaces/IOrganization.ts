import { CreateGroupDTO, ResponseGroupDTO } from "./IGroup";
import { ResponseWorkspacesDTO } from "./IWorkspace";

export interface IOrganization {
  id: string;
  name: string;
  email: string;
  userIds: string[];
  password: string;
  workspaceIds: string[];
  licenseId?: string;
}

export interface CreateOrgDTO {
  name: string;
  email: string;
  password: string;
}

export interface OrgDTO {
  id: string;
  name: string;
  email: string;
  userIds: string[];
  workspaceIds: string[];
  licenseId?: string;
  password: string;
}

export interface IOrganizationRepository {
  create(data: CreateOrgDTO): Promise<OrgDTO>;
  findWorkspacesByOrgId(orgId: string): Promise<ResponseWorkspacesDTO[] | null>;
  findGroupsByOrgId(orgId: string): Promise<ResponseGroupDTO[] | null>;
  addGroupToOrg(
    orgId: string,
    data: CreateGroupDTO
  ): Promise<ResponseGroupDTO | null>;
  organizationByEmail(email: string): Promise<OrgDTO | null>;
  getAllOrganizations(): Promise<OrgDTO[] | null>;
}

export interface OrganizationProps {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  domain?: string | null;
  logoUrl?: string | null;
  licenseId?: string;
  userIds: string[];
  workspaceIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

export class Organization {
  private props: OrganizationProps;

  constructor(props: OrganizationProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get domain(): string | null | undefined {
    return this.props.domain;
  }

  get logoUrl(): string | null | undefined {
    return this.props.logoUrl;
  }

  get licenseId(): string | undefined {
    return this.props.licenseId;
  }

  get userIds(): string[] {
    return this.props.userIds;
  }

  get workspaceIds(): string[] {
    return this.props.workspaceIds;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public activate(): void {
    this.props.isActive = true;
  }

  public deactivate(): void {
    this.props.isActive = false;
  }

  public addUser(userId: string): void {
    if (!this.props.userIds.includes(userId)) {
      this.props.userIds.push(userId);
    }
  }

  public removeUser(userId: string): void {
    this.props.userIds = this.props.userIds.filter((id) => id !== userId);
  }

  public addWorkspace(workspaceId: string): void {
    if (!this.props.workspaceIds.includes(workspaceId)) {
      this.props.workspaceIds.push(workspaceId);
    }
  }

  public removeWorkspace(workspaceId: string): void {
    this.props.workspaceIds = this.props.workspaceIds.filter(
      (id) => id !== workspaceId
    );
  }

  // factory method
  static createNew(
    name: string,
    email: string,
    password: string,
    domain?: string,
    logoUrl?: string
  ): Organization {
    return new Organization({
      id: crypto.randomUUID(), // o cuid() si quieres mantener consistencia
      name,
      email,
      password,
      isActive: true,
      domain,
      logoUrl,
      licenseId: undefined,
      userIds: [],
      workspaceIds: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
