import {
  getDataEmpresaByID,
  updateDataEmpresaByID,
} from "@/controllers/datosEmpresa.controller";

export async function GET(request) {
  return getDataEmpresaByID();
}

export async function PUT(request) {
  return updateDataEmpresaByID(request);
}
