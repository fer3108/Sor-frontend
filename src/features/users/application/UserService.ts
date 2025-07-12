import type { TokenStorageRepository } from "@/features/core/domain/repositories/TokenStorageRepository";
import type { UserRepository } from "../domain/repositories/UserRepository";
import type { UserEntity } from "../domain/entities/UserEntity";

export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokenStorageRepo: TokenStorageRepository
  ) {}

  async createUser(user: UserEntity) {
    // Here you can add any business logic before creating the user
    return this.userRepo.createUser(user);
  }

  async getUsers() {
    const token = this.tokenStorageRepo.getToken("token");
    if (!token) throw new Error("Token inexistente");
    return this.userRepo.getUsers(token);
  }

  async obteinProfile() {
    const token = this.tokenStorageRepo.getToken("token");
    if (!token) throw new Error("Token inexistente");
    return this.userRepo.getProfile(token);
  }
}
