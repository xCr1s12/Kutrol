import * as vehiculoService from "@/services/server/vehiculos.service"
import { NextResponse } from "next/server";
import { toErrorResponse } from "@/utils/errors";
import { flotaIdSchema } from "@/schema/auth.schema";

export async function getVehiculosByEmpresa(request) {
    
    try {
        //Leer y validar el id de empresa 
        const flotaId = flotaIdSchema.parse(
          new URL(request.url).searchParams.get("flota_id"),
        );
        

        // tomar los datos del servicio 
        const vehiculos = await vehiculoService.getVehiculosByEmpresa(flotaId);

        // respuesta del servidor 
        return NextResponse.json({ok: true , data: vehiculos})
    }catch (err) {
        //errores
        const { status, body } = toErrorResponse(err);
        return NextResponse.json(body, { status });
    }
}