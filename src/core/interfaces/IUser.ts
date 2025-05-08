import { UserType } from "@core/interfaces/enums";

export interface IUser {
  id: string;
  email: string;
  name: string | null;
  userType: UserType;
  organizationId: string;
  encryptedPassword: string;
  groupId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
