import { CreateGroupDTO, ResponseGroupDTO } from "@/core/interfaces/IGroup";
import {
  CreateOrgDTO,
  IOrganizationRepository,
  OrgDTO,
} from "@/core/interfaces/IOrganization";

export class useCaseOrganizationUseCase {
  constructor(private orgRepo: IOrganizationRepository) {}

  async execute(data: CreateOrgDTO): Promise<OrgDTO> {
    return this.orgRepo.create(data);
  }

  async findGroupsByOrgId(orgId: string): Promise<ResponseGroupDTO[] | null> {
    return this.orgRepo.findGroupsByOrgId(orgId);
  }

  async addGroupToOrg(orgId: string, data: CreateGroupDTO): Promise<void> {
    return this.orgRepo.addGroupToOrg(orgId, data);
  }
}
