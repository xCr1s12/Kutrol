import { NextResponse } from "next/server";
import { getSession } from "@/lib/tokenSession";
import { obtenerRutasFormateadas, registrarNuevaRuta } from "@/services/server/ruta.service";
import { toErrorResponse } from "@/utils/errors";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const rutas = await obtenerRutasFormateadas(session.id_empresa);
    return NextResponse.json(rutas);
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

    const body = await request.json();
    const nuevaRuta = await registrarNuevaRuta(session.id_empresa, body);

    return NextResponse.json(nuevaRuta, { status: 201 });
  } catch (error) {
    const { body, status } = toErrorResponse(error);
    return NextResponse.json(body, { status });
  }
}