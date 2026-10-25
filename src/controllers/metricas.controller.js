import { NextResponse } from "next/server";
import { getSession } from "@/lib/tokenSession";
import {
  obtenerMetricasDashboard,
  obtenerMetricasEstadisticas,
} from "@/services/server/metricas.service";

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

export async function getMetricasEstadisticas() {
  try {
    const session = await getSession();
    const id_empresa = Number(session?.id_empresa);

    if (!Number.isInteger(id_empresa) || id_empresa <= 0) {
      return NextResponse.json(
        { ok: false, error: "No autorizado" },
        { status: 401, headers },
      );
    }

    const data = await obtenerMetricasEstadisticas(id_empresa);
    return NextResponse.json({ ok: true, data }, { headers });
  } catch (error) {
    console.error("GET /api/data/metricas", error);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500, headers },
    );
  }
}