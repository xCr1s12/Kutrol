import { z } from "zod";

export const telefonoSchema = z
  .string()
  .trim()
  .regex(/^\+?[0-9\s-]{8,15}$/, "Teléfono inválido");

export const emailSchema = z.string().trim().toLowerCase().email("Email inválido");