export interface IWorkspace {
  createdAt: string;
  description: string;
  id: string;
  isActive: boolean;
  name: string;
  organizationId: string;
  pipelineType: string;
  updatedAt: string;
}

export interface IProject {
  id: string;
  name: string;
  workspaceId: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  workspace: IWorkspace;

  sharedWith?: string[];
  sharedWithGroups?: string[];
  files?: File[];
  executions?: string[];
}
