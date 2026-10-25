import { getUsuarios, createUsuario } from "@/controllers/usuarios.controller";

export async function GET(request) {
    return getUsuarios(request);
}

export async function POST(request) {
    return createUsuario(request);
}
