import { pagEstadisticasController } from "@/controllers/pag_estadisticas.controller";

export async function GET() {
  return await pagEstadisticasController.getStats();
}