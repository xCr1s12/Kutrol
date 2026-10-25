import { NextResponse } from "next/server";
import { updateUsuario } from "@/controllers/usuarios.controller";

export async function PATCH(request, { params }) {
    const { id } = await params;
    const idNumerico = Number(id);
    if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
        return NextResponse.json({ error: "El usuario no es válido" }, { status: 400 });
    }
    return updateUsuario(request, idNumerico);
}
