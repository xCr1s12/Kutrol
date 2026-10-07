import { Login } from "@/controllers/login.controller";  

export async function POST(request) {
  return Login(request);
}