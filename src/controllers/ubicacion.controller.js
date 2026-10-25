import * as ComunasRepository from "@/repositories/Comunas.repository";
import * as RegionesRepository from "@/repositories/Regiones.repository";
import { getComunasIntermedias } from "@/services/server/comuna.service";

export async function getRegiones() {
  try {
    const regiones = await RegionesRepository.getAllRegiones();

    return Response.json({
      ok: true,
      data: regiones.map((region) => ({
        id: region.region_id,
        nombre: region.region_nombre,
        numero_romano: region.numero_romano,
        latitud: region.latitud,
        longitud: region.longitud,
      })),
    });
  } catch (error) {
    console.error("Error al obtener regiones:", error);
    return Response.json(
      { ok: false, error: "No se pudieron obtener las regiones." },
      { status: 500 },
    );
  }
}

export async function getComunas(request) {
  const url = new URL(request.url);
  const origenId = url.searchParams.get("origenId");
  const destinoId = url.searchParams.get("destinoId");

  if (origenId !== null || destinoId !== null) {
    const origen = Number(origenId);
    const destino = Number(destinoId);
    if (
      !Number.isInteger(origen) ||
      origen <= 0 ||
      !Number.isInteger(destino) ||
      destino <= 0 ||
      origen === destino
    ) {
      return Response.json(
        { ok: false, error: "Debes proporcionar comunas de origen y destino válidas." },
        { status: 400 },
      );
    }

    try {
      const comunas = await getComunasIntermedias(origen, destino);
      return Response.json({ ok: true, data: comunas });
    } catch (error) {
      console.error("Error al obtener ciudades intermedias:", error);
      return Response.json(
        { ok: false, error: "No se pudieron obtener las ciudades intermedias." },
        { status: 500 },
      );
    }
  }

  const regionId = Number(url.searchParams.get("regionId"));
  if (!Number.isInteger(regionId) || regionId <= 0) {
    return Response.json(
      {
        ok: false,
        error: "Debes proporcionar un regionId entero positivo.",
      },
      { status: 400 },
    );
  }

  try {
    const comunas = await ComunasRepository.getComunasbyRegion(regionId);
    if (comunas.length === 0) {
      return Response.json(
        { ok: false, error: "La región solicitada no existe." },
        { status: 404 },
      );
    }

    return Response.json({
      ok: true,
      data: comunas
        .filter((comuna) => comuna.comuna_id !== null)
        .map((comuna) => ({
          id: comuna.comuna_id,
          nombre: comuna.comuna_nombre,
          latitud: Number(comuna.latitud),
          longitud: Number(comuna.longitud),
        })),
    });
  } catch (error) {
    console.error("Error al obtener comunas:", error);
    return Response.json(
      { ok: false, error: "No se pudieron obtener las comunas." },
      { status: 500 },
    );
  }
}
