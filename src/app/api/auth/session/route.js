import { validarSession } from "@/controllers/auth.controller";

export async function GET() {
  return validarSession();
}