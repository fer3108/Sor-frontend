import type { PermissionDto } from "./PermissionDto";

export interface RoleDTO {
  idRole: string;
  name: string;
  description: string;
  isActive: boolean;
  permissionList: PermissionDto[];
}
