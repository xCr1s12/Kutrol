import { NextResponse } from "next/server";
import { getSession } from "@/lib/tokenSession";
import { obtenerMapaCalorAmbiente } from "@/services/server/ambiente.service";

export async function GET() {
  try {
    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const data = await obtenerMapaCalorAmbiente(session.id_empresa);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error en /api/ambiente/mapa-calor:", error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}