import { LicenseScope, LicenseType } from "@core/interfaces/enums";

export interface ILicense {
  id: string;
  licenseType: LicenseType;
  licenseScope: LicenseScope;
  maxUsers: number;
  assignedUsers: number;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  userId?: string;
  organizationId?: string;
  createdAt: Date;
  updatedAt: Date;
}
