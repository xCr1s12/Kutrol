import { getRutasByEmpresa, createRuta } from "@/repositories/ruta.repository";
import * as ComunaRepository from "@/repositories/Comunas.repository";
import { RutaPostSchema } from "@/schema/ruta.schema";
import { fromZodError, ValidationError } from "@/utils/errors";
import { calcularComunasIntermedias } from "@/services/server/comuna.service";
import { calcularDistanciaKm } from "@/lib/distance";

export async function obtenerRutasFormateadas(id_empresa, db) {
  const rutasBd = await getRutasByEmpresa(id_empresa, db);

  return rutasBd.map((r) => {
    const puntosControl = Array.isArray(r.puntos_control)
      ? r.puntos_control.map((p) => [Number(p.latitud), Number(p.longitud)])
      : [];
    const coordenadas = [
      [Number(r.origen_latitud), Number(r.origen_longitud)],
      ...puntosControl,
      [Number(r.destino_latitud), Number(r.destino_longitud)],
    ].filter((coord) => Number.isFinite(coord[0]) && Number.isFinite(coord[1]));

    return {
      id: String(r.id_ruta),
      nombre: `${r.comuna_origen} — ${r.comuna_destino}`,
      coordenadas,
      viajes: Array.isArray(r.viajes)
        ? r.viajes.map((v) => ({
            id: String(v.id_viaje),
            estado: v.estado,
            conductor: v.conductor?.trim() ? v.conductor : "Sin conductor",
            encargado: v.encargado?.trim() ? v.encargado : "Sin encargado",
          }))
        : [],
      combustible: {
        consumo: "8,5 L",
        rendimiento: "12 km/L",
        ahorro: "15 %",
      },
      tiempoEstimado: "1 h 10 min",
      distanciaTotal: `${r.distancia_km} km`,
    };
  });
}

export async function registrarNuevaRuta(id_empresa, datosRuta, db) {
  const parsed = RutaPostSchema.safeParse(datosRuta);

  if (!parsed.success) {
    throw fromZodError(parsed.error);
  }

  const comunas = await ComunaRepository.getAllComunasWithCoordinates(db);
  const puntosDisponibles = calcularComunasIntermedias(
    comunas,
    parsed.data.id_comuna_origen,
    parsed.data.id_comuna_destino,
  );
  const idsDisponibles = new Set(puntosDisponibles.map((comuna) => Number(comuna.id)));
  if (
    !parsed.data.ids_comunas_puntos_control.every((id) =>
      idsDisponibles.has(id),
    )
  ) {
    throw new ValidationError(
      "Todos los puntos de control deben ser ciudades intermedias entre el origen y el destino.",
    );
  }

  const origen = comunas.find(
    (comuna) => comuna.id === parsed.data.id_comuna_origen,
  );
  const destino = comunas.find(
    (comuna) => comuna.id === parsed.data.id_comuna_destino,
  );
  const distanciaCalculada = calcularDistanciaKm(origen, destino);
  if (
    distanciaCalculada === null ||
    distanciaCalculada <= 0 ||
    distanciaCalculada > 999999.99
  ) {
    throw new ValidationError(
      "No se puede calcular una distancia válida para las comunas seleccionadas.",
    );
  }
  const distancia_km = Number(distanciaCalculada.toFixed(2));

  return createRuta({ ...parsed.data, id_empresa, distancia_km }, db);
}