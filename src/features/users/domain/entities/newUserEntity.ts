import type { UserEntity } from "./UserEntity";

export interface newUserEntity extends Omit<UserEntity, "roles"> {
  roles: string[];
}
