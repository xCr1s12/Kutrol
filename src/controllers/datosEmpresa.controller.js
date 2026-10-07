import { NextResponse } from "next/server";
import { getSession } from "@/lib/tokenSession";
import { getEmpresaByID } from "@/services/server/datosEmpresa.service";
import { toErrorResponse } from "@/utils/errors";

export async function getDataEmpresaByID() {
  try {
    //verifica la session
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
