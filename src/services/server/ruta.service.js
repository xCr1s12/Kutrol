import { getRutasByEmpresa, createRuta } from "@/repositories/ruta.repository";

export async function obtenerRutasFormateadas(id_empresa) {
  const rutasBd = await getRutasByEmpresa(id_empresa);

  return rutasBd.map((r) => {
    // Si la ruta tiene puntos de control los usamos, de lo contrario usamos coordinadas por defecto de las comunas
    const coordenadas = r.puntos_control.length > 0
      ? r.puntos_control.map(p => [Number(p.latitud), Number(p.longitud)])
      : [];

    return {
      id: String(r.id_ruta),
      nombre: `${r.comuna_origen} — ${r.comuna_destino}`,
      coordenadas,
      viajes: r.viajes.map(v => ({
        conductor: v.conductor || "Sin conductor",
        encargado: v.encargado || "Sin encargado"
      })),
      combustible: {
        consumo: "8.5 L",
        rendimiento: "12 km/L",
        ahorro: "15 %"
      },
      tiempoEstimado: "1 h 10 min",
      distanciaTotal: `${r.distancia_km} km`
    };
  });
}

export async function registrarNuevaRuta(datosRuta) {
  return await createRuta(datosRuta);
}