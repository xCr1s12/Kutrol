import { getDataEmpresaByID } from "@/controllers/datosEmpresa.controller";

export async function GET(request) {
  return getDataEmpresaByID();
}