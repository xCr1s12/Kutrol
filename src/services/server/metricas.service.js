<<<<<<< HEAD
import "server-only";

=======
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
import {
  VehiculosDataQuery,
  GastoTotalDinero,
  CombustibleYRendimiento,
} from "@/repositories/Vehiculos.repository";

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