import pool from "@/lib/db";

export const estadisticaRepository = {
  async getRankingConductoresByEmpresa(id_empresa) {
    const { rows } = await pool.query(
      `
      SELECT
        c.id_conductor,
        (c.primer_nombre || ' ' || c.apellidos) AS nombre,
        ROUND(COALESCE(SUM(r.distancia_km) / NULLIF(SUM(ab.litros), 0), 0), 1) AS rendimiento_kml
      FROM CONDUCTOR c
      JOIN ASIGNACION a ON a.id_conductor = c.id_conductor
      JOIN VIAJE v ON a.id_viaje = v.id_viaje
        AND v.id_empresa = c.id_empresa
      JOIN RUTA r ON v.id_ruta = r.id_ruta
      LEFT JOIN ABASTECIMIENTO ab ON ab.id_camion = v.id_camion
        AND ab.fecha BETWEEN v.fecha_inicio AND COALESCE(v.fecha_fin, CURRENT_TIMESTAMP)
      WHERE c.id_empresa = $1
        AND c.deleted_at IS NULL
        AND v.estado = 'COMPLETADO'
      GROUP BY c.id_conductor, c.primer_nombre, c.apellidos
      ORDER BY rendimiento_kml DESC
      LIMIT 5
      `,
      [id_empresa],
    );
    return rows;
  },

  // 1. Obtener resumen general para el dashboard
  async getDashboardStats() {
    // Métricas de Vehículos
    const resVehiculos = await pool.query(`
      SELECT 
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE estado = 'EN_RUTA') AS en_ruta,
        COUNT(*) FILTER (WHERE estado = 'DISPONIBLE') AS disponibles,
        COUNT(*) FILTER (WHERE estado = 'MANTENCION') AS mantencion
      FROM CAMION
    `);

    // Gasto Total y Litros de Combustible (usando 'litros')
    const resCombustible = await pool.query(`
      SELECT 
        COALESCE(SUM(costo), 0) AS gasto_total,
        COALESCE(SUM(litros), 0) AS litros_totales
      FROM ABASTECIMIENTO
    `);

    // KPI Rendimiento Promedio (usando 'litros')
    const resRendimiento = await pool.query(`
      SELECT 
        ROUND(COALESCE(SUM(r.distancia_km) / NULLIF(SUM(ab.litros), 0), 0), 2) AS kpi_rendimiento
      FROM VIAJE v
      JOIN RUTA r ON v.id_ruta = r.id_ruta
      LEFT JOIN ABASTECIMIENTO ab ON ab.id_camion = v.id_camion 
        AND ab.fecha BETWEEN v.fecha_inicio AND COALESCE(v.fecha_fin, CURRENT_TIMESTAMP)
      WHERE v.estado = 'COMPLETADO'
    `);

    // Ranking de Conductores (usando primer_nombre, apellidos y litros)
    const resRanking = await pool.query(`
      SELECT 
        c.id_conductor,
        (c.primer_nombre || ' ' || c.apellidos) AS nombre,
        ROUND(COALESCE(SUM(r.distancia_km) / NULLIF(SUM(ab.litros), 0), 0), 1) AS rendimiento_kml
      FROM CONDUCTOR c
      JOIN ASIGNACION a ON a.id_conductor = c.id_conductor
      JOIN VIAJE v ON a.id_viaje = v.id_viaje
      JOIN RUTA r ON v.id_ruta = r.id_ruta
      LEFT JOIN ABASTECIMIENTO ab ON ab.id_camion = v.id_camion 
        AND ab.fecha BETWEEN v.fecha_inicio AND COALESCE(v.fecha_fin, CURRENT_TIMESTAMP)
      WHERE v.estado = 'COMPLETADO'
      GROUP BY c.id_conductor, c.primer_nombre, c.apellidos
      ORDER BY rendimiento_kml DESC
      LIMIT 5
    `);

    // Alertas Activas Recientes (usando primer_nombre y apellidos)
    const resAlertas = await pool.query(`
      SELECT 
        al.id_alerta,
        al.tipo,
        al.estado,
        al.mensaje,
        al.fecha_hora,
        (co.primer_nombre || ' ' || co.apellidos) AS conductor_nombre
      FROM ALERTA al
      LEFT JOIN CONDUCTOR co ON al.id_conductor = co.id_conductor
      WHERE al.estado IN ('GENERADA', 'EN_REVISION')
      ORDER BY al.fecha_hora DESC
      LIMIT 5
    `);

    return {
      vehiculos: resVehiculos.rows[0],
      combustible: resCombustible.rows[0],
      rendimiento: resRendimiento.rows[0]?.kpi_rendimiento || 0,
      ranking: resRanking.rows,
      alertas: resAlertas.rows,
    };
  },

  // 2. Obtener historial de consumo agrupado por periodo
  async getConsumoPorPeriodo(periodo) {
    let query = "";

    if (periodo === "semanal") {
      query = `
        SELECT 
          TO_CHAR(DATE(fecha), 'DD Mon') as fecha,
          COALESCE(SUM(litros), 0) as cantidad_combustible
        FROM ABASTECIMIENTO
        WHERE fecha >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY DATE(fecha)
        ORDER BY DATE(fecha) ASC;
      `;
    } else if (periodo === "mensual") {
      query = `
        SELECT 
          'Sem ' || TO_CHAR(DATE_TRUNC('week', fecha), 'DD Mon') as fecha,
          COALESCE(SUM(litros), 0) as cantidad_combustible
        FROM ABASTECIMIENTO
        WHERE fecha >= CURRENT_DATE - INTERVAL '4 weeks'
        GROUP BY DATE_TRUNC('week', fecha)
        ORDER BY DATE_TRUNC('week', fecha) ASC;
      `;
    } else if (periodo === "anual") {
      query = `
        SELECT 
          TO_CHAR(DATE_TRUNC('month', fecha), 'Mon') as fecha,
          COALESCE(SUM(litros), 0) as cantidad_combustible
        FROM ABASTECIMIENTO
        WHERE fecha >= CURRENT_DATE - INTERVAL '1 year'
        GROUP BY DATE_TRUNC('month', fecha)
        ORDER BY DATE_TRUNC('month', fecha) ASC;
      `;
    }

    const { rows } = await pool.query(query);
    return rows;
  },
};