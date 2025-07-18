import type { ApiResponseEntity } from "@/features/core/domain/entities/ApiResponse.entity";
import type { UserEntity } from "../entities/UserEntity";
import type { newUserEntity } from "../entities/newUserEntity";
import type { RoleEntity } from "../entities/RoleEntity";
import type { PermissionEntity } from "../entities/PermissionEntity";

export interface UserRepository {
  // getUserById(id: string): Promise<User>;
  // getAllUsers(): Promise<User[]>;
  createUser(user: newUserEntity, token: string): Promise<ApiResponseEntity>;
  getUsers(token: string): Promise<ApiResponseEntity<UserEntity[]>>;
  getProfile(token: String): Promise<ApiResponseEntity<UserEntity>>;

  getRoles(token: string): Promise<ApiResponseEntity<RoleEntity[]>>;
  getPermissions(token: string): Promise<ApiResponseEntity<PermissionEntity[]>>;
}
