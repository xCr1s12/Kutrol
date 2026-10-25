import * as EmpresaRepo from "@/repositories/Empresa.repository";
import { withTransaction } from "@/lib/db";
import { EmpresaSchema } from "@/schema/auth.schema";
import { NotFoundError, ValidationError, fromZodError } from "@/utils/errors";

export async function getEmpresaByID(id_empresa) {
  if (!Number.isInteger(Number(id_empresa)) || Number(id_empresa) <= 0) {
    throw new ValidationError("El id de la empresa no es válido");
  }
  const data = await EmpresaRepo.findByIdEmpresa(id_empresa);
  if (!data) throw new NotFoundError("No se encontraron datos de la empresa");
  return data;
}

/*
 * Guarda la empresa y reemplaza sus emails y teléfonos en una sola
 * transacción: o se guarda todo, o no se guarda nada.
 *
 * `ejecutar` existe sólo para los tests: permite correr el cuerpo contra una
 * base falsa en vez de abrir una transacción real.
 */
export async function actualizarEmpresa(
  id_empresa,
  payload,
  ejecutar = withTransaction,
) {
  const parsed = EmpresaSchema.safeParse(payload);

  if (!parsed.success) {
    throw fromZodError(parsed.error);
  }

  const datos = parsed.data;

  return ejecutar(async (client) => {
    const actualizada = await EmpresaRepo.updateEmpresa(
      id_empresa,
      {
        id_comuna: datos.id_comuna,
        nombre: datos.nombre,
        rut: datos.rut,
        direccion: datos.direccion,
        descripcion: datos.descripcion,
        url_imagen: datos.url_imagen,
      },
      client,
    );

    if (!actualizada) {
      throw new NotFoundError("La empresa no existe");
    }

    await EmpresaRepo.replaceEmails(id_empresa, datos.emails, client);
    await EmpresaRepo.replaceTelefonos(id_empresa, datos.telefonos, client);

    return actualizada;
  });
}
