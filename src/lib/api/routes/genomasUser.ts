import { BASE_CLUSTER } from "@lib/api/config";

export const genomasUserRoutes = {
  getFilesOfProject: (projectId: string) => `/api/project/${projectId}/files`,
  getFilesOfUser: (userId: string) => `/api/users/${userId}/projects`,

  getWorkspacesFromUser: (resource: string | null) =>
    `/api/users/${resource}/workspaces`,

  /* files upload */
  uploadFiles: () => `/api/upload`,

  deleteProjects: () => `/api/project/delete`,
};
