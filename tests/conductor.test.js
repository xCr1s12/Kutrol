import "./harness.mjs";
import test from "node:test";
import assert from "node:assert/strict";

const { ConductorPostSchema } = await import("@/schema/conductor.schema");

const payloadValido = {
  id_empresa: 3,
  nombre: "Juan Pérez Soto",
  run: "12.345.678-5",
  licencia_num: "LIC-1234",
  fecha_venc_licencia: "2030-12-31",
  email: "JUAN.PEREZ@CORREO.CL",
  telefono: "+56 9 1234 5678",
};

test("ConductorPostSchema normaliza datos para persistir un conductor", () => {
  const resultado = ConductorPostSchema.safeParse(payloadValido);

  assert.equal(resultado.success, true);
  assert.deepEqual(resultado.data, {
    id_empresa: 3,
    primer_nombre: "Juan",
    apellidos: "Pérez Soto",
    run: "12345678-5",
    licencia: "LIC-1234",
    fecha_venc_licencia: "2030-12-31",
    email: "juan.perez@correo.cl",
    telefono: "+56912345678",
  });
});

test("ConductorPostSchema rechaza un RUN inválido, fecha imposible y nombre incompleto", () => {
  const resultado = ConductorPostSchema.safeParse({
    ...payloadValido,
    nombre: "Juan",
    run: "12.345.678-9",
    fecha_venc_licencia: "2030-02-30",
  });

  assert.equal(resultado.success, false);
  assert.deepEqual(
    resultado.error.issues.map((issue) => issue.path[0]).sort(),
    ["fecha_venc_licencia", "nombre", "run"],
  );
});
