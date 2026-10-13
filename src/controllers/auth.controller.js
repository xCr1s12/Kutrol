<<<<<<< HEAD
import { CreateEmpresaWithEncargado, logoutService } from "@/services/server/auth.service";
import { toErrorResponse } from "@/utils/errors";
import { createSession } from "@/lib/tokenSession"; 
import { getSession } from "@/lib/tokenSession";

=======
import { CreateEmpresaWithEncargado } from "@/services/server/auth.service";
import { toErrorResponse } from "@/utils/errors";
<<<<<<< HEAD
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
=======
import { createSession } from "@/lib/tokenSession"; 
import { getSession } from "@/lib/tokenSession";

>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)

export async function register(request) {
  try {
    const registration = await request.json();
    const result = await CreateEmpresaWithEncargado(registration);

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
    
    const {password_hash, ...encargado} = result.encargado;

    const {empresa} = result;
    await createSession({
      id_encargado: encargado.id_encargado,
      id_empresa: encargado.id_empresa,
      nivel: encargado.id_nivel_jerarquico, 
      usuario: encargado.usuario,
    });

<<<<<<< HEAD
    return Response.json(
      {
        message: "Registro completado correctamente",
        data: { encargado, empresa},
=======
    return Response.json(
      {
        message: "Registro completado correctamente",
        data: result,
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
=======
    return Response.json(
      {
        message: "Registro completado correctamente",
        data: { encargado, empresa},
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
      },
      { status: 201 },
    );
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return Response.json(body, { status });
  }
}
<<<<<<< HEAD
<<<<<<< HEAD




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
<<<<<<< HEAD
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
=======
>>>>>>> 53f0ae0 (feat(auth): add company registration with encargado and contact validation)
=======

>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)
=======
}
>>>>>>> d9bfdaf (feat(auth): add JWT session authentication for panel routes)
