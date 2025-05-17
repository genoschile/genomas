import { CreateUserDTO, IUserRepository, UserDTO } from "@/core/interfaces/IUser";

export class useCaseUsers {
  constructor(private userRepo: IUserRepository) {}

  async createUser(data: CreateUserDTO): Promise<UserDTO> {
    return this.userRepo.create(data);
  }

  async getUserById(id: string): Promise<UserDTO | null> {
    return this.userRepo.findById(id);
  }

  async getAllUsers(): Promise<UserDTO[]> {
    return this.userRepo.findAll();
  }

  async updateUser(id: string, data: Partial<UserDTO>): Promise<UserDTO | null> {
    return this.userRepo.update(id, data);
  }

  async deleteUser(id: string): Promise<UserDTO | null> {
    return this.userRepo.delete(id);
  }
}