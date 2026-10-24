import pool from "@/lib/db";

// 1. Métricas KPI (Combustible total y Rendimiento real acumulado)
export async function MetricasAmbienteQuery(id_empresa) {
  const { rows } = await pool.query(
    `WITH cargas AS (
       SELECT 
         a.id_camion, a.litros, a.odometro_km, a.estanque_lleno,
         COUNT(*) FILTER (WHERE a.estanque_lleno) OVER w AS tramo,
         MAX(a.odometro_km) FILTER (WHERE a.estanque_lleno) OVER w AS odo_inicio
       FROM ABASTECIMIENTO a
       JOIN CAMION c ON c.id_camion = a.id_camion
       JOIN FLOTA f ON f.id_flota = c.id_flota
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
         SUM(litros) AS litros_consumidos,
         MAX(odometro_km) FILTER (WHERE estanque_lleno) AS odo_fin,
         MAX(odo_inicio) AS odo_inicio
       FROM cargas
       WHERE tramo > 0
       GROUP BY id_camion, tramo
       HAVING BOOL_OR(estanque_lleno)
     )
     SELECT 
       COALESCE((SELECT SUM(litros) FROM ABASTECIMIENTO a JOIN CAMION c ON c.id_camion = a.id_camion JOIN FLOTA f ON f.id_flota = c.id_flota WHERE f.id_empresa = $1), 0)::float AS litros_totales,
       COALESCE(SUM(odo_fin - odo_inicio), 0)::float AS km_recorridos,
       COALESCE((SUM(odo_fin - odo_inicio) / NULLIF(SUM(litros_consumidos), 0)), 0)::float AS km_por_litro
     FROM tramos`,
    [id_empresa]
  );
  return rows[0] || { litros_totales: 0, km_recorridos: 0, km_por_litro: 0 };
}

// 2. Mapa de Calor - Franja Horaria (00:00 a 23:00)
export async function MapaCalorHorarioQuery(id_empresa) {
  const { rows } = await pool.query(
    `SELECT 
       EXTRACT(ISODOW FROM t.fecha_hora)::int - 1 AS dia_semana,
       EXTRACT(HOUR FROM t.fecha_hora)::int AS hora_dia,
       AVG(l.valor) AS emision_promedio
     FROM TELEMETRIA t
     JOIN LECTURA l ON l.id_telemetria = t.id_telemetria AND l.fecha_hora = t.fecha_hora
     JOIN SENSOR s ON s.id_sensor = l.id_sensor
     JOIN TIPO_MEDICION tm ON tm.id_tipo_medicion = s.id_tipo_medicion
     JOIN CAMION c ON c.id_camion = t.id_camion
     JOIN FLOTA f ON f.id_flota = c.id_flota
     WHERE f.id_empresa = $1 AND tm.codigo IN ('EMISION_CO2', 'CONSUMO_INSTANTANEO')
     GROUP BY dia_semana, hora_dia`,
    [id_empresa]
  );
  return rows;
}

// 3. Mapa de Calor - Por Zonas
export async function MapaCalorZonasQuery(id_empresa) {
  const { rows } = await pool.query(
    `SELECT 
       co.nombre AS comuna,
       COUNT(t.id_telemetria) AS total_lecturas,
       COALESCE(AVG(t.velocidad), 0) AS velocidad_prom
     FROM TELEMETRIA t
     JOIN VIAJE v ON v.id_viaje = t.id_viaje
     JOIN RUTA r ON r.id_ruta = v.id_ruta
     JOIN COMUNA co ON co.id_comuna = r.id_comuna_destino
     JOIN CAMION c ON c.id_camion = t.id_camion
     JOIN FLOTA f ON f.id_flota = c.id_flota
     WHERE f.id_empresa = $1
     GROUP BY co.nombre
     LIMIT 4`,
    [id_empresa]
  );
  return rows;
}

// 4. Mapa de Calor - Camión vs Ruta
export async function MapaCalorCamionesRutaQuery(id_empresa) {
  const { rows } = await pool.query(
    `SELECT 
       c.patente,
       CONCAT(co_orig.nombre, ' - ', co_dest.nombre) AS ruta,
       COUNT(v.id_viaje) AS total_viajes
     FROM CAMION c
     JOIN FLOTA f ON f.id_flota = c.id_flota
     LEFT JOIN VIAJE v ON v.id_camion = c.id_camion
     LEFT JOIN RUTA r ON r.id_ruta = v.id_ruta
     LEFT JOIN COMUNA co_orig ON co_orig.id_comuna = r.id_comuna_origen
     LEFT JOIN COMUNA co_dest ON co_dest.id_comuna = r.id_comuna_destino
     WHERE f.id_empresa = $1 AND c.deleted_at IS NULL
     GROUP BY c.patente, ruta
     LIMIT 16`,
    [id_empresa]
  );
  return rows;
}