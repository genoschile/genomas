import { IProject } from "@/core/interfaces/IProject";
import {
  CreateUserDTO,
  IUser,
  IUserRepository,
  UserDefaultAdminResponse,
  UserDTO,
} from "@/core/interfaces/IUser";

export class useCaseUsers {
  constructor(private userRepo: IUserRepository) {}

  async createUser(data: CreateUserDTO): Promise<UserDTO> {
    return this.userRepo.create(data);
  }

  async getUserById(id: string): Promise<UserDTO | null> {
    return this.userRepo.findById(id);
  }

  async deleteUser(id: string): Promise<UserDTO | null> {
    return this.userRepo.delete(id);
  }

  async createUserAdmin(data: CreateUserDTO): Promise<UserDTO> {
    return this.userRepo.create(data);
  }

  async getAllUsersOrganization(id: string): Promise<UserDTO[]> {
    return this.userRepo.getAllUsersOrganization(id);
  }

  async addUserToOrg(
    orgId: string,
    data?: Omit<IUser, "id"> & { userId?: string }
  ): Promise<UserDTO> {
    return this.userRepo.addUserToOrg(orgId, data);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.userRepo.findByEmail(email);
  }

  async findDefaultAdminByOrgId(orgId: string): Promise<UserDefaultAdminResponse | null> {
    return this.userRepo.findDefaultAdminByOrgId(orgId);
  }

  async switchSession(email: string, password: string): Promise<IUser> {
    return this.userRepo.switchSession(email, password);
  }

  async currentProjectsByUserId(id: string): Promise<IProject[]> {
    return this.userRepo.currentProjectsByUserId(id);
  }
}
