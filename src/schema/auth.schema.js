import { z } from "zod";
import { telefonoSchema, emailSchema } from "@/schema/comunicacion.schema";
import { validateRut } from "@/lib/validateRut";
import { mensajePassword } from "@/lib/passwordPolicy";

export const EmpresaSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(2, "El nombre de la empresa es obligatorio")
    .max(100, "El nombre no puede superar 100 caracteres"),
  rut: z
    .string()
    .trim()
    .superRefine((val, ctx) => {
      const errorMsg = validateRut(val);
      if (errorMsg !== "") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: errorMsg });
      }
    }),
  direccion: z
    .string()
    .trim()
    .min(5, "La dirección es obligatoria")
    .max(200, "La dirección no puede superar 200 caracteres"),
  descripcion: z.string().trim().max(255, "La descripción no puede superar 255 caracteres").optional(),
  url_imagen: z
    .string()
    .url("Debe ser una URL válida")
    .optional()
    .or(z.literal("")),
  telefonos: z
    .array(telefonoSchema)
    .min(1, "Ingresa al menos un teléfono")
    .max(5),
  emails: z.array(emailSchema).min(1, "Ingresa al menos un email").max(5),
  id_comuna: z.coerce
    .number({ invalid_type_error: "Selecciona una comuna" })
    .int()
    .positive("Selecciona una comuna"),
});

const EncargadoSchema = z.object({
  primer_nombre: z.string().trim().min(2, "El primer nombre es obligatorio").max(50, "El nombre no puede superar 50 caracteres"),
  apellidos: z.string().trim().min(2, "Los apellidos son obligatorios").max(100, "Los apellidos no pueden superar 100 caracteres"),
  email: z.string().trim().toLowerCase().max(100, "El email no puede superar 100 caracteres").email("Email inválido"),
  cargo: z.string().trim().min(2, "El cargo es obligatorio").max(100, "El cargo no puede superar 100 caracteres"),
  password: z.string().superRefine((val, ctx) => {
    const mensaje = mensajePassword(val);
    if (mensaje) ctx.addIssue({ code: z.ZodIssueCode.custom, message: mensaje });
  }),
});

export const registerEmpresaAndEncargadoSchema = z.object({
  Encargado: EncargadoSchema,
  Empresa: EmpresaSchema,
});

export const flotaIdSchema = z.coerce
  .number({ invalid_type_error: "flota_id debe ser un número" })
  .int()
  .positive("flota_id debe ser un entero positivo");

export const loginSchema = z.object({
  usuario: z
    .string({ required_error: "El usuario es obligatorio" })
    .trim()
    .min(1, "El usuario es obligatorio")
    .max(100, "Usuario demasiado largo"),

  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .min(1, "La contraseña es obligatoria")
    .max(72, "Contraseña demasiado larga"),
});
