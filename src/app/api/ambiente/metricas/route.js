import { NextResponse } from "next/server";
import { getSession } from "@/lib/tokenSession";
import { obtenerMetricasDashboard } from "@/services/server/metricas.service";

export async function GET() {
  try {
    const session = await getSession();
    if (!session || !session.id_empresa) {
      return NextResponse.json(
        { error: "No autorizado" },
        { status: 401 }
      );
    }

    // Usamos el nombre correcto exportado por el servicio
    const metricas = await obtenerMetricasDashboard(session.id_empresa);

    return NextResponse.json({
      success: true,
      data: metricas,
    });
  } catch (error) {
    console.error("Error en /api/ambiente/metricas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}