import {
  MetricasAmbienteQuery,
  MapaCalorHorarioQuery,
  MapaCalorZonasQuery,
  MapaCalorCamionesRutaQuery,
} from "@/repositories/ambiente.repository";

export async function obtenerMapaCalorAmbiente(id_empresa) {
  const [metricas, horarioData, zonasData, camionesRutaData] = await Promise.all([
    MetricasAmbienteQuery(id_empresa),
    MapaCalorHorarioQuery(id_empresa),
    MapaCalorZonasQuery(id_empresa),
    MapaCalorCamionesRutaQuery(id_empresa),
  ]);

  // 1. Matriz de 7 días x 24 horas
  const matrizHoraria = Array.from({ length: 7 }, () => Array(24).fill(0));
  horarioData.forEach((item) => {
    const dia = item.dia_semana;
    const hora = item.hora_dia;
    if (dia >= 0 && dia < 7 && hora >= 0 && hora < 24) {
      const val = Number(item.emision_promedio);
      matrizHoraria[dia][hora] = val > 15 ? 2 : val > 8 ? 1 : 0;
    }
  });

  // 2. Zonas
  const zonas = zonasData.map((z) => ({
    comuna: z.comuna,
    descripcion: `Velocidad prom: ${Math.round(z.velocidad_prom || 0)} km/h`,
    co2: `${(z.total_lecturas * 0.05).toFixed(1)} Ton`,
    nivel: z.total_lecturas > 100 ? 2 : z.total_lecturas > 30 ? 1 : 0,
  }));

  // 3. Camiones vs Rutas
  const listaCamiones = [...new Set(camionesRutaData.map((cr) => cr.patente))].filter(Boolean);
  const listaRutas = [...new Set(camionesRutaData.map((cr) => cr.ruta))].filter(Boolean);

  const matrizCamiones = listaCamiones.map((patente) => {
    return listaRutas.map((ruta) => {
      const encontrado = camionesRutaData.find(
        (cr) => cr.patente === patente && cr.ruta === ruta
      );
      const viajes = Number(encontrado?.total_viajes ?? 0);
      return viajes > 5 ? 2 : viajes > 0 ? 1 : 0;
    });
  });

  // 4. Cálculo dinámico de Meta Verde (Impacto Ecológico)
  const kmPorLitro = Number(metricas.km_por_litro || 0);
  // Rendimiento meta referencial: 3.5 km/L es el 100% de la meta
  const porcentajeMetaVerde = kmPorLitro > 0 ? Math.min(100, Math.round((kmPorLitro / 3.5) * 100)) : 0;

  return {
    litros_totales: Number(metricas.litros_totales || 0),
    km_por_litro: Number(metricas.km_por_litro || 0),
    matrizHoraria,
    zonas,
    camionesRuta: {
      camiones: listaCamiones,
      rutas: listaRutas,
      matrizCamiones,
    },
    impactoEcologico: {
      cumplimientoMetaVerde: porcentajeMetaVerde,
    },
  };
}