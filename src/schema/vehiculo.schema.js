import { z } from "zod";

const TIPOS_COMBUSTIBLE = ["DIESEL", "GASOLINA", "GNC", "GLP", "ELECTRICO"];
const ESTADOS_CAMION = ["DISPONIBLE", "EN_RUTA", "MANTENCION", "FUERA_DE_SERVICIO"];

const maxDosDecimales = (n) => Math.abs(n * 100 - Math.round(n * 100)) < 1e-6;

const patenteSchema = z
  .string({ required_error: "La patente es obligatoria" })
  .transform((v) => v.replace(/[\s-]/g, "").toUpperCase())
  .pipe(
    z
      .string()
      .min(1, "La patente es obligatoria")
      .max(10, "Máximo 10 caracteres")
      .regex(
        /^([BCDFGHJKLPRSTVWXYZ]{4}\d{2}|[A-Z]{2}\d{4})$/,
        "Formato inválido (ej: BCDF12 o AB1234)"
      )
  );

export const camionFormSchema = z.object({
  id_flota: z.coerce
    .number({ error: "El identificador de la flota debe ser un número." })
    .int({ error: "El identificador de la flota debe ser un número entero." })
    .positive({ error: "Debes seleccionar una flota válida." }),

  patente: patenteSchema,

  codigo_dispositivo: z
    .string({ error: "El código del dispositivo debe ser texto." })
    .trim()
    .min(1, { error: "El código del dispositivo es obligatorio." })
    .max(50, { error: "El código del dispositivo no puede superar los 50 caracteres." }),

  marca: z
    .string({ error: "La marca debe ser texto." })
    .trim()
    .min(1, { error: "La marca es obligatoria." })
    .max(50, { error: "La marca no puede superar los 50 caracteres." }),

  modelo: z
    .string({ error: "El modelo debe ser texto." })
    .trim()
    .min(1, { error: "El modelo es obligatorio." })
    .max(50, { error: "El modelo no puede superar los 50 caracteres." }),

  ano: z.coerce
    .number({ error: "El año debe ser un número válido." })
    .int({ error: "El año debe ser un número entero." })
    .min(1990, { error: "El año no puede ser anterior a 1990." })
    .max(2100, { error: "El año no puede ser posterior a 2100." }),

  capacidad_carga_kg: z.coerce
    .number({ error: "La capacidad de carga debe ser un número válido." })
    .positive({ error: "La capacidad de carga debe ser mayor que 0 kg." })
    .max(999999.99, { error: "La capacidad de carga no puede superar 999.999,99 kg." })
    .refine(maxDosDecimales, {
      error: "La capacidad de carga admite como máximo 2 decimales.",
    }),

  capacidad_estanque_l: z.coerce
    .number({ error: "La capacidad del estanque debe ser un número válido." })
    .positive({ error: "La capacidad del estanque debe ser mayor que 0 litros." })
    .max(99999.99, { error: "La capacidad del estanque no puede superar 99.999,99 litros." })
    .refine(maxDosDecimales, {
      error: "La capacidad del estanque admite como máximo 2 decimales.",
    }),

  tipo_combustible: z.enum(TIPOS_COMBUSTIBLE, {
    error: "Selecciona un tipo de combustible válido.",
  }).default("DIESEL"),
  estado: z.enum(ESTADOS_CAMION, {
    error: "Selecciona un estado válido para el vehículo.",
  }).default("DISPONIBLE"),
});