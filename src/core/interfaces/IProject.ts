import { IPipelineRun } from "./IPipelineRun";
import { IProjectGroupShare, IProjectShare } from "./IProjectShare";

export interface IProject {
  id: string;
  name: string;
  description: string | null;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
  sharedWith?: IProjectShare[];
  sharedWithGroups?: IProjectGroupShare[];
  files?: File[];
  executions?: IPipelineRun[];
}

export interface IProjectResponse {
  id: string;
  name: string;
  description: string | null;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
  sharedWith?: IProjectShare[];
  sharedWithGroups?: IProjectGroupShare[];
  files?: File[];
  executions?: IPipelineRun[];
}

export interface IProjectDTO {
  name: string;
  description: string | null;
  workspaceId: string;
  sharedWithGroups?: IProjectGroupShare[];
  sharedWith?: IProjectShare[];
  users?: { id: string }[];
  groups?: { id: string }[];
}

export interface IProjectFile {
  id: string
  name: string;
  extension: string;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
  projectId: string;
  organizationId?: string;
  workspaceId?: string;
}

export interface IProjectRepository {
  getAllProjectsByWorkspaceId(idWorkspace: string): Promise<IProject[]>;
  createProject(
    idWorkspace: string,
    data: IProjectDTO
  ): Promise<IProjectResponse | null>;
  addFilesToProject(
    idProject: string,
    files: IProjectFile[]
  ): Promise<IProjectResponse | null>;
  getFilesByProjectId(
    idProject: string
  ): Promise<IProjectFile[] | null>;
}
