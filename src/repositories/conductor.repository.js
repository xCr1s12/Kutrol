import pool from "@/lib/db";

export async function listarConductores(id_empresa, db = pool) {
  const { rows } = await db.query(
    `SELECT c.id_conductor,
            c.primer_nombre || ' ' || c.apellidos AS conductor,
            c.run,
            c.licencia AS licencia_num,
            c.fecha_venc_licencia,
            c.estado,
            actual.patente AS vehiculo
     FROM conductor c
     LEFT JOIN LATERAL (
       SELECT ca.patente
       FROM asignacion a
       JOIN viaje v ON v.id_viaje = a.id_viaje
       JOIN camion ca ON ca.id_camion = v.id_camion
       JOIN flota f ON f.id_flota = ca.id_flota
       WHERE a.id_conductor = c.id_conductor
         AND a.estado = 'ACTIVA'
         AND v.estado IN ('EN_CURSO', 'PROGRAMADO')
         AND f.id_empresa = c.id_empresa
         AND ca.deleted_at IS NULL
       ORDER BY v.fecha_inicio DESC, a.id_asignacion DESC
       LIMIT 1
     ) actual ON TRUE
     WHERE c.id_empresa = $1
       AND c.deleted_at IS NULL
     ORDER BY c.apellidos, c.primer_nombre`,
    [id_empresa],
  );
  return rows;
}

export async function crearConductor(data, db = pool) {
  const { rows } = await db.query(
    `WITH nuevo_conductor AS (
       INSERT INTO conductor (
         id_empresa, primer_nombre, apellidos, run, licencia, fecha_venc_licencia
       )
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id_conductor, id_empresa, primer_nombre, apellidos, run,
                 licencia, fecha_venc_licencia, estado
     ),
     nuevo_email AS (
       INSERT INTO conductor_email (id_conductor, email)
       SELECT id_conductor, $7 FROM nuevo_conductor
     ),
     nuevo_telefono AS (
       INSERT INTO conductor_telefono (id_conductor, telefono)
       SELECT id_conductor, $8 FROM nuevo_conductor
     )
     SELECT id_conductor, id_empresa,
            primer_nombre || ' ' || apellidos AS conductor,
            run, licencia AS licencia_num, fecha_venc_licencia, estado
     FROM nuevo_conductor`,
    [
      data.id_empresa,
      data.primer_nombre,
      data.apellidos,
      data.run,
      data.licencia,
      data.fecha_venc_licencia,
      data.email,
      data.telefono,
    ],
  );
  return rows[0];
}

export async function obtenerHistorialConductor(id_conductor, id_empresa, db = pool) {
  const { rows } = await db.query(
    `SELECT c.id_conductor,
            c.primer_nombre || ' ' || c.apellidos AS conductor,
            c.run,
            c.licencia AS licencia_num,
            c.fecha_venc_licencia,
            (SELECT email FROM conductor_email
             WHERE id_conductor = c.id_conductor ORDER BY email LIMIT 1) AS email,
            (SELECT telefono FROM conductor_telefono
             WHERE id_conductor = c.id_conductor ORDER BY telefono LIMIT 1) AS telefono,
            a.id_asignacion,
            ca.patente AS vehiculo,
            v.fecha_inicio,
            COALESCE(v.fecha_fin, v.fecha_fin_estimada) AS fecha_fin,
            v.estado AS estado_viaje,
            co.nombre AS comuna_origen,
            cd.nombre AS comuna_destino,
            GREATEST(
              1,
              CEIL(EXTRACT(EPOCH FROM (
                COALESCE(v.fecha_fin, v.fecha_fin_estimada, CURRENT_TIMESTAMP) - v.fecha_inicio
              )) / 86400)
            )::int AS dias
     FROM conductor c
     LEFT JOIN asignacion a
       ON a.id_conductor = c.id_conductor
      AND a.estado <> 'CANCELADA'
     LEFT JOIN viaje v ON v.id_viaje = a.id_viaje
     LEFT JOIN camion ca ON ca.id_camion = v.id_camion
     LEFT JOIN ruta r ON r.id_ruta = v.id_ruta
     LEFT JOIN comuna co ON co.id_comuna = r.id_comuna_origen
     LEFT JOIN comuna cd ON cd.id_comuna = r.id_comuna_destino
     WHERE c.id_conductor = $1
       AND c.id_empresa = $2
       AND c.deleted_at IS NULL
     ORDER BY v.fecha_inicio DESC NULLS LAST, a.id_asignacion DESC NULLS LAST`,
    [id_conductor, id_empresa],
  );
  return rows;
}
