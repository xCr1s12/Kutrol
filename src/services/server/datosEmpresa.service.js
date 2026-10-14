import * as EmpresaRepo from "@/repositories/Empresa.repository";

export async function getEmpresaByID(id_empresa) {

  if (!id_empresa) throw new Error("El id de la empresa es obligatorio");
  
  const data = await EmpresaRepo.findByIdEmpresa(id_empresa);
  
  if (data.length === null ) throw new Error("Datos inexistentes o no encontrados");
  return data;
}
