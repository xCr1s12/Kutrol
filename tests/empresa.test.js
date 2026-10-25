import "./harness.mjs";
import test from "node:test";
import assert from "node:assert/strict";

const { AppError } = await import("@/utils/errors");
const { actualizarEmpresa } = await import(
  "@/services/server/datosEmpresa.service"
);

const PAYLOAD = {
  id_comuna: 12,
  nombre: "Transportes Kutrol",
  rut: "12345678-5",
  direccion: "Av. Siempre Viva 742",
  descripcion: "Transporte de carga",
  url_imagen: "https://ejemplo.cl/logo.png",
  emails: ["contacto@kutrol.cl", "ventas@kutrol.cl"],
  telefonos: ["+56912345678", "+56221234567"],
};

const EMPRESA_ACTUALIZADA = { id_empresa: 1 };

/*
 * Base falsa: el UPDATE devuelve la fila de la empresa, el resto de las
 * sentencias (deletes e inserts de hijos) no devuelven filas.
 */
function fakeDb(updateRows = [EMPRESA_ACTUALIZADA]) {
  const calls = [];
  return {
    calls,
    query: async (sql, params) => {
      calls.push({ sql, params });
      const rows = /^\s*UPDATE/i.test(sql) ? updateRows : [];
      return { rows };
    },
  };
}

function ejecutorFalso(db) {
  return async (cuerpo) => cuerpo(db);
}

test("actualizarEmpresa reemplaza la empresa y sus hijos en orden", async () => {
  const db = fakeDb();

  const actualizada = await actualizarEmpresa(1, PAYLOAD, ejecutorFalso(db));

  assert.deepEqual(actualizada, EMPRESA_ACTUALIZADA);
  assert.equal(db.calls.length, 5);

  assert.match(db.calls[0].sql, /UPDATE empresa/);
  assert.match(db.calls[1].sql, /DELETE FROM empresa_email/);
  assert.match(db.calls[2].sql, /INSERT INTO empresa_email/);
  assert.match(db.calls[3].sql, /DELETE FROM empresa_telefono/);
  assert.match(db.calls[4].sql, /INSERT INTO empresa_telefono/);

  assert.deepEqual(db.calls[0].params, [
    1,
    12,
    "Transportes Kutrol",
    "12345678-5",
    "Av. Siempre Viva 742",
    "Transporte de carga",
    "https://ejemplo.cl/logo.png",
  ]);
  assert.deepEqual(db.calls[2].params, [
    1,
    ["contacto@kutrol.cl", "ventas@kutrol.cl"],
  ]);
  assert.deepEqual(db.calls[4].params, [1, ["+56912345678", "+56221234567"]]);
});

test("actualizarEmpresa rechaza un nombre vacío con 400 y el campo nombre", async () => {
  const db = fakeDb();

  await assert.rejects(
    () => actualizarEmpresa(1, { ...PAYLOAD, nombre: "" }, ejecutorFalso(db)),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.status, 400);
      assert.ok(
        err.details?.some((detalle) => detalle.campo === "nombre"),
        "los detalles deben nombrar el campo nombre",
      );
      return true;
    },
  );

  assert.equal(db.calls.length, 0);
});

test("actualizarEmpresa rechaza una lista de emails vacía con 400", async () => {
  const db = fakeDb();

  await assert.rejects(
    () => actualizarEmpresa(1, { ...PAYLOAD, emails: [] }, ejecutorFalso(db)),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.status, 400);
      return true;
    },
  );

  assert.equal(db.calls.length, 0);
});

test("actualizarEmpresa rechaza un teléfono con largo inválido con 400", async () => {
  const db = fakeDb();

  await assert.rejects(
    () =>
      actualizarEmpresa(1, { ...PAYLOAD, telefonos: ["123"] }, ejecutorFalso(db)),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.status, 400);
      return true;
    },
  );

  assert.equal(db.calls.length, 0);
});

test("actualizarEmpresa con empresa inexistente falla con 404 sin tocar los hijos", async () => {
  const db = fakeDb([]);

  await assert.rejects(
    () => actualizarEmpresa(1, PAYLOAD, ejecutorFalso(db)),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.status, 404);
      return true;
    },
  );

  assert.equal(db.calls.length, 1);
  assert.match(db.calls[0].sql, /UPDATE empresa/);
});
