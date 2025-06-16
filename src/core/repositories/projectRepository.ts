import prisma from "@/lib/actions/prisma";
import {
  IProject,
  IProjectDTO,
  IProjectRepository,
  IProjectResponse,
} from "../interfaces/IProject";
import { AccessType } from "@prisma/client";
import { mapFromPrismaAccessType } from "../mapTypes/accessTypes";

export class ProjectRepository implements IProjectRepository {
  async getAllProjectsByWorkspaceId(
    idWorkspace: string
  ): Promise<IProjectResponse[]> {
    const projects = await prisma.project.findMany({
      where: {
        workspaceId: idWorkspace,
      },
      include: {
        sharedWith: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        sharedWithGroups: {
          include: {
            group: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      workspaceId: project.workspaceId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
      users: project.sharedWith.map((share) => share.user),
      groups: project.sharedWithGroups.map((share) => share.group),
    }));
  }

  async createProject(
    idWorkspace: string,
    data: IProjectDTO
  ): Promise<IProjectResponse | null> {
    const sharedWith =
      data.users && data.users.length
        ? data.users.map((user) => ({
            user: { connect: { id: user.id } },
            access: AccessType.EDIT,
          }))
        : [];

    const sharedWithGroups =
      data.groups && data.groups.length
        ? data.groups.map((group) => ({
            group: { connect: { id: group.id } },
            access: AccessType.EDIT,
          }))
        : [];

    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        workspaceId: idWorkspace,
        sharedWith: { create: sharedWith },
        sharedWithGroups: { create: sharedWithGroups },
      },
      include: {
        sharedWith: {
          include: { user: true },
        },
        sharedWithGroups: {
          include: { group: true },
        },
      },
    });

    const transformedProject = {
      ...project,
      sharedWith: project.sharedWith.map((share) => ({
        id: share.id,
        userId: share.userId,
        projectId: share.projectId,
        access: mapFromPrismaAccessType(share.access),
        createdAt: share.createdAt,
        user: {
          id: share.user.id,
          name: share.user.name,
          email: share.user.email,
        },
      })),
      sharedWithGroups: project.sharedWithGroups.map((groupShare) => ({
        id: groupShare.id,
        groupId: groupShare.groupId,
        projectId: groupShare.projectId,
        access: mapFromPrismaAccessType(groupShare.access),
        createdAt: groupShare.createdAt,
        group: {
          id: groupShare.group.id,
          name: groupShare.group.name,
        },
      })),
    };

    return transformedProject;
  }
}
