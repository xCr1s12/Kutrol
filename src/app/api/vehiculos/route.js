import {
  getVehiculosByEmpresa,
  createVehiculo,
} from "@/controllers/vehiculos.controller";

export const GET = getVehiculosByEmpresa;
export const POST = createVehiculo;