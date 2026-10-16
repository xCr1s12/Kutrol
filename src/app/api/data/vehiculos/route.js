import {
  getVehiculosByFlota,
  createVehiculo,
} from "@/controllers/vehiculos.controller";

export const GET = getVehiculosByFlota;
export const POST = createVehiculo;