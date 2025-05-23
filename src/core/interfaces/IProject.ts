import { IPipelineRun } from "./IPipelineRun";
import { IProjectShare } from "./IProjectShare";

export interface IProject {
  id: string;
  name: string;
  description?: string;
  workspaceId: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  sharedWith?: IProjectShare[];
  files?: File[];
  executions?: IPipelineRun[];
}

export interface IProjectRepository {
  getAllProjectsByWorkspaceId(idWorkspace: string): Promise<IProject[]>;
}
