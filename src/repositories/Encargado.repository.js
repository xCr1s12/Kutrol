import pool from "@/lib/db";

export async function create(data, db = pool) {
  const { rows } = await db.query(
    `INSERT INTO encargado_empresa
       (id_empresa, id_nivel_jerarquico, usuario, primer_nombre, apellidos, email, cargo, password_hash)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, id_empresa, usuario, primer_nombre, apellidos, email, cargo`,
    [
      data.idEmpresa, data.idNivelJerarquico, data.usuario, data.primer_nombre,
      data.apellidos, data.email, data.cargo, data.passwordHash,
    ],
  );
  return rows[0];
}