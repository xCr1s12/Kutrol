import * as vehiculoService from "@/services/server/vehiculos.service";
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
    return NextResponse.json({ ok: true, data: vehiculos });
  } catch (err) {
    //errores
    const { status, body } = toErrorResponse(err);
    return NextResponse.json(body, { status });
  }
}

export async function createVehiculo(request) {
  try {
    const body = await request.json();

    const camposObligatorios = [
      "id_flota", "patente", "codigo_dispositivo", "marca",
      "modelo", "ano", "capacidad_carga_kg", "capacidad_estanque_l",
    ];

    for (const campo of camposObligatorios) {
      const valor = body[campo];

      if (valor === undefined || valor === null || valor === "") {
        return NextResponse.json(
          { mensaje: `El campo '${campo}' es obligatorio` },
          { status: 400 },
        );
      }
    }

    const vehiculo = await vehiculoService.createVehiculo(body);

    return NextResponse.json({ ok: true, data: vehiculo }, { status: 201 });
  } catch (err) {
    const { status, body } = toErrorResponse(err);
    return NextResponse.json(body, { status });
  }
}