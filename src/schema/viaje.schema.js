import { z } from "zod";

export const ViajePostSchema = z
  .object({
    id_ruta: z.number().int().positive(),
    id_camion: z.number().int().positive(),
    id_conductor: z.number().int().positive(),
    fecha_inicio: z.string().datetime({ offset: true }),
    fecha_fin_estimada: z.string().datetime({ offset: true }),
  })
  .refine(
    ({ fecha_inicio, fecha_fin_estimada }) =>
      new Date(fecha_fin_estimada) > new Date(fecha_inicio),
    {
      path: ["fecha_fin_estimada"],
      message: "El término estimado debe ser posterior al inicio.",
    },
  );
