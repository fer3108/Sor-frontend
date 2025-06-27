import addUser from "@/data/event";
import type { User } from "../domain/user.entity";
import type { IUserRepository } from "../domain/user.repository";
import type { ApiResponse } from "@/shared/dtos/api-response.dto";

export class UserRepositoryImpl implements IUserRepository {
  public async createUser(user: User): Promise<ApiResponse<User>> {
    try {
      const response = await addUser(user);
      if (!response.success) {
        return {
          success: false,
          message: "algo salio mal",
        };
      }
      return response;
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || "algo salio mal",
      };
    }
  }

  public async getUsers(): Promise<ApiResponse<User[]>> {
    return {
      success: true,
      data: [],
      message: "No hay usuarios",
    };
  }
}
