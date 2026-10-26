import {
  crearViajeController,
  getOpcionesViajeController,
} from "@/controllers/viaje.controller";

export async function GET() {
  return getOpcionesViajeController();
}

export async function POST(request) {
  return crearViajeController(request);
}
