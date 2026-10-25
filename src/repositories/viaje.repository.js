import pool from "@/lib/db";

export async function getOpcionesViaje(id_empresa, db = pool) {
  const [camiones, conductores] = await Promise.all([
    db.query(
      `SELECT c.id_camion, c.patente, c.marca, c.modelo
       FROM camion c
       JOIN flota f ON f.id_flota = c.id_flota
       WHERE f.id_empresa = $1
         AND f.deleted_at IS NULL
         AND c.deleted_at IS NULL
         AND c.estado = 'DISPONIBLE'
       ORDER BY c.patente`,
      [id_empresa],
    ),
    db.query(
      `SELECT id_conductor,
              primer_nombre || ' ' || apellidos AS nombre
       FROM conductor
       WHERE id_empresa = $1
         AND deleted_at IS NULL
         AND estado = 'ACTIVO'
         AND fecha_venc_licencia >= CURRENT_DATE
       ORDER BY apellidos, primer_nombre`,
      [id_empresa],
    ),
  ]);

  return {
    camiones: camiones.rows,
    conductores: conductores.rows,
  };
}

export async function existeRutaDeEmpresa(id_ruta, id_empresa, db = pool) {
  const { rows } = await db.query(
    `SELECT 1 FROM ruta WHERE id_ruta = $1 AND id_empresa = $2`,
    [id_ruta, id_empresa],
  );
  return rows.length > 0;
}

export async function existeCamionDisponible(id_camion, id_empresa, db = pool) {
  const { rows } = await db.query(
    `SELECT 1
     FROM camion c
     JOIN flota f ON f.id_flota = c.id_flota
     WHERE c.id_camion = $1
       AND f.id_empresa = $2
       AND f.deleted_at IS NULL
       AND c.deleted_at IS NULL
       AND c.estado = 'DISPONIBLE'`,
    [id_camion, id_empresa],
  );
  return rows.length > 0;
}

export async function existeConductorDisponible(
  id_conductor,
  id_empresa,
  fecha_fin_estimada,
  db = pool,
) {
  const { rows } = await db.query(
    `SELECT 1
     FROM conductor
     WHERE id_conductor = $1
       AND id_empresa = $2
       AND deleted_at IS NULL
       AND estado = 'ACTIVO'
       AND fecha_venc_licencia >= ($3::timestamptz AT TIME ZONE 'America/Santiago')::date`,
    [id_conductor, id_empresa, fecha_fin_estimada],
  );
  return rows.length > 0;
}

export async function createViajeProgramado(
  { id_empresa, id_ruta, id_camion, id_conductor, fecha_inicio, fecha_fin_estimada },
  db = pool,
) {
  const { rows } = await db.query(
    `INSERT INTO viaje (
       id_empresa, id_ruta, id_camion, fecha_inicio, fecha_fin_estimada, estado
     )
     VALUES ($1, $2, $3, $4, $5, 'PROGRAMADO')
     RETURNING id_viaje`,
    [id_empresa, id_ruta, id_camion, fecha_inicio, fecha_fin_estimada],
  );
  const viaje = rows[0];

  await db.query(
    `INSERT INTO asignacion (id_conductor, id_viaje, estado, fecha_inicio_viaje)
     VALUES ($1, $2, 'ACTIVA', $3)`,
    [id_conductor, viaje.id_viaje, fecha_inicio],
  );

  return viaje;
}
