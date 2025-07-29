import type { EditRoleDTO } from "./EditRoleDto";

export interface UserDto {
  id: string;
  username: string;
  email: string;
  active: boolean;
  roles: EditRoleDTO[];
}
