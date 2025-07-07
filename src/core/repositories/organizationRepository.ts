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
import { ResponseWorkspacesDTO } from "../interfaces/IWorkspace";
import { PipelineType } from "../interfaces/enums";

export class OrganizationRepository implements IOrganizationRepository {
  async create(data: CreateOrgDTO): Promise<OrgDTO> {
    return await prisma.$transaction(async (tx) => {
      // Paso 1: Crear la organización con include
      const org = await tx.organization.create({
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

      const workspaceData = [
        { name: "Workspace Cáncer", pipelineType: PipelineType.CANCER },
        { name: "Workspace Germline", pipelineType: PipelineType.GERMLINE },
        { name: "Workspace Bacteria", pipelineType: PipelineType.BACTERIA },
      ];

      await Promise.all(
        workspaceData.map(({ name, pipelineType }) =>
          tx.workspace.create({
            data: {
              name,
              pipelineType,
              description: `Este es el workspace para ${pipelineType.toLowerCase()}`,
              organizationId: org.id,
            },
          })
        )
      );

      return {
        id: org.id,
        name: org.name,
        email: org.email,
        password: org.password,
        userIds: org.users.map((u) => u.id),
        workspaceIds: org.workspaces.map((w) => w.id),
        licenseId: org.license?.id ?? undefined,
      };
    });
  }

  async findWorkspacesByOrgId(
    orgId: string
  ): Promise<ResponseWorkspacesDTO[] | null> {
    const organizationWithWorkspaces = await prisma.organization.findUnique({
      where: { id: orgId },
      include: {
        workspaces: {
          include: {
            projects: true,
            members: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (!organizationWithWorkspaces) {
      return null;
    }

    return organizationWithWorkspaces.workspaces.map((workspace) => ({
      id: workspace.id,
      name: workspace.name,
      pipelineType: workspace.pipelineType as PipelineType,
      organizationId: workspace.organizationId,
      members: workspace.members.map((member) => ({
        id: member.id,
        userId: member.userId,
        role: mapToDomainRoles([member.role]),
        isActive: member.isActive,
        assignedAt: member.user.createdAt,
      })),
    }));
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
        }))
      : [];

    return {
      ...group,
      role: mapToDomainRoles(group.role),
      description: group.description ?? undefined,
      users: usersInGroup,
    };
  }

  async organizationByEmail(email: string): Promise<OrgDTO | null> {
    const org = await prisma.organization.findUnique({
      where: { email },
      include: {
        users: { select: { id: true } },
        workspaces: { select: { id: true } },
        license: { select: { id: true } },
      },
    });

    if (!org) return null;

    return {
      id: org.id,
      name: org.name,
      email: org.email,
      userIds: org.users.map((u) => u.id),
      workspaceIds: org.workspaces.map((w) => w.id),
      licenseId: org.license?.id ?? undefined,
      password: org.password,
    };
  }
}
