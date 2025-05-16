import prisma from "@/lib/actions/prisma";
import {
  IOrganization,
  IOrganizationRepository,
} from "../interfaces/IOrganization";
import { CreateOrgDTO, OrgDTO } from "../use-cases/organization/organization";

export class OrganizationRepository implements IOrganizationRepository {
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
      email: org.email,
      password: org.password,
      userIds: org.users.map((u) => u.id),
      workspaceIds: org.workspaces.map((w) => w.id),
      licenseId: org.license?.id,
    };
  }

  async findAll(): Promise<IOrganization[]> {
    const orgs = await prisma.organization.findMany({
      include: {
        users: { select: { id: true } },
        workspaces: { select: { id: true } },
        license: { select: { id: true } },
      },
    });

    return orgs.map((org) => ({
      id: org.id,
      name: org.name,
      userIds: org.users.map((u) => u.id),
      workspaceIds: org.workspaces.map((w) => w.id),
      licenseId: org.license?.id,
    }));
  }

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
      userIds: org.users.map((u) => u.id),
      workspaceIds: org.workspaces.map((w) => w.id),
      licenseId: org.license?.id,
    };
  }

  async update(
    id: string,
    data: Partial<IOrganization>
  ): Promise<IOrganization | null> {
    const org = await prisma.organization.update({
      where: { id },
      data: {
        name: data.name,
        users: data.userIds
          ? { connect: data.userIds.map((id) => ({ id })) }
          : undefined,
        workspaces: data.workspaceIds
          ? { connect: data.workspaceIds.map((id) => ({ id })) }
          : undefined,
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
  }

  async delete(id: string): Promise<IOrganization | null> {
    const org = await prisma.organization.delete({
      where: { id },
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
  }
}
