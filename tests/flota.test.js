import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { registerHooks } from "node:module";
import { pathToFileURL } from "node:url";

/*
 * Next resuelve el alias "@/..." y el marcador "server-only" en tiempo de build;
 * node:test no. Estos hooks replican ambas resoluciones para poder importar el
 * servicio sin arrancar Next y sin tocar la base de datos.
 */
const RAIZ = path.resolve(import.meta.dirname, "..");

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const destino = path.join(RAIZ, "src", `${specifier.slice(2)}.js`);
      return nextResolve(pathToFileURL(destino).href, context);
    }
    if (specifier === "server-only") {
      const marcador = path.join(RAIZ, "node_modules", "server-only", "empty.js");
      return nextResolve(pathToFileURL(marcador).href, context);
    }
    return nextResolve(specifier, context);
  },
});

const { AppError } = await import("@/utils/errors");
const { asegurarFlotaDeEmpresa, crearFlota, listarTiposFlota } = await import(
  "@/services/server/flota.service"
);

const PAYLOAD = {
  id_empresa: 1,
  id_tipo_flota: 2,
  nombre: "Flota norte",
  descripcion: "Camiones de reparto",
};

const FLOTA_CREADA = {
  id_flota: 7,
  id_empresa: 1,
  id_tipo_flota: 2,
  nombre: "Flota norte",
  descripcion: "Camiones de reparto",
};

function fakeDb(rows) {
  const calls = [];
  return {
    calls,
    query: async (sql, params) => {
      calls.push({ sql, params });
      return { rows };
    },
  };
}

test("crearFlota rechaza un nombre vacío con 400 y el campo nombre", async () => {
  const db = fakeDb([FLOTA_CREADA]);

  await assert.rejects(
    () => crearFlota({ ...PAYLOAD, nombre: "" }, db),
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

test("crearFlota rechaza un nombre de 51 caracteres con 400", async () => {
  const db = fakeDb([FLOTA_CREADA]);

  await assert.rejects(
    () => crearFlota({ ...PAYLOAD, nombre: "a".repeat(51) }, db),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.status, 400);
      return true;
    },
  );

  assert.equal(db.calls.length, 0);
});

test("crearFlota rechaza un payload sin id_tipo_flota con 400", async () => {
  const db = fakeDb([FLOTA_CREADA]);
  const { id_tipo_flota: _omitido, ...sinTipo } = PAYLOAD;

  await assert.rejects(
    () => crearFlota(sinTipo, db),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.status, 400);
      assert.ok(
        err.details?.some((detalle) => detalle.campo === "id_tipo_flota"),
        "los detalles deben nombrar el campo id_tipo_flota",
      );
      return true;
    },
  );

  assert.equal(db.calls.length, 0);
});

test("crearFlota con payload válido hace un solo insert y devuelve la fila", async () => {
  const db = fakeDb([FLOTA_CREADA]);

  const creada = await crearFlota(PAYLOAD, db);

  assert.deepEqual(creada, FLOTA_CREADA);
  assert.equal(db.calls.length, 1);
  assert.match(db.calls[0].sql, /INSERT INTO flota/);
  assert.deepEqual(db.calls[0].params, [
    1,
    2,
    "Flota norte",
    "Camiones de reparto",
  ]);
});

test("crearFlota guarda una descripción vacía como null", async () => {
  const db = fakeDb([{ ...FLOTA_CREADA, descripcion: null }]);

  const creada = await crearFlota({ ...PAYLOAD, descripcion: "" }, db);

  assert.equal(db.calls.length, 1);
  assert.equal(db.calls[0].params[3], null);
  assert.equal(creada.descripcion, null);
});

test("listarTiposFlota devuelve las filas que entrega la base", async () => {
  const tipos = [
    { id_tipo_flota: 1, nombre: "Propia" },
    { id_tipo_flota: 2, nombre: "Arrendada" },
  ];
  const db = fakeDb(tipos);

  const resultado = await listarTiposFlota(db);

  assert.deepEqual(resultado, tipos);
  assert.equal(db.calls.length, 1);
  assert.match(db.calls[0].sql, /FROM tipo_flota/);
});

test("asegurarFlotaDeEmpresa acepta una flota de la propia empresa", async () => {
  const db = fakeDb([{ existe: 1 }]);

  await asegurarFlotaDeEmpresa(7, 1, db);

  assert.equal(db.calls.length, 1);
  assert.match(db.calls[0].sql, /FROM flota/);
  assert.deepEqual(db.calls[0].params, [7, 1]);
});

test("asegurarFlotaDeEmpresa rechaza una flota ajena con 403", async () => {
  const db = fakeDb([]);

  await assert.rejects(
    () => asegurarFlotaDeEmpresa(7, 99, db),
    (err) => {
      assert.ok(err instanceof AppError);
      assert.equal(err.status, 403);
      return true;
    },
  );

  assert.equal(db.calls.length, 1);
  assert.deepEqual(db.calls[0].params, [7, 99]);
});
