import {
  IProjectDTO,
  IProjectFile,
  IProjectRepository,
} from "@/core/interfaces/IProject";

export class useCaseProjects {
  constructor(private userRepo: IProjectRepository) {}

  async getAllProjectsByWorkspaceId(idWorkspace: string): Promise<any[]> {
    return this.userRepo.getAllProjectsByWorkspaceId(idWorkspace);
  }

  async createProject(idWorkspace: string, data: IProjectDTO): Promise<any> {
    return this.userRepo.createProject(idWorkspace, data);
  }

  async addFilesToProject(
    idProject: string,
    files: Omit<IProjectFile, "id">[]
  ): Promise<any> {
    return this.userRepo.addFilesToProject(idProject, files);
  }

  async getFilesByProjectId(idProject: string): Promise<IProjectFile[] | null> {
    return await this.userRepo.getFilesByProjectId(idProject);
  }
}
