import { getVehiculosByEmpresa } from "@/controllers/vehiculos.controller";


export async function GET(request) {
  return getVehiculosByEmpresa(request);
}