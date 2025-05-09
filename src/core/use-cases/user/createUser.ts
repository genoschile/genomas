import { IUser } from "@/core/interfaces/IUser";
import { userRepository } from "@core/repositories/userRepository";

export async function createUserUseCase(
  user: Omit<IUser, "id">
): Promise<IUser> {
  const existing = await userRepository.findByEmail(user.email);

  if (existing) {
    throw new Error("User already exists");
  }

  return userRepository.create(user);
}
