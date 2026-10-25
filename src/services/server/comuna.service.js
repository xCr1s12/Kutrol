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

const RADIO_TIERRA_KM = 6371;
// Tolerancia para centros comunales aproximados y rutas que no siguen una línea recta.
const ANCHO_CORREDOR_KM = 50;

export function calcularComunasIntermedias(comunas, origenId, destinoId) {
  const origen = comunas.find((comuna) => Number(comuna.id) === Number(origenId));
  const destino = comunas.find((comuna) => Number(comuna.id) === Number(destinoId));

  if (!origen || !destino || Number(origenId) === Number(destinoId)) {
    return [];
  }

  const latitudReferencia =
    ((Number(origen.latitud) + Number(destino.latitud)) / 2) *
    (Math.PI / 180);
  const escalarLongitud = Math.cos(latitudReferencia);
  const punto = (comuna) => ({
    x: Number(comuna.longitud) * escalarLongitud * (Math.PI / 180) * RADIO_TIERRA_KM,
    y: Number(comuna.latitud) * (Math.PI / 180) * RADIO_TIERRA_KM,
  });
  const inicio = punto(origen);
  const fin = punto(destino);
  const vectorX = fin.x - inicio.x;
  const vectorY = fin.y - inicio.y;
  const longitudCuadrada = vectorX ** 2 + vectorY ** 2;

  if (!Number.isFinite(longitudCuadrada) || longitudCuadrada === 0) {
    return [];
  }

  return comunas
    .filter(
      (comuna) =>
        Number(comuna.id) !== Number(origenId) &&
        Number(comuna.id) !== Number(destinoId),
    )
    .map((comuna) => {
      const ubicacion = punto(comuna);
      const desdeOrigenX = ubicacion.x - inicio.x;
      const desdeOrigenY = ubicacion.y - inicio.y;
      const progreso =
        (desdeOrigenX * vectorX + desdeOrigenY * vectorY) / longitudCuadrada;
      const distanciaLateral =
        Math.abs(desdeOrigenX * vectorY - desdeOrigenY * vectorX) /
        Math.sqrt(longitudCuadrada);

      return { ...comuna, progreso, distanciaLateral };
    })
    .filter(
      (comuna) =>
        comuna.progreso > 0 &&
        comuna.progreso < 1 &&
        comuna.distanciaLateral <= ANCHO_CORREDOR_KM,
    )
    .sort((a, b) => a.progreso - b.progreso)
    .map(({ progreso: _progreso, distanciaLateral: _distancia, ...comuna }) => comuna);
}

export async function getComunasIntermedias(origenId, destinoId, db) {
  const comunas = await ComunaRepository.getAllComunasWithCoordinates(db);
  return calcularComunasIntermedias(comunas, origenId, destinoId);
}