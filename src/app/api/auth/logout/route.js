import { logoutController } from "@/controllers/auth.controller";

export async function POST() {
  return logoutController();
}