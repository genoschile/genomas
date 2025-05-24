import { IPipelineRun } from "./IPipelineRun";
import { IProjectShare } from "./IProjectShare";

export interface IProject {
  id: string;
  name: string;
  description: string | null;
  workspaceId: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  sharedWith?: IProjectShare[];
  files?: File[];
  executions?: IPipelineRun[];
}

export interface IProjectDTO {
  name: string;
  description: string | null;
  workspaceId: string;
  ownerId: string;
}

export interface IProjectResponse {
  name: string;
  description: string | null;
  workspaceId: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  sharedWith?: IProjectShare[];
  files?: File[];
  executions?: IPipelineRun[];
}

export interface IProjectRepository {
  getAllProjectsByWorkspaceId(idWorkspace: string): Promise<IProject[]>;
  createProject(idWorkspace: string, data: IProjectDTO): Promise<IProjectResponse | null>;
}
