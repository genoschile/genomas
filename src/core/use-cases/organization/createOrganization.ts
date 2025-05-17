import { CreateOrgDTO, OrgDTO } from "./organizationType";
import { IOrganizationRepository } from "@/core/interfaces/IOrganization";

export class CreateOrganizationUseCase {
  constructor(private orgRepo: IOrganizationRepository) {}

  async execute(data: CreateOrgDTO): Promise<OrgDTO> {
    return this.orgRepo.create(data);
  }
}
