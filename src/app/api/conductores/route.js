import {
  crearConductorController,
  getConductoresController,
} from "@/controllers/conductor.controller";

export async function GET() {
  return getConductoresController();
}

export async function POST(request) {
  return crearConductorController(request);
}
