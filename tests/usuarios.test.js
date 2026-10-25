import "./harness.mjs";
import test from "node:test";
import assert from "node:assert/strict";
import bcrypt from "bcryptjs";

const { findUsuariosByEmpresa, insertUsuario, updateUsuario } = await import("@/repositories/usuarios.repository");
const { getUsuariosByEmpresa, createUsuario, updateUsuario: actualizarUsuario } = await import("@/services/server/usuarios.service");
const { UsuarioSchema } = await import("@/schema/usuario.schema");
const { exigirAdministracion } = await import("@/lib/permisos");

const USUARIO = {
  id_encargado: 7,
  primer_nombre: "Ana",
  apellidos: "Pérez Soto",
  email: "ana@example.com",
  cargo: "Gerente",
  usuario: "ana_perez_empresa",
  nivel: "ADMINISTRADOR",
};

const CREADO = {
  id_encargado: 9,
  id_empresa: 3,
  id_nivel_jerarquico: 2,
  primer_nombre: "Ana",
  apellidos: "Pérez Soto",
  email: "ana@example.com",
  cargo: "Gerente",
  usuario: "ana_perez_empresa",
};

const PASSWORD = "camion-largo-2026";

const DUENIO = { id_encargado: 1, id_empresa: 3, nivel: 1 };
const ADMINISTRADOR = { id_encargado: 2, id_empresa: 3, nivel: 2 };
const EMPLEADO = { id_encargado: 3, id_empresa: 3, nivel: 3 };

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

// responde distinto segun la consulta: util cuando el servicio encadena varias
function fakeDbPorSql(respuestas) {
  const calls = [];
  return {
    calls,
    query: async (sql, params) => {
      calls.push({ sql, params });
      const clave = Object.keys(respuestas).find((patron) => sql.includes(patron));
      return { rows: clave ? respuestas[clave] : [] };
    },
  };
}

function esHash(valor) {
  return typeof valor === "string" && valor.startsWith("$2b$");
}

test("getUsuariosByEmpresa mapea los datos del encargado", async () => {
  const db = fakeDb([USUARIO]);

  const usuarios = await getUsuariosByEmpresa(3, db);

  assert.deepEqual(usuarios, [{
    id: 7,
    nombre: "Ana Pérez Soto",
    primer_nombre: "Ana",
    apellidos: "Pérez Soto",
    correo: "ana@example.com",
    cargo: "Gerente",
    rol: "ADMINISTRADOR",
    usuario: "ana_perez_empresa",
  }]);
  assert.equal(db.calls.length, 1);
});

test("findUsuariosByEmpresa filtra por la empresa indicada", async () => {
  const db = fakeDb([USUARIO]);

  const rows = await findUsuariosByEmpresa(42, db);

  assert.deepEqual(rows, [USUARIO]);
  assert.equal(db.calls.length, 1);
  assert.match(db.calls[0].sql, /FROM encargado_empresa enc\s+JOIN nivel_jerarquico nivel/);
  assert.match(db.calls[0].sql, /WHERE enc\.id_empresa = \$1/);
  assert.match(db.calls[0].sql, /ORDER BY enc\.id_encargado/);
  assert.doesNotMatch(db.calls[0].sql, /password_hash/);
  assert.deepEqual(db.calls[0].params, [42]);
});

test("createUsuario hashea una sola vez y no devuelve el hash", async () => {
  const db = fakeDb([CREADO]);

  const usuario = await createUsuario(
    {
      primer_nombre: "Ana",
      apellidos: "Pérez Soto",
      email: "ana@example.com",
      cargo: "Gerente",
      id_nivel_jerarquico: 2,
      password: PASSWORD,
    },
    3,
    DUENIO,
    db
  );

  assert.equal(db.calls.length, 1);
  const { sql, params } = db.calls[0];
  assert.match(sql, /INSERT INTO encargado_empresa/);
  assert.doesNotMatch(sql, /usuario\s*,/);

  const hashes = params.filter(esHash);
  assert.equal(hashes.length, 1);
  assert.equal(params.includes(PASSWORD), false);
  assert.equal(await bcrypt.compare(PASSWORD, hashes[0]), true);

  assert.equal(usuario.password_hash, undefined);
  assert.equal("password_hash" in usuario, false);
  assert.deepEqual(usuario, {
    id: 9,
    nombre: "Ana Pérez Soto",
    primer_nombre: "Ana",
    apellidos: "Pérez Soto",
    correo: "ana@example.com",
    cargo: "Gerente",
    rol: "ADMINISTRADOR",
    usuario: "ana_perez_empresa",
  });
});

