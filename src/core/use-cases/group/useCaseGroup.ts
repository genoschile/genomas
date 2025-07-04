import { DeleteGroupsDTO, IGroupRepository } from "@/core/interfaces/IGroup";

export class useCaseGroup {
  constructor(private groupRepo: IGroupRepository) {}

  async deleteGroup(groupId: string): Promise<DeleteGroupsDTO | null> {
    return this.groupRepo.deleteGroup(groupId);
  }
}
