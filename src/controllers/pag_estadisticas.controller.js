import { NextResponse } from "next/server";
import { getSession } from "@/lib/tokenSession";
import { pagEstadisticasService } from "@/services/server/pag_estadisticas.service";

export const pagEstadisticasController = {
  async getRankingConductores() {
    try {
      const session = await getSession();
      const id_empresa = Number(session?.id_empresa);

      if (!Number.isInteger(id_empresa) || id_empresa <= 0) {
        return NextResponse.json(
          { success: false, message: "No autorizado" },
          { status: 401, headers: { "Cache-Control": "no-store" } },
        );
      }

      const ranking = await pagEstadisticasService.getRankingConductoresByEmpresa(
        id_empresa,
      );

      return NextResponse.json(
        { success: true, data: { ranking } },
        { headers: { "Cache-Control": "no-store" } },
      );
    } catch (error) {
      console.error(
        "Error en pagEstadisticasController.getRankingConductores:",
        error,
      );
      return NextResponse.json(
        { success: false, message: "Error interno al obtener el ranking" },
        { status: 500, headers: { "Cache-Control": "no-store" } },
      );
    }
  },

  async getStats() {
    try {
      const session = await getSession();
      const id_empresa = Number(session?.id_empresa);

      if (!Number.isInteger(id_empresa) || id_empresa <= 0) {
        return NextResponse.json(
          { success: false, message: "No autorizado" },
          { status: 401, headers: { "Cache-Control": "no-store" } },
        );
      }

      const data = await pagEstadisticasService.getDashboardStats(id_empresa);

      return NextResponse.json(
        { success: true, data },
        { headers: { "Cache-Control": "no-store" } },
      );
    } catch (error) {
      console.error("Error en pagEstadisticasController.getStats:", error);
      return NextResponse.json(
        { success: false, message: "Error interno al obtener las estadísticas" },
        { status: 500, headers: { "Cache-Control": "no-store" } },
      );
    }
  },

  async getConsumo(request) {
    try {
      const session = await getSession();
      const id_empresa = Number(session?.id_empresa);

      if (!Number.isInteger(id_empresa) || id_empresa <= 0) {
        return NextResponse.json(
          { success: false, message: "No autorizado" },
          { status: 401, headers: { "Cache-Control": "no-store" } },
        );
      }

      const { searchParams } = new URL(request.url);
      const periodo = searchParams.get("periodo") || "semanal";

      const data = await pagEstadisticasService.getConsumoPorPeriodo(periodo, id_empresa);

      return NextResponse.json(
        { success: true, data },
        { headers: { "Cache-Control": "no-store" } },
      );
    } catch (error) {
      console.error("Error en pagEstadisticasController.getConsumo:", error);
      return NextResponse.json(
        { success: false, message: "Error interno al obtener los datos de consumo" },
        { status: 500, headers: { "Cache-Control": "no-store" } },
      );
    }
  },
};