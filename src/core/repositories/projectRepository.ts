import prisma from "@/lib/actions/prisma";
import { IProject, IProjectRepository } from "../interfaces/IProject";

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
      description: project.description ?? undefined,
      workspaceId: project.workspaceId,
      ownerId: project.ownerId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));
  }
}
