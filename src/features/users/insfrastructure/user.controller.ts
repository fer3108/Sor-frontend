import { z } from "zod/v4";
import { UserRole } from "../domain/user.entity";

export const newUserSchema = z.object({
  email: z.email({ message: "Email no valido" }),
  role: z.enum(UserRole, { error: "Debe seleccionar un Rol para el usuario" }),
});

export const defaultUserValues = {
  email: "admin@admin.com",
  role: "",
};
