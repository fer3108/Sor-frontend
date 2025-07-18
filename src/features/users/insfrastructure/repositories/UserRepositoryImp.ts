import type { ApiResponseEntity } from "@/features/core/domain/entities/ApiResponse.entity";

import type { ApiResponseDto } from "../dtos/ApiResponseDto";
import type { UserDto } from "../dtos/UserDto";
import type { UserRepository } from "../../domain/repositories/UserRepository";
import type { UserEntity } from "../../domain/entities/UserEntity";
import type { newUserEntity } from "../../domain/entities/newUserEntity";
import type { RoleEntity } from "../../domain/entities/RoleEntity";
import type { PermissionEntity } from "../../domain/entities/PermissionEntity";

export class UserRepositoryImp implements UserRepository {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL_V1;
  }

  public async createUser(
    user: newUserEntity,
    token: string
  ): Promise<ApiResponseEntity> {
    try {
      const req = await fetch(`${this.baseUrl}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
      });

      console.log("createUSer imp", req);

      if (!req.ok && req.status === 401)
        return {
          status: "error",
          message: "No autorizado y/o respuesta no configurada",
        };

      if (!req.ok && req.status !== 401) {
        const jsonReq = await req.json();
        return {
          status: "fail",
          message: jsonReq.message || "Error Inesperado",
        };
      }

      console.log(await req.json());

      return { status: "success", message: "usuario creado" };
    } catch (error: any) {
      console.log("createUsersImp", error);
      return {
        status: "error",
        message: error.message || "Ocurrio un Error",
      };
    }
  }

  public async getUsers(
    token: string
  ): Promise<ApiResponseEntity<UserEntity[]>> {
    try {
      const url = import.meta.env.VITE_API_URL_V1;
      const response = await fetch(`${url}users/active`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (!response.ok && response.status !== 401)
        return { status: "error", message: "Error Inesperado" };

      if (!response.ok && response.status === 401)
        return { status: "fail", message: "No autorizado" };

      const { data } = await response.json();

      return { status: "success", message: "Usuarios Obtenidos", data };
    } catch (error) {
      console.log("getUsersImp", error);
      return { status: "error", message: "Ocurrio un Error" };
    }
  }

  public async getProfile(
    token: string
  ): Promise<ApiResponseEntity<UserEntity>> {
    try {
      const url = import.meta.env.VITE_API_URL_V1;
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

  public async getRoles(
    token: string
  ): Promise<ApiResponseEntity<RoleEntity[]>> {
    try {
      const req = await fetch(`${this.baseUrl}roles/active`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!req.ok && req.status !== 401)
        return { status: "error", message: "Error Inesperado" };

      if (!req.ok && req.status === 401)
        return { status: "fail", message: "No autorizado" };
      const reqJson = await req.json();

      return { status: "success", message: "Roles obtenidos", data: reqJson };
    } catch (error) {
      console.log(error);
      return { status: "error", message: "Ocurrio un Error" };
    }
  }

  public async getPermissions(
    token: string
  ): Promise<ApiResponseEntity<PermissionEntity[]>> {
    try {
      const req = await fetch(`${this.baseUrl}permissions/active`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (!req.ok && req.status !== 401)
        return { status: "error", message: "Error Inesperado" };

      if (!req.ok && req.status === 401)
        return { status: "fail", message: "No autorizado" };
      const reqJson = await req.json();

      return {
        status: "success",
        message: "Permisos obtenidos",
        data: reqJson,
      };
    } catch (error) {
      console.log(error);
      return { status: "error", message: "Ocurrio un Error" };
    }
  }
}
