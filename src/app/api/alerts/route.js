import { GET_Alertas } from "@/controllers/alertas.controller";

export async function GET(request) {
  return GET_Alertas(request);
}