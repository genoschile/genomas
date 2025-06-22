export interface UserContextType {
  name: string | null;
  email: string | null;
  id: number | null;
  updateUser: (user: { name: string; email: string; id: number }) => void;
  logout: () => void;
}

export interface AuthContextType {
  isLogged: boolean;
  updateAuth: (auth: { isLogged: boolean }) => void;
}

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
