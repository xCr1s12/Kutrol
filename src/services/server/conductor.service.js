import "server-only";
import * as conductorRepo from "@/repositories/conductor.repository";
import { ConductorPostSchema } from "@/schema/conductor.schema";
import { NotFoundError, fromZodError } from "@/utils/errors";

export async function listarConductores(id_empresa) {
  return conductorRepo.listarConductores(id_empresa);
}

export async function crearConductor(data) {
  const parsed = ConductorPostSchema.safeParse(data);
  if (!parsed.success) throw fromZodError(parsed.error);
  return conductorRepo.crearConductor(parsed.data);
}

export async function obtenerHistorialConductor(id_conductor, id_empresa) {
  const rows = await conductorRepo.obtenerHistorialConductor(
    id_conductor,
    id_empresa,
  );
  if (!rows.length) throw new NotFoundError("El conductor no existe");

  const conductor = rows[0];
  return {
    conductor: conductor.conductor,
    run: conductor.run,
    licencia_num: conductor.licencia_num,
    fecha_venc_licencia: conductor.fecha_venc_licencia,
    email: conductor.email,
    telefono: conductor.telefono,
    edad: null,
    anioContrata: null,
    rutas: rows
      .filter((row) => row.id_asignacion !== null)
      .map((row) => ({
        vehiculo: row.vehiculo,
        dias: row.dias,
        ruta: `${row.comuna_origen} - ${row.comuna_destino}`,
      })),
    viajes: rows
      .filter((row) => row.id_asignacion !== null)
      .map((row) => ({
        titulo: row.vehiculo,
        fecha: row.fecha_inicio,
        fecha_fin: row.fecha_fin,
        estado: row.estado_viaje,
        actual: row.estado_viaje === "EN_CURSO",
      })),
  };
}
