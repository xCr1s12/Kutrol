import "server-only";
import { withTransaction } from "@/lib/db";
import * as viajeRepo from "@/repositories/viaje.repository";
import { ViajePostSchema } from "@/schema/viaje.schema";
import { ConflictError, NotFoundError, ValidationError, fromZodError } from "@/utils/errors";

export async function listarOpcionesViaje(id_empresa) {
  return viajeRepo.getOpcionesViaje(id_empresa);
}

export async function registrarViajeProgramado(id_empresa, data) {
  const parsed = ViajePostSchema.safeParse(data);
  if (!parsed.success) throw fromZodError(parsed.error);

  return withTransaction(async (client) => {
    const rutaExiste = await viajeRepo.existeRutaDeEmpresa(
      parsed.data.id_ruta,
      id_empresa,
      client,
    );
    if (!rutaExiste) throw new NotFoundError("La ruta seleccionada no existe.");

    const camionDisponible = await viajeRepo.existeCamionDisponible(
      parsed.data.id_camion,
      id_empresa,
      client,
    );
    if (!camionDisponible) {
      throw new ValidationError("El camión seleccionado no está disponible para esta empresa.");
    }

    const conductorDisponible = await viajeRepo.existeConductorDisponible(
      parsed.data.id_conductor,
      id_empresa,
      parsed.data.fecha_fin_estimada,
      client,
    );
    if (!conductorDisponible) {
      throw new ValidationError(
        "El conductor seleccionado no está disponible o su licencia no estará vigente al término del viaje.",
      );
    }

    try {
      return await viajeRepo.createViajeProgramado(
        { ...parsed.data, id_empresa },
        client,
      );
    } catch (error) {
      if (error?.code === "23P01") {
        throw new ConflictError(
          "El camión o el conductor ya tiene un viaje asignado en ese horario.",
        );
      }
      throw error;
    }
  });
}
