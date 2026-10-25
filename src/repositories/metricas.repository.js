import pool from "@/lib/db";

export async function obtenerMetricasEstadisticas(id_empresa, db = pool) {
  const [rendimiento, gasto, ralenti] = await Promise.all([
    db.query(
      `
      WITH combustible_viaje AS (
        SELECT id_viaje, SUM(litros) AS litros
        FROM abastecimiento
        WHERE id_viaje IS NOT NULL
        GROUP BY id_viaje
      ),
      datos_viaje AS (
        SELECT
          AVG(t.velocidad)::float AS velocidad_promedio,
          (r.distancia_km / NULLIF(cv.litros, 0))::float AS km_por_litro
        FROM viaje v
        JOIN ruta r ON r.id_ruta = v.id_ruta
        JOIN combustible_viaje cv ON cv.id_viaje = v.id_viaje
        JOIN telemetria t ON t.id_viaje = v.id_viaje
        WHERE v.id_empresa = $1
          AND v.estado = 'COMPLETADO'
        GROUP BY v.id_viaje, r.distancia_km, cv.litros
      )
      SELECT
        CORR(velocidad_promedio, km_por_litro)::float
          AS correlacion_velocidad_rendimiento,
        STDDEV_SAMP(km_por_litro)::float
          AS desviacion_estandar_rendimiento
      FROM datos_viaje
      `,
      [id_empresa],
    ),
    db.query(
      `
      WITH dias AS (
        SELECT generate_series(
          CURRENT_DATE - INTERVAL '29 days',
          CURRENT_DATE,
          INTERVAL '1 day'
        )::date AS dia
      ),
      gasto_diario AS (
        SELECT a.fecha::date AS dia, SUM(a.costo) AS gasto
        FROM abastecimiento a
        JOIN camion c ON c.id_camion = a.id_camion
        JOIN flota f ON f.id_flota = c.id_flota
        WHERE f.id_empresa = $1
          AND c.deleted_at IS NULL
          AND f.deleted_at IS NULL
          AND a.fecha >= CURRENT_DATE - INTERVAL '29 days'
          AND a.fecha < CURRENT_DATE + INTERVAL '1 day'
        GROUP BY a.fecha::date
      )
      SELECT (
        AVG(COALESCE(gd.gasto, 0)) *
        EXTRACT(
          DAY FROM (
            DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month' -
            DATE_TRUNC('month', CURRENT_DATE)
          )
        )
      )::float AS proyeccion_gasto_mensual
      FROM dias d
      LEFT JOIN gasto_diario gd ON gd.dia = d.dia
      `,
      [id_empresa],
    ),
    db.query(
      `
      WITH rpm_por_telemetria AS (
        SELECT
          t.id_telemetria,
          t.fecha_hora,
          t.velocidad,
          MAX(l.valor) AS rpm
        FROM telemetria t
        JOIN camion c ON c.id_camion = t.id_camion
        JOIN flota f ON f.id_flota = c.id_flota
        JOIN sensor s ON s.id_camion = c.id_camion
          AND s.deleted_at IS NULL
        JOIN tipo_medicion tm ON tm.id_tipo_medicion = s.id_tipo_medicion
          AND tm.codigo = 'RPM_MOTOR'
        JOIN lectura l ON l.id_telemetria = t.id_telemetria
          AND l.fecha_hora = t.fecha_hora
          AND l.id_sensor = s.id_sensor
        WHERE f.id_empresa = $1
          AND c.deleted_at IS NULL
          AND f.deleted_at IS NULL
          AND t.fecha_hora >= CURRENT_DATE - INTERVAL '30 days'
          AND t.fecha_hora < CURRENT_DATE + INTERVAL '1 day'
        GROUP BY t.id_telemetria, t.fecha_hora, t.velocidad
      )
      SELECT (
        COUNT(*) FILTER (WHERE velocidad <= 1 AND rpm > 0)::float * 100 /
        NULLIF(COUNT(*) FILTER (WHERE rpm > 0), 0)
      ) AS ralenti_innecesario_pct
      FROM rpm_por_telemetria
      `,
      [id_empresa],
    ),
  ]);

  return {
    correlacionVelocidadRendimiento:
      rendimiento.rows[0]?.correlacion_velocidad_rendimiento ?? null,
    desviacionEstandarRendimiento:
      rendimiento.rows[0]?.desviacion_estandar_rendimiento ?? null,
    proyeccionGastoMensual: gasto.rows[0]?.proyeccion_gasto_mensual ?? null,
    ralentiInnecesarioPct: ralenti.rows[0]?.ralenti_innecesario_pct ?? null,
  };
}
