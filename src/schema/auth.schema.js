import { z } from "zod";
import { telefonoSchema, emailSchema } from "@/schema/comunicacion.schema";
import { validateCompanyRut } from "@/lib/validateCompanyRut";

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
  telefonos: z.array(telefonoSchema).min(1, "Ingresa al menos un teléfono").max(5),
  emails: z.array(emailSchema).min(1, "Ingresa al menos un email").max(5),
  id_comuna: z.coerce
    .number({ invalid_type_error: "Selecciona una comuna" })
    .int()
    .positive("Selecciona una comuna"),

});

const EncargadoSchema = z.object({
  usuario: z.string().trim().min(3, "El usuario debe tener al menos 3 caracteres"),
  primer_nombre: z.string().trim().min(2, "El primer nombre es obligatorio"),
  apellidos: z.string().trim().min(2, "Los apellidos son obligatorios"),
  email: z.string().trim().toLowerCase().email("Email inválido"),
  cargo: z.string().trim().min(2, "El cargo es obligatorio"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  
});

export const registerEmpresaAndEncargadoSchema = z.object({
  Encargado: EncargadoSchema,
  Empresa: EmpresaSchema,
});