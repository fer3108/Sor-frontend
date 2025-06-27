import type { User } from "@/features/users/domain/user.entity";
import type { IUserRepository } from "@/features/users/domain/user.repository";

export class UserService {
  constructor(private readonly userRepo: IUserRepository) {}

  async createUser(user: User) {
    // Here you can add any business logic before creating the user
    return this.userRepo.createUser(user);
  }

  async getUsers() {
    // Here you can add any business logic before fetching users
    return this.userRepo.getUsers();
  }
}
