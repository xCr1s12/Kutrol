import * as EmpresaRepo from "@/repositories/Empresa.repository";
<<<<<<< HEAD
<<<<<<< HEAD
import { NotFoundError, ValidationError } from "@/utils/errors";

export async function getEmpresaByID(id_empresa) {
  if (!Number.isInteger(Number(id_empresa)) || Number(id_empresa) <= 0) {
    throw new ValidationError("El id de la empresa no es válido");
  }
  const data = await EmpresaRepo.findByIdEmpresa(id_empresa);
  if (!data) throw new NotFoundError("No se encontraron datos de la empresa");
=======
=======
import { NotFoundError, ValidationError } from "@/utils/errors";
>>>>>>> 8339aaa (feat(api): implement flota module and add auth logout and proxy support)

export async function getEmpresaByID(id_empresa) {
  if (!Number.isInteger(Number(id_empresa)) || Number(id_empresa) <= 0) {
    throw new ValidationError("El id de la empresa no es válido");
  }
  const data = await EmpresaRepo.findByIdEmpresa(id_empresa);
<<<<<<< HEAD
  
  if (data.length === null ) throw new Error("Datos inexistentes o no encontrados");
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
=======
  if (!data) throw new NotFoundError("No se encontraron datos de la empresa");
>>>>>>> 8339aaa (feat(api): implement flota module and add auth logout and proxy support)
  return data;
}
