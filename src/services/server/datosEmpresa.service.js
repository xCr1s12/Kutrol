import * as EmpresaRepo from "@/repositories/Empresa.repository";
import { NotFoundError, ValidationError } from "@/utils/errors";

export async function getEmpresaByID(id_empresa) {
  if (!Number.isInteger(Number(id_empresa)) || Number(id_empresa) <= 0) {
    throw new ValidationError("El id de la empresa no es válido");
  }
  const data = await EmpresaRepo.findByIdEmpresa(id_empresa);
  if (!data) throw new NotFoundError("No se encontraron datos de la empresa");
  return data;
}
