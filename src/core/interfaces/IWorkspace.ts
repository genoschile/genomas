import { PipelineType, Role } from "@core/interfaces/enums";
import { IProject } from "./IProject";

export interface IWorkspaceResponse {
  id: string;
  name: string;
  pipelineType: PipelineType;
  organizationId?: string;
  members: IProject[];
  projects?: IProject[];
}

export type ResponseWorkspacesDTO = {
  id: string;
  name: string;
  pipelineType: PipelineType;
  organizationId: string | null;
  members: {
    id: string;
    userId: string;
    role: Role[];
    isActive: boolean;
    assignedAt: Date;
  }[];
};
