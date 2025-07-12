import { z } from "zod/v4";

export const newUserSchema = z.object({
  username: z.string().min(1, {
    error: "Nombre de Usuario Necesario",
  }),
  email: z.email({ error: "Email no valido" }),
  password: z.string().min(1, { error: "Contraseña es necesaria" }),
  roles: z
    .array(z.string().min(1, { error: "select rol" }))
    .refine((arr) => arr.every((r) => r !== ""), {
      message: "Selecciona un rol válido",
    })
    .min(1, { error: "Selecciona un Rol" }),
});
