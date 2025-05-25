import { AccessType } from "@core/interfaces/enums";

export interface IProjectShare {
  id: string;
  userId: string;
  projectId: string;
  access: AccessType;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
  };
}

export interface IProjectGroupShare {
  id: string;
  groupId: string;
  projectId: string;
  access: AccessType;
  createdAt: Date;
  group: {
    id: string;
    name: string;
  };
}
