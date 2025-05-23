import {
  CreateUserDTO,
  IUser,
  IUserRepository,
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
}
