import {getFlotasController} from "@/controllers/flota.controller"

export async function GET(request) {
    return getFlotasController(request)
}