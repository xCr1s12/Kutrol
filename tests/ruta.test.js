import "./harness.mjs";
import test from "node:test";
import assert from "node:assert/strict";

const { AppError } = await import("@/utils/errors");
const { calcularDistanciaKm } = await import("@/lib/distance");
const { calcularComunasIntermedias } = await import(
  "@/services/server/comuna.service"
);
const {
  obtenerRutasFormateadas,
  registrarNuevaRuta,
} = await import("@/services/server/ruta.service");

function fakeDb(rows = []) {
  const calls = [];
  return {
    calls,
    query: async (sql, params) => {
      calls.push({ sql, params });
      return { rows };
    },
  };
}

test("obtenerRutasFormateadas consulta solo la empresa y formatea los datos de BD", async () => {
  const ruta = {
    id_ruta: 12,
    comuna_origen: "Puerto Montt",
    origen_latitud: -41.4666667,
    origen_longitud: -72.9333333,
    comuna_destino: "Osorno",
    destino_latitud: -40.5666667,
    destino_longitud: -73.15,
    distancia_km: 112,
    puntos_control: [{ latitud: "-41.3", longitud: "-72.9", orden: 1 }],
    viajes: [{ conductor: "Ana Pérez", encargado: "Luis Soto" }],
  };
  const db = fakeDb([ruta]);

  const resultado = await obtenerRutasFormateadas(4, db);

  assert.match(db.calls[0].sql, /WHERE r\.id_empresa = \$1/);
  assert.deepEqual(db.calls[0].params, [4]);
  assert.deepEqual(resultado[0], {
    id: "12",
    nombre: "Puerto Montt — Osorno",
    coordenadas: [
      [-41.4666667, -72.9333333],
      [-41.3, -72.9],
      [-40.5666667, -73.15],
    ],
    viajes: [{ conductor: "Ana Pérez", encargado: "Luis Soto" }],
    combustible: { consumo: "8,5 L", rendimiento: "12 km/L", ahorro: "15 %" },
    tiempoEstimado: "1 h 10 min",
    distanciaTotal: "112 km",
  });
});

test("registrarNuevaRuta guarda la ruta con la empresa autenticada", async () => {
  const db = {
    calls: [],
    query: async (sql, params) => {
      db.calls.push({ sql, params });
      if (sql.includes("FROM comuna c")) {
        return {
          rows: [
            { id: 10, latitud: 0, longitud: 0 },
            { id: 11, latitud: 0, longitud: 2 },
            { id: 15, nombre: "Ciudad intermedia", latitud: 0, longitud: 1 },
            { id: 16, nombre: "Segunda ciudad", latitud: 0, longitud: 1.5 },
          ],
        };
      }
      return { rows: [{ id_ruta: 20, id_empresa: 4 }] };
    },
  };

  const resultado = await registrarNuevaRuta(
    4,
    {
      id_comuna_origen: 10,
      id_comuna_destino: 11,
      ids_comunas_puntos_control: [15, 16],
      distancia_km: 1,
    },
    db,
  );

  assert.deepEqual(resultado, { id_ruta: 20, id_empresa: 4 });
  assert.match(db.calls[1].sql, /INSERT INTO ruta \(id_empresa,/);
  assert.match(db.calls[1].sql, /INSERT INTO punto_control/);
  assert.match(db.calls[1].sql, /WITH ORDINALITY/);
  assert.deepEqual(db.calls[1].params, [4, 10, 11, 222.39, [15, 16]]);
});

test("calcularDistanciaKm calcula la distancia geográfica entre coordenadas", () => {
  const distancia = calcularDistanciaKm(
    { latitud: 0, longitud: 0 },
    { latitud: 0, longitud: 1 },
  );

  assert.equal(distancia.toFixed(2), "111.19");
  assert.equal(
    calcularDistanciaKm(
      { latitud: null, longitud: 0 },
      { latitud: 0, longitud: 1 },
    ),
    null,
  );
});

test("registrarNuevaRuta rechaza datos inválidos antes de consultar la BD", async () => {
  const db = fakeDb();

  await assert.rejects(
    () =>
      registrarNuevaRuta(
        4,
        {
          id_comuna_origen: 10,
          id_comuna_destino: 10,
          ids_comunas_puntos_control: [10],
          distancia_km: -1,
        },
        db,
      ),
    (error) => {
      assert.ok(error instanceof AppError);
      assert.equal(error.status, 400);
      return true;
    },
  );

  assert.equal(db.calls.length, 0);
});

test("calcularComunasIntermedias devuelve solo ciudades dentro del corredor y en orden", () => {
  const comunas = [
    { id: 1, nombre: "Origen", latitud: 0, longitud: 0 },
    { id: 2, nombre: "Destino", latitud: 0, longitud: 4 },
    { id: 3, nombre: "Segunda", latitud: 0, longitud: 3 },
    { id: 4, nombre: "Primera", latitud: 0, longitud: 1 },
    { id: 5, nombre: "Fuera del corredor", latitud: 2, longitud: 2 },
    { id: 6, nombre: "Más allá del destino", latitud: 0, longitud: 5 },
  ];

  const resultado = calcularComunasIntermedias(comunas, 1, 2);

  assert.deepEqual(
    resultado.map((comuna) => comuna.nombre),
    ["Primera", "Segunda"],
  );
});

test("registrarNuevaRuta rechaza un punto fuera del corredor", async () => {
  const db = {
    calls: [],
    query: async (sql, params) => {
      db.calls.push({ sql, params });
      return {
        rows: [
          { id: 10, latitud: 0, longitud: 0 },
          { id: 11, latitud: 0, longitud: 2 },
          { id: 15, nombre: "Ciudad distante", latitud: 1, longitud: 1 },
        ],
      };
    },
  };

  await assert.rejects(
    () =>
      registrarNuevaRuta(
        4,
        {
          id_comuna_origen: 10,
          id_comuna_destino: 11,
          ids_comunas_puntos_control: [15],
          distancia_km: 112,
        },
        db,
      ),
    (error) => {
      assert.ok(error instanceof AppError);
      assert.equal(error.status, 400);
      return true;
    },
  );

  assert.equal(db.calls.length, 1);
});
