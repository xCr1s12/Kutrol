import { estadisticaRepository } from "@/repositories/pag_estadistica.repository";

export const pagEstadisticasService = {
  async getRankingConductoresByEmpresa(id_empresa) {
    return estadisticaRepository.getRankingConductoresByEmpresa(id_empresa);
  },

  async getDashboardStats(id_empresa) {
    const stats = await estadisticaRepository.getDashboardStats(id_empresa);
    
    return {
      ...stats,
      rendimiento: stats.rendimiento || 0,
    };
  },

  async getConsumoPorPeriodo(periodo, id_empresa) {
    const periodos_validos = ["semanal", "mensual", "anual"];
    const periodo_final = periodos_validos.includes(periodo) ? periodo : "semanal";

    return await estadisticaRepository.getConsumoPorPeriodo(periodo_final, id_empresa);
  },
};