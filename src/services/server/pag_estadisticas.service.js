import { estadisticaRepository } from "@/repositories/pag_estadistica.repository";

export const pagEstadisticasService = {
  async getDashboardStats() {
    const stats = await estadisticaRepository.getDashboardStats();
    
    return {
      ...stats,
      rendimiento: stats.rendimiento || 0,
    };
  },

  async getConsumoPorPeriodo(periodo) {
    const periodosValidos = ["semanal", "mensual", "anual"];
    const periodoFinal = periodosValidos.includes(periodo) ? periodo : "semanal";

    return await estadisticaRepository.getConsumoPorPeriodo(periodoFinal);
  },
};