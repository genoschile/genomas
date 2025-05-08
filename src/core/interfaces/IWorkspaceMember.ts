import { Role } from "@core/interfaces/enums";

export interface IWorkspaceMember {
  id: string;
  userId: string;
  workspaceId: string;
  role: Role;
}
