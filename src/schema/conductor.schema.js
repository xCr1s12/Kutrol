import { z } from "zod";
import { validateRut } from "@/lib/validateRut";

const fechaValida = (valor) => {
  const fecha = new Date(`${valor}T00:00:00Z`);
  return !Number.isNaN(fecha.valueOf()) && fecha.toISOString().slice(0, 10) === valor;
};

export const ConductorPostSchema = z.object({
  id_empresa: z.coerce.number().int().positive(),
  nombre: z
    .string()
    .trim()
    .min(2, "Escribe el nombre del conductor")
    .max(150, "El nombre no puede superar los 150 caracteres")
    .refine((nombre) => nombre.split(/\s+/).length >= 2, {
      message: "Ingresa el nombre y los apellidos del conductor",
    })
    .superRefine((nombre, context) => {
      const [primerNombre, ...apellidos] = nombre.split(/\s+/);
      if (primerNombre.length > 50 || apellidos.join(" ").length > 100) {
        context.addIssue({
          code: "custom",
          message: "El nombre o los apellidos superan el largo permitido",
        });
      }
    }),
  run: z
    .string()
    .trim()
    .refine((run) => !validateRut(run), "Revisa el RUN del conductor")
    .transform((run) => run.replace(/\./g, "").toUpperCase()),
  licencia_num: z
    .string()
    .trim()
    .min(4, "Escribe el número de licencia")
    .max(20, "La licencia no puede superar los 20 caracteres"),
  fecha_venc_licencia: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Ingresa una fecha válida")
    .refine(fechaValida, "Ingresa una fecha válida"),
  email: z.string().trim().email("Revisa el correo").max(100).transform((email) => email.toLowerCase()),
  telefono: z
    .string()
    .trim()
    .transform((telefono) => telefono.replace(/[^\d+]/g, ""))
    .refine((telefono) => /^\+?[0-9]{8,14}$/.test(telefono), {
      message: "Revisa el teléfono",
    }),
}).transform(({ nombre, licencia_num, ...datos }) => {
  const [primer_nombre, ...apellidos] = nombre.split(/\s+/);
  return {
    ...datos,
    primer_nombre,
    apellidos: apellidos.join(" "),
    licencia: licencia_num,
  };
});
