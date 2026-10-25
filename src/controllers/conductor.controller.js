import * as conductorService from "@/services/server/conductor.service";
import { getSession } from "@/lib/tokenSession";
import { toErrorResponse } from "@/utils/errors";
import { NextResponse } from "next/server";

export async function getConductoresController() {
  try {
    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const conductores = await conductorService.listarConductores(session.id_empresa);
    return NextResponse.json(conductores, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    const { body, status } = toErrorResponse(err);
    return NextResponse.json(body, { status });
  }
}

export async function crearConductorController(request) {
  try {
    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const body = await request.json();
    const conductor = await conductorService.crearConductor({
      ...body,
      id_empresa: session.id_empresa,
    });
    return NextResponse.json(conductor, { status: 201 });
  } catch (err) {
    const { body, status } = toErrorResponse(err);
    return NextResponse.json(body, { status });
  }
}

export async function getHistorialConductorController(id_conductor) {
  try {
    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    const id = Number(id_conductor);
    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        { error: "El identificador del conductor no es válido" },
        { status: 400 },
      );
    }
    const historial = await conductorService.obtenerHistorialConductor(
      id,
      session.id_empresa,
    );
    return NextResponse.json(historial, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    const { body, status } = toErrorResponse(err);
    return NextResponse.json(body, { status });
  }
}
