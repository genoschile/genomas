import { IOrganization } from "@/core/interfaces/IOrganization";
import { organizationRepository } from "@/core/repositories/organizationRepository";

export async function createOrganization(data: Omit<IOrganization, "id">): Promise<IOrganization> {
  return organizationRepository.create(data);
}