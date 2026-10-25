import * as repoVehiculos from "@/repositories/Vehiculos.repository"
import { camionFormSchema } from "@/schema/vehiculo.schema";
import { ConflictError, NotFoundError } from "@/utils/errors";
import { ZodError } from "zod";


export async function getVehiculosByFlota(id_flota) {
    return repoVehiculos.findVehiculosByFlota(id_flota);
}

export async function getConsumoGrafico(id_empresa) {
    const rows = await repoVehiculos.ConsumoGraficoQuery(id_empresa);
    const fechas = [...new Set(rows.map((row) => row.fecha))];
    const series = new Map();
    const indicesFecha = new Map(fechas.map((fecha, index) => [fecha, index]));

    for (const row of rows) {
        if (!series.has(row.patente)) {
            series.set(row.patente, Array(fechas.length).fill(0));
        }
        series.get(row.patente)[indicesFecha.get(row.fecha)] = Number(row.litros);
    }

    return {
        labels: fechas.map((fecha) => fecha.slice(5).split("-").reverse().join("/")),
        datasets: [...series].map(([patente, data]) => ({
            label: patente,
            data,
        })),
    };
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
    } catch (err) {
        if (err.code === "23505") {
            if (err.constraint === "uq_camion_patente") {
                err.message = "Esta patente ya se encuentra en uso";
            } else if (err.constraint === "uq_camion_codigo_dispositivo") {
                err.message = "Código de dispositivo en uso por otro camión";
            }
        } else if (err.code === "23503") {
            err.message = "La flota seleccionada no existe";
        }
        throw err;
    }
}