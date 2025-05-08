export interface IProject {
  id: string;
  name: string;
  description?: string;
  workspaceId: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}