test("insertUsuario guarda el id_empresa que recibe", async () => {
  const db = fakeDb([CREADO]);

  const fila = await insertUsuario(
    {
      id_empresa: 3,
      id_nivel_jerarquico: 2,
      primer_nombre: "Ana",
      apellidos: "Pérez Soto",
      email: "ana@example.com",
      cargo: "Gerente",
      password_hash: "$2b$10$hash",
    },
    db
  );

  assert.deepEqual(fila, CREADO);
  assert.equal(db.calls[0].params[0], 3);
  assert.match(db.calls[0].sql, /RETURNING id_encargado, id_empresa/);
  const devuelto = db.calls[0].sql.slice(db.calls[0].sql.indexOf("RETURNING"));
  assert.doesNotMatch(devuelto, /password_hash/);
});

test("updateUsuario filtra por id y por empresa", async () => {
  const db = fakeDbPorSql({
    "SELECT id_nivel_jerarquico": [{ id_nivel_jerarquico: 2 }],
    "UPDATE encargado_empresa": [{ ...CREADO, cargo: "Jefa de flota" }],
  });

  const usuario = await actualizarUsuario(9, 3, { cargo: "Jefa de flota" }, DUENIO, db);

  const update = db.calls.find((call) => call.sql.includes("UPDATE encargado_empresa"));
  assert.match(update.sql, /WHERE id_encargado = \$1 AND id_empresa = \$2/);
  assert.deepEqual(update.params.slice(0, 2), [9, 3]);
  assert.equal(update.params[5], "Jefa de flota");
  assert.equal(update.params[7], null);
  assert.equal(usuario.cargo, "Jefa de flota");
  assert.equal("password_hash" in usuario, false);
});

test("updateUsuario con contraseña vacía no toca el hash", async () => {
  const db = fakeDbPorSql({
    "SELECT id_nivel_jerarquico": [{ id_nivel_jerarquico: 2 }],
    "UPDATE encargado_empresa": [CREADO],
  });

  await actualizarUsuario(9, 3, { password: "" }, DUENIO, db);

  const update = db.calls.find((call) => call.sql.includes("UPDATE encargado_empresa"));
  assert.equal(update.params[7], null);
  assert.equal(update.params.some(esHash), false);
});

test("updateUsuario rechaza degradar al último DUEÑO", async () => {
  const db = fakeDbPorSql({
    "SELECT id_nivel_jerarquico": [{ id_nivel_jerarquico: 1 }],
    "SELECT COUNT(*)": [{ total: 1 }],
    "UPDATE encargado_empresa": [{ ...CREADO, id_nivel_jerarquico: 3 }],
  });

  await assert.rejects(
    () => actualizarUsuario(9, 3, { id_nivel_jerarquico: 3 }, DUENIO, db),
    (err) => err.status === 409 && /al menos un DUEÑO/.test(err.message)
  );
  assert.equal(db.calls.some((call) => call.sql.includes("UPDATE encargado_empresa")), false);
});

test("updateUsuario deja degradar al DUEÑO cuando hay otro", async () => {
  const db = fakeDbPorSql({
    "SELECT id_nivel_jerarquico": [{ id_nivel_jerarquico: 1 }],
    "SELECT COUNT(*)": [{ total: 2 }],
    "UPDATE encargado_empresa": [{ ...CREADO, id_nivel_jerarquico: 3 }],
  });

  const usuario = await actualizarUsuario(9, 3, { id_nivel_jerarquico: 3 }, DUENIO, db);

  assert.equal(usuario.rol, "EMPLEADO");
  assert.equal(db.calls.some((call) => call.sql.includes("UPDATE encargado_empresa")), true);
});

test("createUsuario rechaza a un EMPLEADO sin tocar la base", async () => {
  const db = fakeDb([CREADO]);

  await assert.rejects(
    () =>
      createUsuario(
        { ...CREADO, id_nivel_jerarquico: 3, password: PASSWORD },
        3,
        EMPLEADO,
        db
      ),
    (err) => err.status === 403
  );
  assert.equal(db.calls.length, 0);
});

