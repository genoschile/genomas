export interface IOrganization {
  id: string;
  name: string;
  userIds: string[];
  workspaceIds: string[];
  licenseId?: string;
}
