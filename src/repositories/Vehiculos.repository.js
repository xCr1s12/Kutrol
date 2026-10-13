import pool, { query } from "@/lib/db";

export async function CreateVehiculo(data, db = pool) {
  const { rows } = await db.query(
    `
      INSERT INTO kutrol.camion
      (id_flota, patente, codigo_dispositivo, marca, modelo, ano,
      capacidad_carga_kg, capacidad_estanque_l, tipo_combustible, estado)
      VALUES
          ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;    
    `,
    [
      data.id_flota,
      data.patente,
      data.codigo_dispositivo,
      data.marca,
      data.modelo,
      data.ano,
      data.capacidad_carga_kg,
      data.capacidad_estanque_l,
      data.tipo_combustible,
      data.estado,
    ],
  ); return rows[0]
}

export async function findVehiculosByEmpresa(id_empresa, db = pool) {
  const { rows } = await db.query(
    `SELECT c.id_camion, c.patente, c.codigo_dispositivo, c.marca, c.modelo,
            c.ano, c.capacidad_carga_kg, c.capacidad_estanque_l,
            c.tipo_combustible, c.estado,
            f.id_flota, f.nombre AS flota
     FROM camion c
     JOIN flota f ON f.id_flota = c.id_flota
     WHERE f.id_empresa = $1
       AND c.deleted_at IS NULL
       AND f.deleted_at IS NULL
     ORDER BY c.patente`,
    [id_empresa],
  );
  return rows;
}
