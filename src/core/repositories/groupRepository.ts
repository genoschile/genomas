import { DeleteGroupsDTO, IGroupRepository } from "../interfaces/IGroup";
import prisma from "@/lib/actions/prisma";

export class GroupRepository implements IGroupRepository {
  async deleteGroup(organizationId: string, groupId: string): Promise<DeleteGroupsDTO | null> {
    const group = await prisma.group.delete({
      where: {
        id: groupId,
      },
    });

    return {
      groupIds: group.id,
    };
  }
}
