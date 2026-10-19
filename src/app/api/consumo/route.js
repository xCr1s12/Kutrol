import { pagEstadisticasController } from "@/controllers/pag_estadisticas.controller";

export async function GET(request) {
  return await pagEstadisticasController.getConsumo(request);
}