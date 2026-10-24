import {getFlotasController, crearFlotaController} from "@/controllers/flota.controller"

export async function GET(request) {
    return getFlotasController(request)
}

export async function POST(request) {
    return crearFlotaController(request)
}