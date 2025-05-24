import prisma from "@/lib/actions/prisma";
import { IProject, IProjectDTO, IProjectRepository, IProjectResponse } from "../interfaces/IProject";

export class ProjectRepository implements IProjectRepository {
  async getAllProjectsByWorkspaceId(idWorkspace: string): Promise<IProject[]> {
    const projects = await prisma.project.findMany({
      where: {
        workspaceId: idWorkspace,
      },
    });

    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description ,
      workspaceId: project.workspaceId,
      ownerId: project.ownerId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));
  }

  async createProject(
    idWorkspace: string,
    data: IProjectDTO
  ): Promise<IProjectResponse | null> {
    const project = await prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        workspaceId: idWorkspace,
        ownerId: data.ownerId,
      },
    });

    return project;
  }
}
