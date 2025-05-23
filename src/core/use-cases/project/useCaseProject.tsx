import { IProjectRepository } from "@/core/interfaces/IProject";

export class useCaseProjects {
  constructor(private userRepo: IProjectRepository) {}

  async getAllProjectsByWorkspaceId(idWorkspace: string): Promise<any[]> {
    return this.userRepo.getAllProjectsByWorkspaceId(idWorkspace);
  }
}
