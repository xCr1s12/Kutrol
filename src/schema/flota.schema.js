import { z } from "zod";

export const FlotaPostSchema = z.object({
    id_empresa: z.coerce
        .number({ error: "El identificador de la empresa debe ser un número." })
        .int({ error: "El identificador de la empresa debe ser un número entero." })
        .positive({ error: "Debes seleccionar un identificador válido." }),

    id_tipo_flota: z.coerce
        .number({ error: "El identificador del tipo de flota debe ser un número." })
        .int({ error: "El identificador del tipo de flota debe ser un número entero." })
        .positive({ error: "Debes seleccionar un tipo de flota válido." }),

    nombre: z
        .string({ error: "El nombre de la flota debe ser texto." })
        .trim()
        .min(1, { error: "El nombre es obligatorio." })
        .max(50, { error: "El nombre no puede superar los 50 caracteres." }),

    descripcion: z
        .string({ error: "La descripción debe ser texto." })
        .trim()
        .max(255, { error: "La descripción no puede superar los 255 caracteres." })
        .nullish()
        .transform((v) => v || null),
});