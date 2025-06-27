export interface User {
  id?: string;
  name_user: string;
  email: string;
  // password: string;
  role: UserRole;
  // status: UserStatus;
  // createdAt: Date;
  // updatedAt: Date;
}

export enum UserStatus {
  PENDING = "pending",
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export interface UserCreate extends Pick<User, "email" | "role"> {}

export interface UserResponse {
  success: boolean;
  message: string;
  data?: User;
}
