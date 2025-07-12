import type { PermissionEntity } from "./PermissionEntity";

export interface RoleEntity {
  name: string;
  description: string;
  isActive: boolean;
  permissionList: PermissionEntity[];
}
