import {
  getConfigAlertas,
  updateConfigAlerta,
} from "@/controllers/configAlertas.controller";

export async function GET() {
  return getConfigAlertas();
}

export async function PATCH(request) {
  return updateConfigAlerta(request);
}
