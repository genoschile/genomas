import prisma from "@/lib/actions/prisma";
import {
  CreateOrgDTO,
  IOrganizationRepository,
  OrgDTO,
} from "../interfaces/IOrganization";
import { CreateGroupDTO, ResponseGroupDTO } from "../interfaces/IGroup";
import { mapToIUser, MapToPrismaUserType } from "../mapTypes/userTypes";
import { mapToDomainRoles } from "../mapTypes/rolesTypes";
import { ResponseWorkspacesDTO } from "../interfaces/IWorkspace";
import { PipelineType } from "../interfaces/enums";
import { IUser } from "../interfaces/IUser";
import bcrypt from "bcrypt";
import { generateSecurePassword } from "@/utils/randomPwdSecure";
import { UserType as DomainUserType } from "@/core/interfaces/enums";

export class OrganizationRepository implements IOrganizationRepository {
  async create(data: CreateOrgDTO): Promise<OrgDTO> {
    return await prisma.$transaction(async () => {
      // Paso 1: Crear la organización con include
      const org = await prisma.organization.create({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
        },
      });

      const fullOrg = await prisma.organization.findUnique({
        where: { id: org.id },
        include: {
          users: { select: { id: true } },
          workspaces: { select: { id: true } },
          license: { select: { id: true } },
        },
      });

      if (!fullOrg) {
        throw new Error("No se pudo crear la organización");
      }

      const workspaceData = [
        { name: "Workspace Cáncer", pipelineType: PipelineType.CANCER },
        { name: "Workspace Germline", pipelineType: PipelineType.GERMLINE },
        { name: "Workspace Bacteria", pipelineType: PipelineType.BACTERIA },
      ];

      await Promise.all(
        workspaceData.map(({ name, pipelineType }) =>
          prisma.workspace.create({
            data: {
              name,
              pipelineType,
              description: `Este es el workspace para ${pipelineType.toLowerCase()}`,
              organizationId: org.id,
            },
          })
        )
      );

      // 3. Crear el usuario admin asociado a la organización
      const defaultAdminUser: Omit<IUser, "id"> = {
        email: data.email,
        name: "Admin",
        userType: DomainUserType.ADMIN,
        organizationId: org.id,
        isDefaultAdmin: true,
        encryptedPassword: generateSecurePassword(12),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await createUser(defaultAdminUser);

      return {
        id: fullOrg.id,
        name: fullOrg.name,
        email: fullOrg.email,
        password: fullOrg.password,
        userIds: fullOrg.users.map((u) => u.id),
        workspaceIds: fullOrg.workspaces.map((w) => w.id),
        licenseId: fullOrg.license?.id ?? undefined,
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

  async getAllOrganizations(): Promise<OrgDTO[] | null> {
    const orgs = await prisma.organization.findMany({
      include: {
        users: { select: { id: true } },
        workspaces: { select: { id: true } },
        license: { select: { id: true } },
      },
    });

    if (!orgs) return null;

    return orgs.map((org) => ({
      id: org.id,
      name: org.name,
      email: org.email,
      userIds: org.users.map((u) => u.id),
      workspaceIds: org.workspaces.map((w) => w.id),
      licenseId: org.license?.id ?? undefined,
      password: org.password,
    }));
  }
}

async function createUser(user: Omit<IUser, "id">): Promise<IUser> {
  const hashedPassword = await bcrypt.hash(user.encryptedPassword, 10);

  const data = {
    email: user.email,
    name: user.name,
    userType: MapToPrismaUserType(user.userType),
    organizationId: user.organizationId,
    isDefaultAdmin: user.isDefaultAdmin,
    encryptedPassword: hashedPassword,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  const prismaUser = await prisma.user.create({ data });

  return mapToIUser(prismaUser);
}
