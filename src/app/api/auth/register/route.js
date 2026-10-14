import { register } from "@/controllers/auth.controller";

export async function POST(request) {
  return register(request);
}