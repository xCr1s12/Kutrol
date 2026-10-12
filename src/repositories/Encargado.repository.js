import pool from "@/lib/db";


// Create funcion para crear los encargados
export async function create(data, db = pool) {
  const { rows } = await db.query(
    `INSERT INTO encargado_empresa
       (id_empresa, id_nivel_jerarquico, primer_nombre, apellidos, email, cargo, password_hash)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id_encargado, id_empresa, usuario, primer_nombre, apellidos, email, cargo`,
    [
      data.idEmpresa, data.idNivelJerarquico, data.primer_nombre,
      data.apellidos, data.email, data.cargo, data.passwordHash,
    ],
  );
  return rows[0];
}

// Funcion para buscar a los encargados por email
export async function findByEmail(email, db = pool) {
  const result = await db.query("SELECT * FROM encargado_empresa WHERE email = $1", [email]);
  return result.rows[0];
} 


export async function findexist(email, db = pool) {
  const result = await db.query("SELECT 1 FROM encargado_empresa WHERE email = $1", [email]);
  return result.length > 0;
} 
