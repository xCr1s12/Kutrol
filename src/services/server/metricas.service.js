import "server-only";

import {
  VehiculosDataQuery,
  GastoTotalDinero,
  CombustibleYRendimiento,
} from "@/repositories/Vehiculos.repository";
import { obtenerMetricasEstadisticas as consultarMetricasEstadisticas } from "@/repositories/metricas.repository";

const num = (v) => Number(v ?? 0) || 0;

export async function obtenerMetricasDashboard(id_empresa) {
  const [vehiculos, gasto, combustible] = await Promise.all([
    VehiculosDataQuery(id_empresa),
    GastoTotalDinero(id_empresa),
    CombustibleYRendimiento(id_empresa),
  ]);

  return {
    vehiculos: {
      disponibles: num(vehiculos?.vehiculos_disponibles),
      totales: num(vehiculos?.total_vehiculos),
    },
    gasto: { total: num(gasto?.gasto_total) },
    combustible: {
      litros: num(combustible?.litros_consumidos),
      kmPorLitro: num(combustible?.km_por_litro),
    },
  };
}

export async function obtenerMetricasEstadisticas(id_empresa) {
  return consultarMetricasEstadisticas(id_empresa);
}