import type { ApiResponseEntity } from "@/features/core/domain/entities/ApiResponse.entity";
import type { UserEntity } from "../entities/UserEntity";
import type { newUserEntity } from "../entities/newUserEntity";
import type { RoleEntity } from "../entities/RoleEntity";
import type { PermissionEntity } from "../entities/PermissionEntity";
import type { EditRoleEntity } from "../entities/EditRoleEntity";
import type { NewRoleEntity } from "../entities/NewRoleEntity";

export interface UserRepository {
  // getUserById(id: string): Promise<User>;
  // getAllUsers(): Promise<User[]>;
  createUser(user: newUserEntity, token: string): Promise<ApiResponseEntity>;
  getUsers(token: string): Promise<ApiResponseEntity<UserEntity[]>>;
  getProfile(token: String): Promise<ApiResponseEntity<UserEntity>>;

  getPermissions(token: string): Promise<ApiResponseEntity<PermissionEntity[]>>;
  createPermission(
    token: string,
    permission: PermissionEntity
  ): Promise<ApiResponseEntity<PermissionEntity>>;
  updatePermission(
    token: string,
    permission: PermissionEntity
  ): Promise<ApiResponseEntity<PermissionEntity>>;
  deletePermission(
    token: string,
    permission: PermissionEntity
  ): Promise<ApiResponseEntity>;

  getRoles(token: string): Promise<ApiResponseEntity<RoleEntity[]>>;
  createRole(
    token: string,
    role: NewRoleEntity
  ): Promise<ApiResponseEntity<NewRoleEntity>>;
  updateRole(
    token: string,
    role: EditRoleEntity
  ): Promise<ApiResponseEntity<EditRoleEntity>>;
  deleteRole(
    token: string,
    role: RoleEntity
  ): Promise<ApiResponseEntity<RoleEntity>>;
}
