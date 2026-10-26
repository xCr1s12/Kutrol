import { NextResponse } from "next/server";
import { getSession } from "@/lib/tokenSession";
import {
  cancelarViajeService,
  completarViajeService,
  iniciarViajeService,
  listarOpcionesViaje,
  registrarViajeProgramado,
} from "@/services/server/viaje.service";
import { toErrorResponse, ValidationError } from "@/utils/errors";

function obtenerIdEmpresa(session) {
  return session?.id_empresa;
}

async function leerBodyOpcional(request) {
  const texto = await request.text();
  if (!texto.trim()) return {};

  let body;
  try {
    body = JSON.parse(texto);
  } catch {
    throw new ValidationError("El cuerpo debe ser JSON válido.");
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new ValidationError("El cuerpo debe ser un objeto JSON.");
  }
  return body;
}

export async function getOpcionesViajeController() {
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

export async function crearViajeController(request) {
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

export async function iniciarViajeController(request, { params }) {
  try {
    const session = await getSession();
    const id_empresa = obtenerIdEmpresa(session);
    if (!id_empresa) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const viaje = await iniciarViajeService(id, id_empresa);
    return NextResponse.json({ viaje });
  } catch (error) {
    const { body, status } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}

export async function completarViajeController(request, { params }) {
  try {
    const session = await getSession();
    const id_empresa = obtenerIdEmpresa(session);
    if (!id_empresa) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const { fecha_fin } = await leerBodyOpcional(request);
    const viaje = await completarViajeService(id, id_empresa, fecha_fin);
    return NextResponse.json({ viaje });
  } catch (error) {
    const { body, status } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}

export async function cancelarViajeController(request, { params }) {
  try {
    const session = await getSession();
    const id_empresa = obtenerIdEmpresa(session);
    if (!id_empresa) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const viaje = await cancelarViajeService(id, id_empresa);
    return NextResponse.json({ viaje });
  } catch (error) {
    const { body, status } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}
