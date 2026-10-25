import { z } from "zod";

export const RutaPostSchema = z
  .object({
    id_comuna_origen: z.number().int().positive(),
    id_comuna_destino: z.number().int().positive(),
    ids_comunas_puntos_control: z
      .array(z.number().int().positive())
      .min(1)
      .refine((ids) => new Set(ids).size === ids.length, {
        message: "No se pueden repetir puntos de control",
      }),
  })
  .refine(
    (ruta) =>
      ruta.id_comuna_origen !== ruta.id_comuna_destino &&
      !ruta.ids_comunas_puntos_control.includes(ruta.id_comuna_origen) &&
      !ruta.ids_comunas_puntos_control.includes(ruta.id_comuna_destino),
    {
      path: ["ids_comunas_puntos_control"],
      message: "Origen, destino y puntos de control deben ser distintos",
    },
  );
