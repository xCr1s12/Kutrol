import { CreateEmpresaWithEncargado } from "@/services/server/auth.service";
import { toErrorResponse } from "@/utils/errors";

export async function register(request) {
  try {
    const registration = await request.json();
    const result = await CreateEmpresaWithEncargado(registration);

    return Response.json(
      {
        message: "Registro completado correctamente",
        data: result,
      },
      { status: 201 },
    );
  } catch (error) {
    const { status, body } = toErrorResponse(error);
    return Response.json(body, { status });
  }
}
