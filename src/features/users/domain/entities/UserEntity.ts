import type { RoleEntity } from "./RoleEntity";

export interface UserEntity {
  id?: string;
  username: string;
  email: string;
  active: boolean;
  roles: RoleEntity[];
}
