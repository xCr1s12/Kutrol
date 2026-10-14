import { NextResponse } from "next/server";
import { getSession } from "@/lib/tokenSession";
import { obtenerMetricasDashboard } from "@/services/server/metricas.service";

const headers = { "Cache-Control": "no-store" };

export async function getMetricas() {
  try {
    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json(
        { ok: false, error: "No autorizado" },
        { status: 401, headers }
      );
    }

    const data = await obtenerMetricasDashboard(session.id_empresa);
    return NextResponse.json({ ok: true, data }, { headers });
  } catch (err) {
    console.error("GET /api/dashboard/metricas", err);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500, headers }
    );
  }
} 