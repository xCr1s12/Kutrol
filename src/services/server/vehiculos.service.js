import * as repoVehiculos from "@/repositories/Vehiculos.repository"

export async function getVehiculosByEmpresa(id_flota) {
    const Vehiculos = repoVehiculos.findVehiculosByEmpresa(id_flota);
    
    if (Vehiculos.length == 0) {
        throw new Error("Esta empresa no tiene camiones registrados");
    }
    return Vehiculos
}