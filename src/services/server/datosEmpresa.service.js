import * as EmpresaRepo from "@/repositories/Empresa.repository";
<<<<<<< HEAD
import { NotFoundError, ValidationError } from "@/utils/errors";

export async function getEmpresaByID(id_empresa) {
  if (!Number.isInteger(Number(id_empresa)) || Number(id_empresa) <= 0) {
    throw new ValidationError("El id de la empresa no es válido");
  }
  const data = await EmpresaRepo.findByIdEmpresa(id_empresa);
  if (!data) throw new NotFoundError("No se encontraron datos de la empresa");
=======

export async function getEmpresaByID(id_empresa) {

  if (!id_empresa) throw new Error("El id de la empresa es obligatorio");
  
  const data = await EmpresaRepo.findByIdEmpresa(id_empresa);
  
  if (data.length === null ) throw new Error("Datos inexistentes o no encontrados");
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
  return data;
}
