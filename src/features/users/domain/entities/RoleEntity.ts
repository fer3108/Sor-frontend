import type { PermissionEntity } from "./PermissionEntity";

export interface RoleEntity {
  id?: string;
  name: string;
  description: string;
  isActive: boolean;
  permissionList: PermissionEntity[];
}
