import * as usuariosService from "@/services/server/usuarios.service";
import { NextResponse } from "next/server";
import { toErrorResponse } from "@/utils/errors";
import { getSession } from "@/lib/tokenSession";
import { UsuarioSchema, UsuarioUpdateSchema } from "@/schema/usuario.schema";
import { puedeAdministrar } from "@/lib/permisos";

export async function getUsuarios(request) {
    try {
        const session = await getSession();
        if (!session?.id_empresa) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }
        const usuarios = await usuariosService.getUsuariosByEmpresa(session.id_empresa);
        const visibles = puedeAdministrar(session)
            ? usuarios
            : usuarios.filter((usuario) => usuario.id === session.id_encargado);
        return NextResponse.json(visibles);
    } catch (err) {
        const { body, status } = toErrorResponse(err);
        return NextResponse.json(body, { status });
    }
}

export async function createUsuario(request) {
    try {
        const session = await getSession();
        if (!session?.id_empresa) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }
        const datos = UsuarioSchema.parse(await request.json());
        // la empresa siempre viene de la sesión, nunca del cuerpo
        const usuario = await usuariosService.createUsuario(datos, session.id_empresa, session);
        return NextResponse.json(usuario, { status: 201 });
    } catch (err) {
        const { body, status } = toErrorResponse(err);
        return NextResponse.json(body, { status });
    }
}

export async function updateUsuario(request, id) {
    try {
        const session = await getSession();
        if (!session?.id_empresa) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }
        if (!Number.isInteger(id) || id <= 0) {
            return NextResponse.json({ error: "El usuario no es válido" }, { status: 400 });
        }
        const datos = UsuarioUpdateSchema.parse(await request.json());
        const usuario = await usuariosService.updateUsuario(id, session.id_empresa, datos, session);
        return NextResponse.json(usuario, { status: 200 });
    } catch (err) {
        const { body, status } = toErrorResponse(err);
        return NextResponse.json(body, { status });
    }
}
