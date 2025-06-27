import { z } from "zod";
export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Correo Electrónico es obligatorio",
    })
    .email({ message: "Correo Electrónico invalido" }),
  password: z
    .string()
    .min(6, { message: "Contraseña debe ser minimo 6 caracteres" }),
});
