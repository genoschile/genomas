export const genomasEnterpriseRoutes = {
  /* suggestions */
  getSuggestionsEnterpise: () => `/api/suggestions/enterprise`,

  /* groups */
  getGroupsEnterprise: (organization: string) =>
    `/api/organization/${organization}/groups`,

  deleteGroupEnterprise: (orgId: string, groupId: string) =>
    `/api/organization/${orgId}/groups/${groupId}`,

  AddGroupsEnterprise: (orgId: string) => `/api/organization/${orgId}/groups`,

  addUserEnterprise: (organizationId: string) =>
    `/api/organization/${organizationId}/users`,

  getProjectForWorkspace: (workspaceId: string) =>
    `/api/workspaces/${workspaceId}/projects`,

  addProjectEnterprise: (workspaceId: string) =>
    `/api/workspaces/${workspaceId}/projects`,

  getWorkspacesfromOrganization: (organization: string) =>
    `/api/organization/${organization}/workspaces`,

  getUserFromOrganization: (organization: string) =>
    `/api/organization/${organization}/users`,

  getCredentialsUserAdmin: (organizationId: string) =>
    `/api/organization/${organizationId}/defaultAdmin`,
};
