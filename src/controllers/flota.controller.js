import * as flotaService from "@/services/server/flota.service";
import { NextResponse } from "next/server";
import { toErrorResponse } from "@/utils/errors";
import { getSession } from "@/lib/tokenSession";

export async function getFlotasController(request) {
    try {
        const id_empresa = Number(request.nextUrl.searchParams.get("id_empresa"));
        const session = await getSession();
        if (!session?.id_empresa) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }
        if (!Number.isInteger(id_empresa) || id_empresa <= 0) {
            return NextResponse.json({ error: "El id de la empresa no es válido" }, { status: 400 });
        }
        if (id_empresa !== Number(session.id_empresa)) {
            return NextResponse.json(
                { error: "No tienes permiso para consultar las flotas de esta empresa" },
                { status: 403 },
            );
        }
        const flotas = await flotaService.listarFlotas(id_empresa);
        return NextResponse.json(flotas);
    } catch (err) {
        const { body, status } = toErrorResponse(err);
        return NextResponse.json(body, { status });
    }
}

export async function getFlotaByID(request) {
    try {
        const id_flota = Number(request.nextUrl.searchParams.get("id_flota"));
        const session = await getSession();
        if (!session?.id_empresa) {
            return NextResponse.json({ error: "No autorizado" }, { status: 401 });
        }
        if (!Number.isInteger(id_flota) || id_flota <= 0) {
            return NextResponse.json({ error: "El id de la flota no es válido" }, { status: 400 });
        }
        const flota = await flotaService.getDataFlota(id_flota);
        if (!flota) {
            return NextResponse.json({ error: "La flota no existe" }, { status: 404 });
        }
        if (Number(flota.id_empresa) !== Number(session.id_empresa)) {
            return NextResponse.json(
                { error: "No tienes permiso para consultar esta flota" },
                { status: 403 },
            );
        }
        return NextResponse.json(flota);
    } catch (err) {
        const { body, status } = toErrorResponse(err);
        return NextResponse.json(body, { status });
    }
}