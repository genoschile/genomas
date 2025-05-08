import { AccessType } from "@core/interfaces/enums";

export interface IProjectShare {
  id: string;
  userId: string;
  projectId: string;
  access: AccessType;
  createdAt: Date;
}
