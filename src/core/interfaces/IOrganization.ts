import { CreateOrgDTO, OrgDTO } from "../use-cases/organization/organizationType";

export interface IOrganization {
  id: string;
  name: string;
  email: string
  userIds: string[];
  password: string;
  workspaceIds: string[];
  licenseId?: string;
}

export interface IOrganizationRepository {
  create(data: CreateOrgDTO): Promise<OrgDTO>;
  findById(id: string): Promise<OrgDTO | null>;
  findAll(): Promise<OrgDTO[]>;
  update(id: string, data: Partial<OrgDTO>): Promise<OrgDTO | null>;
  delete(id: string): Promise<OrgDTO | null>;
  findGroupsByOrgId(orgId: string): Promise<OrgDTO | null>;
}
