import * as vehiculoService from "@/services/server/vehiculos.service";
import * as flotaService from "@/services/server/flota.service";
import { NextResponse } from "next/server";
import { toErrorResponse } from "@/utils/errors";
import { getSession } from "@/lib/tokenSession";
import { flotaIdSchema } from "@/schema/auth.schema";

export async function getVehiculosByFlota(request) {
  try {

    //Leer y validar el id de empresa
    const flotaId = flotaIdSchema.parse(
      new URL(request.url).searchParams.get("flota_id"),
    );

    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    // la flota pedida debe pertenecer a la empresa de la sesión
    await flotaService.asegurarFlotaDeEmpresa(flotaId, session.id_empresa);

    // tomar los datos del servicio
    const vehiculos = await vehiculoService.getVehiculosByFlota(flotaId);

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
    const session = await getSession();
    if (!session?.id_empresa) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const body = await request.json();

    const idFlota = Number(body.id_flota);
    if (Number.isInteger(idFlota) && idFlota > 0) {
      await flotaService.asegurarFlotaDeEmpresa(idFlota, session.id_empresa);
    }

    const ETIQUETAS_CAMPO = {
      id_flota: "flota",
      patente: "patente",
      codigo_dispositivo: "código del dispositivo",
      marca: "marca",
      modelo: "modelo",
      ano: "año",
      capacidad_carga_kg: "capacidad de carga",
      capacidad_estanque_l: "capacidad del estanque",
      tipo_combustible: "tipo de combustible",
      estado: "estado",
    };
    const camposObligatorios = [
      "id_flota",
      "patente",
      "codigo_dispositivo",
      "marca",
      "modelo",
      "ano",
      "capacidad_carga_kg",
      "capacidad_estanque_l",
    ];

    for (const campo of camposObligatorios) {
      const valor = body[campo];

      if (valor === undefined || valor === null || valor === "") {
        return NextResponse.json(
          { mensaje: `Completa el campo ${ETIQUETAS_CAMPO[campo] ?? "requerido"}` },
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
