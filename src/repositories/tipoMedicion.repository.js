import pool from "@/lib/db";

// tipos de medicion con sus umbrales: el trigger de lecturas los usa para crear anomalias
export async function findTiposMedicion(db = pool) {
  const { rows } = await db.query(
    `SELECT tm.id_tipo_medicion, tm.codigo, tm.nombre, tm.categoria, tm.unidad,
            tm.valor_min_fisico, tm.valor_max_fisico,
            tm.umbral_min, tm.umbral_max, tm.id_severidad
     FROM tipo_medicion tm
     ORDER BY tm.categoria, tm.nombre`,
  );
  return rows;
}

export async function findTipoMedicionById(id_tipo_medicion, db = pool) {
  const { rows } = await db.query(
    `SELECT id_tipo_medicion, valor_min_fisico, valor_max_fisico
     FROM tipo_medicion
     WHERE id_tipo_medicion = $1`,
    [id_tipo_medicion],
  );
  return rows[0];
}

export async function findSeveridades(db = pool) {
  const { rows } = await db.query(
    `SELECT id_severidad, nombre FROM severidad ORDER BY id_severidad`,
  );
  return rows;
}

// solo cambia umbrales y severidad: el rango fisico y el codigo no se tocan
export async function updateUmbrales(id_tipo_medicion, datos, db = pool) {
  const { rows } = await db.query(
    `UPDATE tipo_medicion
        SET umbral_min = $2, umbral_max = $3, id_severidad = $4
      WHERE id_tipo_medicion = $1
      RETURNING id_tipo_medicion, codigo, nombre, categoria, unidad,
                valor_min_fisico, valor_max_fisico,
                umbral_min, umbral_max, id_severidad`,
    [id_tipo_medicion, datos.umbral_min, datos.umbral_max, datos.id_severidad],
  );
  return rows[0];
}
