import { NextResponse } from "next/server";
import { loginSchema } from "@/schema/auth.schema";
import * as authservice from "@/services/server/auth.service";
import { createSession } from "@/lib/tokenSession";
import { toErrorResponse } from "@/utils/errors";

export async function Login(request) {
  try {
    const body = await request.json();
    const { usuario, password } = loginSchema.parse(body);
    const encargado = await authservice.login(usuario, password);

    await createSession({
      id_encargado: encargado.id_encargado,
      id_empresa: encargado.id_empresa,
      nivel: encargado.id_nivel_jerarquico,
      usuario: encargado.usuario,
    });

    return NextResponse.json({
      ok: true,
      data: {
        id_encargado: encargado.id_encargado,
        id_empresa: encargado.id_empresa,
        usuario: encargado.usuario,
      },
    });
  } catch (err) {
    const { status, body } = toErrorResponse(err);
    return NextResponse.json(body, { status });
  }
}
