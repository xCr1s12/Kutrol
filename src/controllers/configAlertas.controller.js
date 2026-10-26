import { NextResponse } from "next/server";
import { getSession } from "@/lib/tokenSession";
import { exigirAdministracion } from "@/lib/permisos";
import {
  actualizarUmbrales,
  listarConfigAlertas,
} from "@/services/server/configAlertas.service";
import { toErrorResponse, ValidationError } from "@/utils/errors";

export async function getConfigAlertas() {
  try {
    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
    }
    const data = await listarConfigAlertas();
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const { status, body } = toErrorResponse(err);
    return NextResponse.json(body, { status });
  }
}

export async function updateConfigAlerta(request) {
  try {
    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json({ ok: false, error: "No autorizado" }, { status: 401 });
    }
    exigirAdministracion(
      session,
      "Solo el dueño o un administrador pueden cambiar las alertas",
    );

    const body = await request.json();
    const id = Number(body?.id_tipo_medicion);
    if (!Number.isInteger(id) || id <= 0) {
      throw new ValidationError("El tipo de medición no es válido");
    }

    const data = await actualizarUmbrales(id, body);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const { status, body } = toErrorResponse(err);
    return NextResponse.json(body, { status });
  }
}
