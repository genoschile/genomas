import { DeleteGroupsDTO, IGroupRepository } from "@/core/interfaces/IGroup";

export class useCaseGroup {
  constructor(private groupRepo: IGroupRepository) {}

  async deleteGroup(orgId: string,groupId: string): Promise<DeleteGroupsDTO | null> {
    return this.groupRepo.deleteGroup(orgId, groupId);
  }
}
