import { PipelineType, Role } from "@core/interfaces/enums";

export interface IWorkspaceResponse {
  id: string;
  name: string;
  pipelineType: PipelineType;
  organizationId?: string;
  members: WorkspaceMemberResponse[];
  projects?: ProjectSummaryResponse[];
}

export interface WorkspaceMemberResponse {
  id: string;
  userId: string;
  role: Role;
  isActive: boolean;
  assignedAt: string;
}

export interface ProjectSummaryResponse {
  id: string;
  name: string;
}   
