import { BASE_CLUSTER } from "@lib/api/config";

export const genomasUserRoutes = {
  getFilesOfProject: (projectId: string) => `/api/project/${projectId}/files`,
  getFilesOfUser: (userId: string) => `/api/users/${userId}/projects`,

  getWorkspacesFromUser: (resource: string | null) =>
    `/api/users/${resource}/workspaces`,

  /* pipeline */
  runPipelineTest: () => `${BASE_CLUSTER}/run`,
  annomafTest: () => `/api/pipes/annomaf`,

  /* files upload */
  // decompressFiles: () => `/api/document/utils`,
  decompressFiles: () => `http://localhost:8000/validate`,
  // uploadFiles: () => `/api/document/upload`,
  uploadFiles: () => `http://localhost:8000/genomas/upload`,

  deleteProjects: () => `/api/project/delete`,
};
