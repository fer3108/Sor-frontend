import type { RoleDTO } from "./RoleDto";

export interface UserDto {
  id: string;
  username: string;
  email: string;
  active: boolean;
  roles: RoleDTO[];
}
