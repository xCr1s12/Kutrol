import { NextResponse } from "next/server";
import { getSession } from "@/lib/tokenSession";
import { obtenerRutasFormateadas, registrarNuevaRuta } from "@/services/server/ruta.service";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const rutas = await obtenerRutasFormateadas(session.id_empresa);
    return NextResponse.json(rutas);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener las rutas", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();
    const nuevaRuta = await registrarNuevaRuta(body);

    return NextResponse.json(nuevaRuta, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al guardar la ruta", details: error.message },
      { status: 500 }
    );
  }
}