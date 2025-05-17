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
