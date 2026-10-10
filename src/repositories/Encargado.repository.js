import pool from "@/lib/db";

<<<<<<< HEAD

// Create funcion para crear los encargados
export async function create(data, db = pool) {
  const { rows } = await db.query(
    `INSERT INTO encargado_empresa
       (id_empresa, id_nivel_jerarquico, primer_nombre, apellidos, email, cargo, password_hash)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id_encargado, id_empresa, usuario, primer_nombre, apellidos, email, cargo`,
    [
      data.idEmpresa, data.idNivelJerarquico, data.primer_nombre,
=======
export async function create(data, db = pool) {
  const { rows } = await db.query(
    `INSERT INTO encargado_empresa
       (id_empresa, id_nivel_jerarquico, usuario, primer_nombre, apellidos, email, cargo, password_hash)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, id_empresa, usuario, primer_nombre, apellidos, email, cargo`,
    [
      data.idEmpresa, data.idNivelJerarquico, data.usuario, data.primer_nombre,
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
      data.apellidos, data.email, data.cargo, data.passwordHash,
    ],
  );
  return rows[0];
<<<<<<< HEAD
}

// Funcion para buscar a los encargados por email
export async function findByEmail(email, db = pool) {
  const result = await db.query("SELECT * FROM encargado_empresa WHERE email = $1", [email]);
  return result.rows[0];
} 

// Funcion para buscar a los encargados por id
export async function findByID(id_encargado, db = pool) {
  const result = await db.query("SELECT * FROM encargado_empresa as c WHERE c.id_encargado = $1", [id_encargado]);
  return result.rows[0];
} 



export async function findexist(email, db = pool) {
  const result = await db.query("SELECT 1 FROM encargado_empresa WHERE email = $1", [email]);
  return result.length > 0;
} 
 

// Funcion para buscar a los encargados por usuario
export async function findByUsuario(usuario, db = pool) {
  const result = await db.query("SELECT * FROM encargado_empresa WHERE usuario = $1", [usuario]);
  return result.rows[0];
} 
=======
}
>>>>>>> 9e08fd4 (feat(backend): add auth registration, repositories and modular SQL schema)
