import { z } from "zod";
<<<<<<< HEAD
<<<<<<< HEAD
import { telefonoSchema, emailSchema } from "@/schema/comunicacion.schema";
import { validateCompanyRut } from "@/lib/validateCompanyRut";

const EmpresaSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre de la empresa es obligatorio"),
  rut: z
    .string()
    .trim()
    .superRefine((val, ctx) => {
      const errorMsg = validateCompanyRut(val);
      if (errorMsg !== "") {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: errorMsg });
      }
    }),
  direccion: z.string().trim().min(5, "La dirección es obligatoria"),
  descripcion: z.string().trim().optional(),
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
=======
import { validateEmpresaRut } from "@/lib/validateEmpresaRut";
=======
import { telefonoSchema, emailSchema } from "@/schema/comunicacion.schema";
import { validateCompanyRut } from "@/lib/validateCompanyRut";
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)

const EmpresaSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre de la empresa es obligatorio"),
  rut: z.string().trim().superRefine((val, ctx) => {
    const errorMsg = validateCompanyRut(val);
    if (errorMsg !== "") {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: errorMsg });
    }
  }),
  direccion: z.string().trim().min(5, "La dirección es obligatoria"),
  descripcion: z.string().trim().optional(),
  url_imagen: z.string().url("Debe ser una URL válida").optional().or(z.literal("")),
<<<<<<< HEAD
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
=======
  telefonos: z.array(telefonoSchema).min(1, "Ingresa al menos un teléfono").max(5),
  emails: z.array(emailSchema).min(1, "Ingresa al menos un email").max(5),
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
  id_comuna: z.coerce
    .number({ invalid_type_error: "Selecciona una comuna" })
    .int()
    .positive("Selecciona una comuna"),

});

const EncargadoSchema = z.object({
<<<<<<< HEAD
<<<<<<< HEAD
=======
  usuario: z.string().trim().min(3, "El usuario debe tener al menos 3 caracteres"),
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
=======
>>>>>>> 21bc88e (feat(register): add multi-step registration with image upload and location services)
  primer_nombre: z.string().trim().min(2, "El primer nombre es obligatorio"),
  apellidos: z.string().trim().min(2, "Los apellidos son obligatorios"),
  email: z.string().trim().toLowerCase().email("Email inválido"),
  cargo: z.string().trim().min(2, "El cargo es obligatorio"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
<<<<<<< HEAD
=======
  
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
});

export const registerEmpresaAndEncargadoSchema = z.object({
  Encargado: EncargadoSchema,
  Empresa: EmpresaSchema,
<<<<<<< HEAD
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
=======
});
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
