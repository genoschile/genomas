import prisma from "@/lib/actions/prisma";
import {
  CreateOrgDTO,
  IOrganization,
  IOrganizationRepository,
  OrgDTO,
} from "../interfaces/IOrganization";
import { CreateGroupDTO, ResponseGroupDTO } from "../interfaces/IGroup";
import { mapToIUser } from "../mapTypes/userTypes";
import { mapToDomainRoles } from "../mapTypes/rolesTypes";

export class OrganizationRepository implements IOrganizationRepository {
  async create(data: CreateOrgDTO): Promise<OrgDTO> {
    const org = await prisma.organization.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
      include: {
        users: { select: { id: true } },
        workspaces: { select: { id: true } },
        license: { select: { id: true } },
      },
    });

    return {
      id: org.id,
      name: org.name,
      email: org.email,
      password: org.password,
      userIds: org.users.map((u) => u.id),
      workspaceIds: org.workspaces.map((w) => w.id),
      licenseId: org.license?.id,
    };
  }

  async findGroupsByOrgId(orgId: string): Promise<ResponseGroupDTO[]> {
    const orgWithGroups = await prisma.organization.findUnique({
      where: { id: orgId },
      include: {
        groups: {
          include: {
            users: true,
          },
        },
      },
    });

    if (!orgWithGroups) return [];

    return orgWithGroups.groups.map(
      (group): ResponseGroupDTO => ({
        id: group.id,
        name: group.name,
        role: mapToDomainRoles(group.role),
        organizationId: group.organizationId,
        description: group.description || undefined,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
        isActive: group.isActive,
        users: group.users
          .map(mapToIUser)
          .map(({ encryptedPassword, ...safeUser }) => safeUser),
      })
    );
  }

  async addGroupToOrg(orgId: string, data: CreateGroupDTO): Promise<void> {
    console.log(`Adding group to organization with ID: ${orgId}`);
  }
}
