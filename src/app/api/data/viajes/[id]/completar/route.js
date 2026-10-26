import { completarViajeController } from "@/controllers/viaje.controller";

export async function POST(request, context) {
  return completarViajeController(request, context);
}
