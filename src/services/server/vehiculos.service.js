import * as repoVehiculos from "@/repositories/Vehiculos.repository"
import { camionFormSchema } from "@/schema/vehiculo.schema";
import { ConflictError, NotFoundError } from "@/utils/errors";
import { ZodError } from "zod";


export async function getVehiculosByFlota(id_flota) {
    return repoVehiculos.findVehiculosByFlota(id_flota);
}

export async function createVehiculo (data) {
    let camion;
    try {
        camion = camionFormSchema.parse(data);
    } catch (error) {
        if (error instanceof ZodError) {
            error.details = error.issues.map((issue) => ({
                campo: issue.path.join("."),
                mensaje: issue.message,
            }));
        }
        throw error;
    }

    try {
        return await repoVehiculos.CreateVehiculo(camion);
    }catch (err) {
        if (err.code === "23505") {
            if(err.constraint === "uq_camion_patente"){
                   throw new ConflictError("Esta patente ya se encuentra en uso")
            }
            if(err.constraint === "uq_camion_codigo_dispositivo")
                throw new ConflictError("El código del dispositivo ya está en uso por otro camión")
        }
        if (err.code === "23503") {
            throw new NotFoundError("La flota seleccionada no existe")
        }
        throw err
    }
}