import * as ComunaRepository from "@/repositories/Comunas.repository";

export async function getRegionesConComunas() {
  const rows = await ComunaRepository.findAllRegionesYComunas();

  const regiones = new Map();
  for (const row of rows) {
    if (!regiones.has(row.region_id)) {
      regiones.set(row.region_id, {
        id: row.region_id,
        nombre: row.region_nombre,
        comunas: [],
      });
    }
    regiones.get(row.region_id).comunas.push({
      id: row.comuna_id,
      nombre: row.comuna_nombre,
    });
  }

  return [...regiones.values()];
}