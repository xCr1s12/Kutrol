import "server-only";
import { withTransaction } from "@/lib/db";
import * as viajeRepo from "@/repositories/viaje.repository";
import { ViajePostSchema } from "@/schema/viaje.schema";
import {
  AppError,
  ConflictError,
  NotFoundError,
  ValidationError,
  fromZodError,
} from "@/utils/errors";

const VERBO = {
  EN_CURSO: "iniciar",
  COMPLETADO: "completar",
  CANCELADO: "cancelar",
};
const TOLERANCIA_RELOJ_MS = 5 * 60 * 1000;
const TIENE_ZONA_HORARIA = /(Z|[+-]\d{2}:?\d{2})$/i;

class ViajeError extends AppError {}

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

function validarIdViaje(id_viaje) {
  const id = Number(id_viaje);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ViajeError("El id del viaje no es válido.", 400, "ID_INVALIDO");
  }
  return id;
}

function parsearFechaFin(fecha_fin) {
  if (fecha_fin === undefined || fecha_fin === null || fecha_fin === "") {
    return null;
  }

  const fecha =
    typeof fecha_fin === "string" && TIENE_ZONA_HORARIA.test(fecha_fin.trim())
      ? new Date(fecha_fin)
      : null;
  if (!fecha || Number.isNaN(fecha.getTime())) {
    throw new ViajeError(
      "fecha_fin debe ser una fecha ISO 8601 con zona horaria (ej. 2026-10-15T20:00:00-03:00).",
      400,
      "FECHA_FIN_FORMATO",
    );
  }
  if (fecha.getTime() > Date.now() + TOLERANCIA_RELOJ_MS) {
    throw new ViajeError(
      "fecha_fin no puede estar en el futuro.",
      400,
      "FECHA_FIN_FUTURA",
    );
  }
  return fecha.toISOString();
}

function traducirErrorBD(error) {
  if (error?.code === "P0001") {
    return new ViajeError(error.message, 409, "REGLA_NEGOCIO");
  }
  if (
    error?.code === "23514" &&
    error.constraint === "chk_viaje_fechas"
  ) {
    return new ViajeError(
      "La fecha de término debe ser posterior al inicio del viaje.",
      422,
      "FECHA_FIN_INVALIDA",
    );
  }
  if (error?.code === "23P01") {
    const esCamion = error.constraint === "excl_viaje_camion_sin_solape";
    return new ViajeError(
      esCamion
        ? "El camión tiene otro viaje que se solapa con esa fecha de término."
        : "El conductor tiene otra asignación que se solapa con esa fecha de término.",
      409,
      "SOLAPE",
    );
  }
  return error;
}

async function transicionar(
  { id_viaje, id_empresa, nuevo_estado, fecha_fin = null },
  db,
) {
  let viaje;
  try {
    viaje = await viajeRepo.cambiarEstadoViaje(
      { id_viaje, id_empresa, nuevo_estado, fecha_fin },
      db,
    );
  } catch (error) {
    throw traducirErrorBD(error);
  }

  if (viaje) return viaje;

  const estado = await viajeRepo.getEstadoViaje(id_viaje, id_empresa, db);
  if (!estado) {
    throw new ViajeError("El viaje no existe.", 404, "VIAJE_NO_ENCONTRADO");
  }
  throw new ViajeError(
    `No se puede ${VERBO[nuevo_estado]} un viaje en estado ${estado}.`,
    409,
    "TRANSICION_INVALIDA",
  );
}

export async function iniciarViajeService(id_viaje, id_empresa, db) {
  return transicionar(
    {
      id_viaje: validarIdViaje(id_viaje),
      id_empresa,
      nuevo_estado: "EN_CURSO",
    },
    db,
  );
}

export async function completarViajeService(
  id_viaje,
  id_empresa,
  fecha_fin,
  db,
) {
  return transicionar(
    {
      id_viaje: validarIdViaje(id_viaje),
      id_empresa,
      nuevo_estado: "COMPLETADO",
      fecha_fin: parsearFechaFin(fecha_fin),
    },
    db,
  );
}

export async function cancelarViajeService(id_viaje, id_empresa, db) {
  return transicionar(
    {
      id_viaje: validarIdViaje(id_viaje),
      id_empresa,
      nuevo_estado: "CANCELADO",
    },
    db,
  );
}
