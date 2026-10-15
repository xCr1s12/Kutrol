import { getFlotaByID } from "@/controllers/flota.controller";

export async function GET(request) {
    return getFlotaByID(request)
}