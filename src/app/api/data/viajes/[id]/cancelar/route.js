import { cancelarViajeController } from "@/controllers/viaje.controller";

export async function POST(request, context) {
  return cancelarViajeController(request, context);
}
