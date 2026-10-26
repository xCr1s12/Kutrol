import { iniciarViajeController } from "@/controllers/viaje.controller";

export async function POST(request, context) {
  return iniciarViajeController(request, context);
}
