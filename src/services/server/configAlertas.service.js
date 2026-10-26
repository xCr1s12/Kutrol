import { z } from "zod";
import * as TipoMedicionRepo from "@/repositories/tipoMedicion.repository";
import { NotFoundError, ValidationError, fromZodError } from "@/utils/errors";

// vacio o null = sin umbral
const umbral = z.preprocess(
  (v) => (v === "" || v === undefined ? null : v),
  z.coerce.number({ message: "El umbral debe ser un número" }).nullable(),
);

const umbralesSchema = z.object({
  umbral_min: umbral,
  umbral_max: umbral,
  id_severidad: z.coerce.number().int().min(1).max(5, "Severidad no válida"),
});

export async function listarConfigAlertas() {
  const [tipos, severidades] = await Promise.all([
    TipoMedicionRepo.findTiposMedicion(),
    TipoMedicionRepo.findSeveridades(),
  ]);
  return { tipos, severidades };
}

export async function actualizarUmbrales(id_tipo_medicion, payload) {
  const parsed = umbralesSchema.safeParse(payload);
  if (!parsed.success) throw fromZodError(parsed.error);
  const datos = parsed.data;

  const tipo = await TipoMedicionRepo.findTipoMedicionById(id_tipo_medicion);
  if (!tipo) throw new NotFoundError("El tipo de medición no existe");

  if (datos.umbral_min !== null && datos.umbral_max !== null && datos.umbral_min >= datos.umbral_max) {
    throw new ValidationError("El umbral mínimo debe ser menor que el máximo");
  }

  // un umbral fuera del rango fisico nunca se cruzaria
  const min = tipo.valor_min_fisico;
  const max = tipo.valor_max_fisico;
  for (const valor of [datos.umbral_min, datos.umbral_max]) {
    if (valor === null) continue;
    if ((min !== null && valor < min) || (max !== null && valor > max)) {
      throw new ValidationError(`El umbral debe estar entre ${min} y ${max}`);
    }
  }

  return TipoMedicionRepo.updateUmbrales(id_tipo_medicion, datos);
}
