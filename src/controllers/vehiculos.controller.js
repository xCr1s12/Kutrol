<<<<<<< HEAD
<<<<<<< HEAD
import * as vehiculoService from "@/services/server/vehiculos.service";
=======
import * as vehiculoService from "@/services/server/vehiculos.service"
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)
=======
import * as vehiculoService from "@/services/server/vehiculos.service";
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
import { NextResponse } from "next/server";
import { toErrorResponse } from "@/utils/errors";
import { flotaIdSchema } from "@/schema/auth.schema";

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
export async function getVehiculosByFlota(request) {
  try {

    //Leer y validar el id de empresa
    const flotaId = flotaIdSchema.parse(
      new URL(request.url).searchParams.get("flota_id"),
    );

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
    const body = await request.json();

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
=======
=======

>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
=======
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
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
          { mensaje: `El campo '${campo}' es obligatorio` },
          { status: 400 },
        );
      }
    }
<<<<<<< HEAD
}
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)
=======

    const vehiculo = await vehiculoService.createVehiculo(body);

    return NextResponse.json({ ok: true, data: vehiculo }, { status: 201 });
  } catch (err) {
    const { status, body } = toErrorResponse(err);
    return NextResponse.json(body, { status });
  }
}
<<<<<<< HEAD
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
=======
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
