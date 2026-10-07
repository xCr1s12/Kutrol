import { CreateEmpresaWithEncargado, logoutService } from "@/services/server/auth.service";
import { toErrorResponse } from "@/utils/errors";
import { createSession } from "@/lib/tokenSession"; 
import { getSession } from "@/lib/tokenSession";


export async function register(request) {
  try {
    const registration = await request.json();
    const result = await CreateEmpresaWithEncargado(registration);

    
    const {password_hash, ...encargado} = result.encargado;

    const {empresa} = result;
    await createSession({
      id_encargado: encargado.id_encargado,
      id_empresa: encargado.id_empresa,
      nivel: encargado.id_nivel_jerarquico, 
      usuario: encargado.usuario,
    });

    return Response.json(
      {
        message: "Registro completado correctamente",
        data: { encargado, empresa},
      },
      { status: 201 },
    );
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return Response.json(body, { status });
  }
}




export async function validarSession() {
  try {
    const session = await getSession();

    if (!session) {
      return Response.json({ authenticated: false }, { status: 401 });
    }

    return Response.json({ authenticated: true, session });
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return Response.json(body, { status });
  }
}


export async function logoutController() {
  try {
    await logoutService();
    return Response.json(
      { ok: true, message: "Sesión cerrada" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en logout:", error);
    return Response.json(
      { ok: false, message: "No se pudo cerrar sesión" },
      { status: 500 }
    );
  }
}