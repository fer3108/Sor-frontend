import type { ApiResponseEntity } from "@/features/core/domain/entities/ApiResponse.entity";
import type { UserEntity } from "../entities/UserEntity";

export interface UserRepository {
  // getUserById(id: string): Promise<User>;
  // getAllUsers(): Promise<User[]>;
  createUser(user: UserEntity): Promise<ApiResponseEntity>;
  getUsers(token: string): Promise<ApiResponseEntity<UserEntity[]>>;
  getProfile(token: String): Promise<ApiResponseEntity<UserEntity>>;
}
