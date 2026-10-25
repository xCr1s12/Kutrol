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

  // inicializamos la matriz de 7 dias por 24 horas
  const matrizHoraria = Array.from({ length: 7 }, () => Array(24).fill(0));

  horarioData.forEach((item) => {
    const dia_semana_actual = item.dia_semana;
    const hora_dia_actual = item.hora_dia;
    const valor_emision_promedio = Number(item.emision_promedio || 0);

    if (dia_semana_actual >= 0 && dia_semana_actual < 7 && hora_dia_actual >= 0 && hora_dia_actual < 24) {
      if (valor_emision_promedio >= 11.0) {
        matrizHoraria[dia_semana_actual][hora_dia_actual] = 2; // critico o elevado que seria el color cafe
      } else if (valor_emision_promedio >= 4.0) {
        matrizHoraria[dia_semana_actual][hora_dia_actual] = 1; // moderado que seria el color dorado
      } else {
        matrizHoraria[dia_semana_actual][hora_dia_actual] = 0; // bajo o eficiente que seria el color verde
      }
    }
  });
  
  // se arman los datos reales de las zonas geograficas
  const zonas = zonasData.map((zona_geografica) => ({
    comuna: zona_geografica.comuna,
    descripcion: `Velocidad prom: ${zona_geografica.velocidad_prom || 0} km/h`,
    co2: `${(zona_geografica.total_lecturas * 0.05)} Ton`,
    nivel: zona_geografica.total_lecturas > 100 ? 2 : zona_geografica.total_lecturas > 30 ? 1 : 0,
  }));

  // relacion de camiones versus rutas
  const listaCamiones = [...new Set(camionesRutaData.map((registro_camion_ruta) => registro_camion_ruta.patente))].filter(Boolean);
  const listaRutas = [...new Set(camionesRutaData.map((registro_camion_ruta) => registro_camion_ruta.ruta))].filter(Boolean);

  const matrizCamiones = listaCamiones.map((patente_camion) => {
    return listaRutas.map((ruta_asignada) => {
      const viaje_encontrado = camionesRutaData.find(
        (registro_camion_ruta) => registro_camion_ruta.patente === patente_camion && registro_camion_ruta.ruta === ruta_asignada
      );
      const cantidad_total_viajes = Number(viaje_encontrado?.total_viajes ?? 0);
      return cantidad_total_viajes > 5 ? 2 : cantidad_total_viajes > 0 ? 1 : 0;
    });
  });

  // aca calculamos la meta verde y sacamos el 85 que estaba fijo, tirando null si no hay datos de rendimiento reales
  const kilometros_por_litro = Number(metricas?.km_por_litro || 0);
  const porcentaje_cumplimiento_meta_verde = kilometros_por_litro > 0 ? Math.min(100, (kilometros_por_litro / 3.5) * 100) : null;

  return {
    litros_totales: Number(metricas?.litros_totales || 0),
    km_por_litro: Number(metricas?.km_por_litro || 0),
    matrizHoraria,
    zonas,
    camionesRuta: {
      camiones: listaCamiones,
      rutas: listaRutas,
      matrizCamiones,
    },
    impactoEcologico: {
      cumplimientoMetaVerde: porcentaje_cumplimiento_meta_verde,
    },
  };
}