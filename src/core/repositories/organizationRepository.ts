import prisma from "@/lib/actions/prisma";
import { IOrganization } from "../interfaces/IOrganization";

export const organizationRepository = {
  async findById(id: string): Promise<IOrganization | null> {
    const org = await prisma.organization.findUnique({
      where: { id },
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
      userIds: org.users.map((u) => u.id),
      workspaceIds: org.workspaces.map((w) => w.id),
      licenseId: org.license?.id,
    };
  },

  //   : Promise<IOrganization[]>
  async findAll() {
    const orgs = await prisma.organization.findMany({
      include: {
        users: { select: { id: true } },
        workspaces: { select: { id: true } },
        license: { select: { id: true } },
      },
    });

    console.log(orgs);
  },

  async create(data: Omit<IOrganization, "id">): Promise<IOrganization> {
    const org = await prisma.organization.create({
      data: {
        name: data.name,
        users: {
          connect: data.userIds.map((id) => ({ id })),
        },
        workspaces: {
          connect: data.workspaceIds.map((id) => ({ id })),
        },
        license: data.licenseId
          ? { connect: { id: data.licenseId } }
          : undefined,
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
      userIds: org.users.map((u) => u.id),
      workspaceIds: org.workspaces.map((w) => w.id),
      licenseId: org.license?.id,
    };
  },

  async update(
    id: string,
    data: Partial<IOrganization>
  ): Promise<IOrganization | null> {
    const org = await prisma.organization.update({
      where: { id },
      data: {
        name: data.name,
        users: {
          connect: data.userIds
            ? data.userIds.map((id) => ({ id }))
            : undefined,
          disconnect: data.userIds ? undefined : [],
        },
        workspaces: {
          connect: data.workspaceIds
            ? data.workspaceIds.map((id) => ({ id }))
            : undefined,
          disconnect: data.workspaceIds ? undefined : [],
        },
        license: data.licenseId
          ? { connect: { id: data.licenseId } }
          : undefined,
      },
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
      userIds: org.users.map((u) => u.id),
      workspaceIds: org.workspaces.map((w) => w.id),
      licenseId: org.license?.id,
    };
  },

  async delete(id: string): Promise<IOrganization | null> {
    const org = await prisma.organization.delete({
      where: { id },
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
      userIds: org.users.map((u) => u.id),
      workspaceIds: org.workspaces.map((w) => w.id),
      licenseId: org.license?.id,
    };
  },
};