test("createUsuario impide a un ADMINISTRADOR crear un DUEÑO", async () => {
  const db = fakeDb([CREADO]);

  await assert.rejects(
    () =>
      createUsuario(
        { ...CREADO, id_nivel_jerarquico: 1, password: PASSWORD },
        3,
        ADMINISTRADOR,
        db
      ),
    (err) => err.status === 403
  );
  assert.equal(db.calls.length, 0);
});

test("createUsuario deja a un ADMINISTRADOR crear un EMPLEADO", async () => {
  const db = fakeDb([CREADO]);

  const usuario = await createUsuario(
    { ...CREADO, id_nivel_jerarquico: 3, password: PASSWORD },
    3,
    ADMINISTRADOR,
    db
  );

  assert.equal(usuario.id, 9);
  assert.equal(db.calls.length, 1);
});

test("updateUsuario impide a un ADMINISTRADOR tocar a un DUEÑO", async () => {
  const db = fakeDbPorSql({
    "SELECT id_nivel_jerarquico": [{ id_nivel_jerarquico: 1 }],
    "UPDATE encargado_empresa": [CREADO],
  });

  await assert.rejects(
    () => actualizarUsuario(9, 3, { password: "otra-clave-larga-2026" }, ADMINISTRADOR, db),
    (err) => err.status === 403
  );
  assert.equal(db.calls.some((call) => call.sql.includes("UPDATE encargado_empresa")), false);
});

test("updateUsuario permite al DUEÑO tocar a otro DUEÑO", async () => {
  const db = fakeDbPorSql({
    "SELECT id_nivel_jerarquico": [{ id_nivel_jerarquico: 1 }],
    "UPDATE encargado_empresa": [CREADO],
  });

  const usuario = await actualizarUsuario(9, 3, { cargo: "Gerente general" }, DUENIO, db);

  assert.equal(usuario.id, 9);
  assert.equal(db.calls.some((call) => call.sql.includes("UPDATE encargado_empresa")), true);
});

test("exigirAdministracion rechaza a un EMPLEADO", () => {
  assert.throws(
    () => exigirAdministracion(EMPLEADO),
    (err) => err.status === 403
  );
});

test("exigirAdministracion deja pasar al DUEÑO y al ADMINISTRADOR", () => {
  assert.doesNotThrow(() => exigirAdministracion(DUENIO));
  assert.doesNotThrow(() => exigirAdministracion(ADMINISTRADOR));
});

test("UsuarioSchema rechaza una contraseña que no cumple la política", () => {
  const resultado = UsuarioSchema.safeParse({
    primer_nombre: "Ana",
    apellidos: "Pérez Soto",
    email: "Ana@Example.com",
    cargo: "Gerente",
    id_nivel_jerarquico: "2",
    password: "corta",
  });

  assert.equal(resultado.success, false);
  const mensaje = resultado.error.issues.find((issue) => issue.path[0] === "password");
  assert.match(mensaje.message, /al menos 12 caracteres/);
});

test("UsuarioSchema exige la contraseña al crear con mensaje en español", () => {
  const resultado = UsuarioSchema.safeParse({
    primer_nombre: "Ana",
    apellidos: "Pérez Soto",
    email: "ana@example.com",
    cargo: "Gerente",
    id_nivel_jerarquico: 2,
  });

  assert.equal(resultado.success, false);
  const mensaje = resultado.error.issues.find((issue) => issue.path[0] === "password");
  assert.equal(mensaje.message, "La contraseña es obligatoria");
});

test("UsuarioSchema normaliza el correo y el rol numérico", () => {
  const resultado = UsuarioSchema.parse({
    primer_nombre: "  Ana ",
    apellidos: "Pérez Soto",
    email: "Ana@Example.com",
    cargo: "Gerente",
    id_nivel_jerarquico: "2",
    password: PASSWORD,
  });

  assert.equal(resultado.email, "ana@example.com");
  assert.equal(resultado.primer_nombre, "Ana");
  assert.equal(resultado.id_nivel_jerarquico, 2);
});
