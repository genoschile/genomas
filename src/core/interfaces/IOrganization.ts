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
