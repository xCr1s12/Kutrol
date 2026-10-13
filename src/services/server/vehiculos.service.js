import * as repoVehiculos from "@/repositories/Vehiculos.repository"
<<<<<<< HEAD
import { camionFormSchema } from "@/schema/vehiculo.schema";
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
                   throw new Error("Esta patente ya se encuentra en uso")
            }
            if(err.constraint === "uq_camion_codigo_dispositivo")
                throw new Error("Codigo de dispositivo en uso por otro camion")
        }
        if (err.code === "23503") {
            throw new Error("flota seleccionada inexistente")
        }
        throw new Error(err)
    }
=======

export async function getVehiculosByEmpresa(id_flota) {
    const Vehiculos = repoVehiculos.findVehiculosByEmpresa(id_flota);
    
    if (Vehiculos.length == 0) {
        throw new Error("Esta empresa no tiene camiones registrados");
    }
    return Vehiculos
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)
}