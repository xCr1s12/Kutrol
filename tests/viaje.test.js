import "./harness.mjs";
import test from "node:test";
import assert from "node:assert/strict";

const { ViajePostSchema } = await import("@/schema/viaje.schema");

const viaje = {
  id_ruta: 1,
  id_camion: 2,
  id_conductor: 3,
  fecha_inicio: "2026-10-25T10:00:00.000Z",
  fecha_fin_estimada: "2026-10-25T12:00:00.000Z",
};

test("ViajePostSchema acepta un viaje programado con fechas válidas", () => {
  assert.equal(ViajePostSchema.safeParse(viaje).success, true);
});

test("ViajePostSchema rechaza el término estimado anterior al inicio", () => {
  const resultado = ViajePostSchema.safeParse({
    ...viaje,
    fecha_fin_estimada: "2026-10-25T09:59:00.000Z",
  });

  assert.equal(resultado.success, false);
  assert.equal(resultado.error.issues[0].path[0], "fecha_fin_estimada");
});
