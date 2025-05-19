import {
  CreateUserDTO,
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
}
