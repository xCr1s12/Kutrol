import * as ComunasRepository from "@/repositories/Comunas.repository";
import * as RegionesRepository from "@/repositories/Regiones.repository";

export async function getRegiones() {
  try {
    const regiones = await RegionesRepository.getAllRegiones();

    return Response.json({
      ok: true,
      data: regiones.map((region) => ({
        id: region.region_id,
        nombre: region.region_nombre,
        numero_romano: region.numero_romano,
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
  const regionId = Number(new URL(request.url).searchParams.get("regionId"));
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
