import { NextResponse } from "next/server";
import { getSession } from "@/lib/tokenSession";
import {
  listarOpcionesViaje,
  registrarViajeProgramado,
} from "@/services/server/viaje.service";
import { toErrorResponse } from "@/utils/errors";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const opciones = await listarOpcionesViaje(session.id_empresa);
    return NextResponse.json(opciones, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    const { body, status } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}

export async function POST(request) {
  try {
    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const viaje = await registrarViajeProgramado(
      session.id_empresa,
      await request.json(),
    );
    return NextResponse.json(viaje, { status: 201 });
  } catch (error) {
    const { body, status } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}
