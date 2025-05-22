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
    const organizationWithGroups = await prisma.organization.findUnique({
      where: { id: orgId },
      include: {
        groups: {
          include: {
            UserGroup: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (!organizationWithGroups) {
      return [];
    }

    return organizationWithGroups.groups.map((group) => {
      const usersInGroup = group.UserGroup.map((userGroupEntry) => ({
        user: mapToIUser(userGroupEntry.user),
        addedAt: userGroupEntry.createdAt,
      }));

      return {
        id: group.id,
        name: group.name,
        role: mapToDomainRoles(group.role),
        organizationId: group.organizationId,
        description: group.description ?? undefined,
        createdAt: group.createdAt,
        updatedAt: group.updatedAt,
        isActive: group.isActive,
        users: usersInGroup,
      };
    });
  }

  async addGroupToOrg(
    orgId: string,
    data: CreateGroupDTO
  ): Promise<ResponseGroupDTO | null> {
    console.log("Roles", data.role);

    const group = await prisma.group.create({
      data: {
        name: data.name,
        role: mapToDomainRoles(data.role),
        description: data.description,
        organizationId: orgId,
        UserGroup: data.users?.length
          ? {
              create: data.users.map((user) => ({
                userId: user.id,
              })),
            }
          : undefined,
      },
      include: {
        UserGroup: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!group) throw new Error("No se pudo crear el grupo");

    const usersInGroup = group.UserGroup
      ? group.UserGroup.map((ug) => ({
          user: mapToIUser(ug.user),
          addedAt: ug.createdAt,
          // addedById: ug.addedById, // Si 'addedById' existe en UserGroup
        }))
      : [];

    return {
      ...group,
      role: mapToDomainRoles(group.role),
      description: group.description ?? undefined,
      users: usersInGroup,
    };
  }
}
