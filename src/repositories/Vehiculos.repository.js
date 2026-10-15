import pool from "@/lib/db";

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
  );
  return rows[0];
}

<<<<<<< HEAD
<<<<<<< HEAD
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
  );
  return rows[0];
}

export async function findVehiculosByFlota(id_flota, db = pool) {
=======
export async function findVehiculosByEmpresa(id_empresa, db = pool) {
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)
=======
export async function findVehiculosByFlota(id_flota, db = pool) {
>>>>>>> 8339aaa (feat(api): implement flota module and add auth logout and proxy support)
  const { rows } = await db.query(
    `SELECT c.id_camion, c.patente, c.codigo_dispositivo, c.marca, c.modelo,
            c.ano, c.capacidad_carga_kg, c.capacidad_estanque_l,
            c.tipo_combustible, c.estado,
            f.id_flota, f.nombre AS flota
     FROM camion c
     JOIN flota f ON f.id_flota = c.id_flota
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 8339aaa (feat(api): implement flota module and add auth logout and proxy support)
     WHERE f.id_flota = $1
       AND c.deleted_at IS NULL
       AND f.deleted_at IS NULL
     ORDER BY c.patente`,
    [id_flota],
  );
  return rows;
}

// Devuelve { total_vehiculos, vehiculos_disponibles }
export async function VehiculosDataQuery(id_empresa, db = pool) {
  const { rows } = await db.query(
    `SELECT COUNT(*)::int AS total_vehiculos,
            COUNT(*) FILTER (WHERE c.estado = 'DISPONIBLE')::int AS vehiculos_disponibles
     FROM camion AS c
     INNER JOIN flota AS f ON f.id_flota = c.id_flota
     WHERE f.id_empresa = $1
       AND c.deleted_at IS NULL
       AND f.deleted_at IS NULL`,
    [id_empresa],
  );
  return rows[0];
}

// Devuelve { gasto_total }
export async function GastoTotalDinero(id_empresa, db = pool) {
  const { rows } = await db.query(
    `SELECT
       COALESCE(SUM(a.costo), 0)::float AS gasto_total
     FROM abastecimiento AS a
     INNER JOIN camion AS c ON c.id_camion = a.id_camion
     INNER JOIN flota AS f ON f.id_flota = c.id_flota
     WHERE f.id_empresa = $1`,
    [id_empresa],
  );
  return rows[0];
}

// Devuelve { litros_consumidos, km_recorridos, km_por_litro }
export async function CombustibleYRendimiento(id_empresa, db = pool) {
  const { rows } = await db.query(
    `WITH cargas AS (
       SELECT
         a.id_camion, a.litros, a.odometro_km, a.estanque_lleno,
         -- cuántos llenados completos hay antes de esta fila (define el tramo)
         COUNT(*) FILTER (WHERE a.estanque_lleno) OVER w AS tramo,
         -- odómetro del llenado completo anterior
         MAX(a.odometro_km) FILTER (WHERE a.estanque_lleno) OVER w AS odo_inicio
       FROM abastecimiento AS a
       INNER JOIN camion AS c ON c.id_camion = a.id_camion
       INNER JOIN flota  AS f ON f.id_flota  = c.id_flota
       WHERE f.id_empresa = $1
       WINDOW w AS (
         PARTITION BY a.id_camion
         ORDER BY a.fecha, a.id_abastecimiento
         ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
       )
     ),
     tramos AS (
       SELECT
         id_camion, tramo,
         SUM(litros)                                    AS litros_consumidos,
         MAX(odometro_km) FILTER (WHERE estanque_lleno) AS odo_fin,
         MAX(odo_inicio)                                AS odo_inicio
       FROM cargas
       WHERE tramo > 0                 -- descarta lo anterior al primer llenado
       GROUP BY id_camion, tramo
       HAVING BOOL_OR(estanque_lleno)  -- descarta el tramo abierto
     )
     SELECT
       COALESCE(SUM(litros_consumidos), 0)::float AS litros_consumidos,
       COALESCE(SUM(odo_fin - odo_inicio), 0)::float AS km_recorridos,
       (SUM(odo_fin - odo_inicio) / NULLIF(SUM(litros_consumidos), 0))::float AS km_por_litro
     FROM tramos`,
    [id_empresa],
  );
  return rows[0];
=======
     WHERE f.id_empresa = $1
       AND c.deleted_at IS NULL
       AND f.deleted_at IS NULL
     ORDER BY c.patente`,
    [id_empresa],
  );
  return rows;
<<<<<<< HEAD
>>>>>>> d51ac6f (feat(vehiculos): add dynamic vehicle table with API integration)
}
<<<<<<< HEAD
=======
}
>>>>>>> 6e11786 (feat(vehiculos): implement vehicle creation with validation and UI form)
=======

// Devuelve { total_vehiculos, vehiculos_disponibles }
export async function VehiculosDataQuery(id_empresa, db = pool) {
  const { rows } = await db.query(
    `SELECT COUNT(*)::int AS total_vehiculos,
            COUNT(*) FILTER (WHERE c.estado = 'DISPONIBLE')::int AS vehiculos_disponibles
     FROM camion AS c
     INNER JOIN flota AS f ON f.id_flota = c.id_flota
     WHERE f.id_empresa = $1
       AND c.deleted_at IS NULL
       AND f.deleted_at IS NULL`,
    [id_empresa],
  );
  return rows[0];
}

// Devuelve { gasto_total }
export async function GastoTotalDinero(id_empresa, db = pool) {
  const { rows } = await db.query(
    `SELECT
       COALESCE(SUM(a.costo), 0)::float AS gasto_total
     FROM abastecimiento AS a
     INNER JOIN camion AS c ON c.id_camion = a.id_camion
     INNER JOIN flota AS f ON f.id_flota = c.id_flota
     WHERE f.id_empresa = $1`,
    [id_empresa],
  );
  return rows[0];
}

// Devuelve { litros_consumidos, km_recorridos, km_por_litro }
export async function CombustibleYRendimiento(id_empresa, db = pool) {
  const { rows } = await db.query(
    `WITH cargas AS (
       SELECT
         a.id_camion, a.litros, a.odometro_km, a.estanque_lleno,
         -- cuántos llenados completos hay antes de esta fila (define el tramo)
         COUNT(*) FILTER (WHERE a.estanque_lleno) OVER w AS tramo,
         -- odómetro del llenado completo anterior
         MAX(a.odometro_km) FILTER (WHERE a.estanque_lleno) OVER w AS odo_inicio
       FROM abastecimiento AS a
       INNER JOIN camion AS c ON c.id_camion = a.id_camion
       INNER JOIN flota  AS f ON f.id_flota  = c.id_flota
       WHERE f.id_empresa = $1
       WINDOW w AS (
         PARTITION BY a.id_camion
         ORDER BY a.fecha, a.id_abastecimiento
         ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
       )
     ),
     tramos AS (
       SELECT
         id_camion, tramo,
         SUM(litros)                                    AS litros_consumidos,
         MAX(odometro_km) FILTER (WHERE estanque_lleno) AS odo_fin,
         MAX(odo_inicio)                                AS odo_inicio
       FROM cargas
       WHERE tramo > 0                 -- descarta lo anterior al primer llenado
       GROUP BY id_camion, tramo
       HAVING BOOL_OR(estanque_lleno)  -- descarta el tramo abierto
     )
     SELECT
       COALESCE(SUM(litros_consumidos), 0)::float AS litros_consumidos,
       COALESCE(SUM(odo_fin - odo_inicio), 0)::float AS km_recorridos,
       (SUM(odo_fin - odo_inicio) / NULLIF(SUM(litros_consumidos), 0))::float AS km_por_litro
     FROM tramos`,
    [id_empresa],
  );
  return rows[0];
}
>>>>>>> ee70475 (feat: add login authentication and dynamic dashboard metrics)
