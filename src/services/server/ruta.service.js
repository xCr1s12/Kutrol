import { getRutasByEmpresa, createRuta } from "@/repositories/ruta.repository";

export async function obtenerRutasFormateadas(id_empresa) {
  const rutasBd = await getRutasByEmpresa(id_empresa);

  return rutasBd.map((r) => {
    // Parseo explícito de las coordenadas numéricas traídas desde punto_control en BD
    const coordenadas = Array.isArray(r.puntos_control)
      ? r.puntos_control
          .map((p) => [parseFloat(p.latitud), parseFloat(p.longitud)])
          .filter((coord) => !isNaN(coord[0]) && !isNaN(coord[1]))
      : [];

    return {
      id: String(r.id_ruta),
      nombre: `${r.comuna_origen} — ${r.comuna_destino}`,
      coordenadas,
      viajes: Array.isArray(r.viajes)
        ? r.viajes.map((v) => ({
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

export async function registrarNuevaRuta(datosRuta) {
  return await createRuta(datosRuta);
}