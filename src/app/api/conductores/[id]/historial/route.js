import { getHistorialConductorController } from "@/controllers/conductor.controller";

export async function GET(_request, { params }) {
  const { id } = await params;
  return getHistorialConductorController(id);
}
