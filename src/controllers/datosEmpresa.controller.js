import { NextResponse } from "next/server";
import { getSession } from "@/lib/tokenSession";
import {
  actualizarEmpresa,
  getEmpresaByID,
} from "@/services/server/datosEmpresa.service";
import { toErrorResponse } from "@/utils/errors";
import { exigirAdministracion } from "@/lib/permisos";

export async function getDataEmpresaByID() {
  try {
    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json(
        { ok: false, error: "No autorizado" },
        { status: 401 },
      );
    }
    const data = await getEmpresaByID(session.id_empresa);

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
        const { status, body } = toErrorResponse(err);
        return NextResponse.json(body, { status });
  }
}

export async function updateDataEmpresaByID(request) {
  try {
    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json(
        { ok: false, error: "No autorizado" },
        { status: 401 },
      );
    }

    exigirAdministracion(
      session,
      "Solo el dueño o un administrador pueden editar los datos de la empresa",
    );

    const body = await request.json();
    await actualizarEmpresa(session.id_empresa, body);

    //se devuelve la empresa recién guardada con la misma forma que el GET
    const data = await getEmpresaByID(session.id_empresa);

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const { status, body } = toErrorResponse(err);
    return NextResponse.json(body, { status });
  }
}
