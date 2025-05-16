import { OrganizationRepository } from "@/core/repositories/organizationRepository";

export interface CreateOrgDTO {
  name: string;
  email: string;
  password: string;
}

export interface OrgDTO {
  id: string;
  name: string;
  email: string;
  userIds: string[];
  workspaceIds: string[];
  licenseId?: string;
  password: string;
}

export class OrganizationUseCase {
  constructor(private orgRepo: OrganizationRepository) {}

  async execute(input: CreateOrgDTO): Promise<OrgDTO> {
    const org = await this.orgRepo.create({
      name: input.name,
      email: input.email,
      password: input.password,
    });

    return org;
  }
}
