import * as repoVehiculos from "@/repositories/Vehiculos.repository"
<<<<<<< HEAD
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
=======
import { camionFormSchema } from "@/schema/vehiculo.schema";
import { ZodError } from "zod";

>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)

export async function getVehiculosByEmpresa(id_flota) {
    const Vehiculos =  await repoVehiculos.findVehiculosByEmpresa(id_flota);
    
    if (Vehiculos.length == 0) {
        throw new Error("Esta empresa no tiene camiones registrados");
    }
    return Vehiculos
<<<<<<< HEAD
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)
=======
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
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
}