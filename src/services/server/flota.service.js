import "server-only";
import * as flotaRepo from "@/repositories/flota.repository";
import { FlotaPostSchema } from "@/schema/flota.schema";
import { ForbiddenError, fromZodError } from "@/utils/errors";

export async function listarFlotas(id_empresa) {
    return flotaRepo.getFlotasByEmpresa(id_empresa);
}


export async function crearFlota(data, db) {
    const parsed = FlotaPostSchema.safeParse(data);

    if (!parsed.success) {
        throw fromZodError(parsed.error);
    }

    return flotaRepo.createFlota(parsed.data, db);
}


export async function listarTiposFlota(db) {
    return flotaRepo.getTiposFlota(db);
}


export async function getDataFlota(id_flota){
    return flotaRepo.dataFlota(id_flota);
}


export async function asegurarFlotaDeEmpresa(id_flota, id_empresa, db) {
    const propia = await flotaRepo.perteneceAEmpresa(id_flota, id_empresa, db);

    if (!propia) {
        throw new ForbiddenError("La flota no existe o no pertenece a tu empresa");
    }
}
