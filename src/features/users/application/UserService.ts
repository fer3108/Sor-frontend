import type { TokenStorageRepository } from "@/features/core/domain/repositories/TokenStorageRepository";
import type { UserRepository } from "../domain/repositories/UserRepository";
import type { newUserEntity } from "../domain/entities/newUserEntity";

export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly tokenStorageRepo: TokenStorageRepository
  ) {}

  async createUser(user: newUserEntity) {
    const token = this.tokenStorageRepo.getToken("token");
    if (!token) throw new Error("Token inexistente");
    return this.userRepo.createUser(user, token);
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

  async getRoles() {
    const token = this.tokenStorageRepo.getToken("token");
    if (!token) throw new Error("Token inexistente");
    return this.userRepo.getRoles(token);
  }

  async getPermissions() {
    const token = this.tokenStorageRepo.getToken("token");
    if (!token) throw new Error("Token inexistente");
    return this.userRepo.getPermissions(token);
  }
}
