import type { ApiResponse } from "@/shared/dtos/api-response.dto";
import type { User } from "./user.entity";

export interface IUserRepository {
  // getUserById(id: string): Promise<User>;
  // getAllUsers(): Promise<User[]>;
  createUser(user: User): Promise<ApiResponse<User>>;
  getUsers(): Promise<ApiResponse<User[]>>;
}
