import type { ApiResponseEntity } from "@/features/core/domain/entities/ApiResponse.entity";

import type { ApiResponseDto } from "../dtos/ApiResponseDto";
import type { UserDto } from "../dtos/UserDto";
import type { UserRepository } from "../../domain/repositories/UserRepository";
import type { UserEntity } from "../../domain/entities/UserEntity";

export class UserRepositoryImp implements UserRepository {
  private readonly baseUrl: string;
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
  }
  public async createUser(user: UserEntity): Promise<ApiResponseEntity> {
    try {
      const response = fetch(`${this.baseUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("repo imp", response);
      return response;
    } catch (error: any) {
      return {
        success: false,
        message: error?.message || "algo salio mal",
      };
    }
  }

  public async getUsers(
    token: string
  ): Promise<ApiResponseEntity<UserEntity[]>> {
    try {
      const url = import.meta.env.VITE_API_URL;
      const response = await fetch(`${url}users/active`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (!response.ok && response.status !== 401)
        return { status: "error", message: "Error Inesperado" };

      if (!response.ok && response.status === 401)
        return { status: "fail", message: "No autorizado" };

      const { data } = await response.json();
      console.log("repImp", data);

      return { status: "success", message: "Usuarios Obtenidos", data };
    } catch (error) {
      console.log(error);
      return { status: "error", message: "Ocurrio un Error" };
    }
  }

  public async getProfile(
    token: string
  ): Promise<ApiResponseEntity<UserEntity>> {
    try {
      const url = import.meta.env.VITE_API_URL;
      const response = await fetch(`${url}auth/me`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok && response.status !== 401)
        return { status: "error", message: "Error Inesperado" };

      if (!response.ok && response.status === 401)
        return { status: "fail", message: "No autorizado" };

      const { data }: ApiResponseDto<UserDto> = await response.json();

      return {
        status: "success",
        message: "perfil obtenido",
        data: {
          email: data.email,
          active: data.active,
          username: data.username,
          roles: data.roles,
        },
      };
    } catch (error) {
      console.log(error);
      return { status: "error", message: "Ocurrio un Error" };
    }
  }
}
