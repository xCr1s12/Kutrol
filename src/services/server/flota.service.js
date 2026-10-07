import "server-only";
import * as flotaRepo from "@/repositories/flota.repository";
import { FlotaPostSchema } from "@/schema/flota.schema";

const CAMPOS_OBLIGATORIOS = ["id_empresa", "id_tipo_flota", "nombre"];

export async function listarFlotas(id_empresa) {
    return flotaRepo.getFlotasByEmpresa(id_empresa);
}


export async function crearFlota(data) {
    const parsed = FlotaPostSchema.safeParse(data);

    if (!parsed.success) {
        const errores = z.flattenError(parsed.error).fieldErrors;
        throw new ValidationError(errores);
    }

    return flotaRepo.createFlota(parsed.data);
}


export async function getDataFlota(id_flota){
    return flotaRepo.dataFlota(id_flota);
}
