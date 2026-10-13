import pool from "@/lib/db";

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