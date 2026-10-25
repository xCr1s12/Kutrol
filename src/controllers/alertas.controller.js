import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AlertasService } from "@/services/server/alertas.service";
import { COOKIE_NAME, verifyToken } from "@/lib/session-core";

export async function GET_Alertas(req) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    const session = await verifyToken(token);

    if (!session || !session.id_empresa) {
      return NextResponse.json(
        { error: "No autorizado o falta sesión de empresa" },
        { status: 401 }
      );
    }

    const alertas = await AlertasService.obtenerAlertasEmpresa(session.id_empresa);
    return NextResponse.json(alertas, { status: 200 });
  } catch (error) {
    console.error("Error al obtener alertas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor al consultar alertas" },
      { status: 500 }
    );
  }
}