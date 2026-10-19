import { NextResponse } from "next/server";
import { pagEstadisticasService } from "@/services/server/pag_estadisticas.service";

export const pagEstadisticasController = {
  async getStats() {
    try {
      const data = await pagEstadisticasService.getDashboardStats();

      return NextResponse.json({
        success: true,
        data,
      });
    } catch (error) {
      console.error("Error en pagEstadisticasController.getStats:", error);
      return NextResponse.json(
        { success: false, message: "Error interno al obtener las estadísticas" },
        { status: 500 }
      );
    }
  },

  async getConsumo(request) {
    try {
      const { searchParams } = new URL(request.url);
      const periodo = searchParams.get("periodo") || "semanal";

      const data = await pagEstadisticasService.getConsumoPorPeriodo(periodo);

      return NextResponse.json({
        success: true,
        data,
      });
    } catch (error) {
      console.error("Error en pagEstadisticasController.getConsumo:", error);
      return NextResponse.json(
        { success: false, message: "Error interno al obtener los datos de consumo" },
        { status: 500 }
      );
    }
  },
};