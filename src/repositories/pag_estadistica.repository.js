import pool from "@/lib/db";

export const estadisticaRepository = {
  async getRankingConductoresByEmpresa(id_empresa) {
    try {
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
        LEFT JOIN LATERAL (
          SELECT SUM(litros) AS litros 
          FROM ABASTECIMIENTO ab 
          WHERE ab.id_camion = v.id_camion 
            AND ab.fecha BETWEEN v.fecha_inicio AND COALESCE(v.fecha_fin, CURRENT_TIMESTAMP)
        ) ab ON TRUE
        WHERE c.id_empresa = $1
          AND c.deleted_at IS NULL
          AND v.estado = 'COMPLETADO'
        GROUP BY c.id_conductor, c.primer_nombre, c.apellidos
        ORDER BY rendimiento_kml DESC
        LIMIT 5
        `,
        [id_empresa],
      );
      return rows || [];
    } catch (error_capturado) {
      console.error("Error en getRankingConductoresByEmpresa:", error_capturado);
      return [];
    }
  },

  async getDashboardStats(id_empresa) {
    let vehiculos = { total: 0, en_ruta: 0, disponibles: 0, mantencion: 0 };
    let combustible = { gasto_total: 0, litros_totales: 0 };
    let rendimiento = 0;
    let ranking = [];
    let alertas = [];
    let ralentiInnecesarioPct = 0;
    let correlacionVelocidadRendimiento = 0;
    let desviacionEstandarRendimiento = 0;
    let proyeccionGastoMensual = 0;
    let datosScatter = [];
    let diagnosticos = [];

    // Filtramos estrictamente por id_empresa en todas las consultas para que cambie según el usuario
    const empresa_filtro = id_empresa || null;

    try {
      const resultado_vehiculos = await pool.query(`
        SELECT 
          COUNT(c.*) AS total,
          COUNT(c.*) FILTER (WHERE c.estado = 'EN_RUTA') AS en_ruta,
          COUNT(c.*) FILTER (WHERE c.estado = 'DISPONIBLE') AS disponibles,
          COUNT(c.*) FILTER (WHERE c.estado = 'MANTENCION') AS mantencion
        FROM CAMION c
        JOIN FLOTA f ON c.id_flota = f.id_flota
        WHERE f.id_empresa = $1
      `, [empresa_filtro]);
      if (resultado_vehiculos.rows && resultado_vehiculos.rows[0]) {
        vehiculos = resultado_vehiculos.rows[0];
      }
    } catch (error_vehiculos) {
      console.error("Error consultando vehiculos:", error_vehiculos);
    }

    try {
      const resultado_combustible = await pool.query(`
        SELECT 
          COALESCE(SUM(ab.costo), 0) AS gasto_total,
          COALESCE(SUM(ab.litros), 0) AS litros_totales
        FROM ABASTECIMIENTO ab
        JOIN CAMION c ON ab.id_camion = c.id_camion
        JOIN FLOTA f ON c.id_flota = f.id_flota
        WHERE f.id_empresa = $1
      `, [empresa_filtro]);
      if (resultado_combustible.rows && resultado_combustible.rows[0]) {
        combustible = resultado_combustible.rows[0];
      }
    } catch (error_combustible) {
      console.error("Error consultando combustible:", error_combustible);
    }

    try {
      const resultado_rendimiento = await pool.query(`
        SELECT 
          ROUND(COALESCE(SUM(r.distancia_km) / NULLIF(SUM(ab.litros), 0), 0), 2) AS kpi_rendimiento
        FROM VIAJE v
        JOIN RUTA r ON v.id_ruta = r.id_ruta
        LEFT JOIN LATERAL (
          SELECT SUM(litros) AS litros 
          FROM ABASTECIMIENTO ab 
          WHERE ab.id_camion = v.id_camion 
            AND ab.fecha BETWEEN v.fecha_inicio AND COALESCE(v.fecha_fin, CURRENT_TIMESTAMP)
        ) ab ON TRUE
        WHERE v.estado = 'COMPLETADO' AND v.id_empresa = $1
      `, [empresa_filtro]);
      if (resultado_rendimiento.rows && resultado_rendimiento.rows[0]) {
        rendimiento = resultado_rendimiento.rows[0].kpi_rendimiento || 0;
      }
    } catch (error_rendimiento) {
      console.error("Error consultando rendimiento:", error_rendimiento);
    }

    try {
      const resultado_ranking = await pool.query(`
        SELECT 
          c.id_conductor,
          (c.primer_nombre || ' ' || c.apellidos) AS nombre,
          ROUND(COALESCE(SUM(r.distancia_km) / NULLIF(SUM(ab.litros), 0), 0), 1) AS rendimiento_kml
        FROM CONDUCTOR c
        JOIN ASIGNACION a ON a.id_conductor = c.id_conductor
        JOIN VIAJE v ON a.id_viaje = v.id_viaje
        JOIN RUTA r ON v.id_ruta = r.id_ruta
        LEFT JOIN LATERAL (
          SELECT SUM(litros) AS litros 
          FROM ABASTECIMIENTO ab 
          WHERE ab.id_camion = v.id_camion 
            AND ab.fecha BETWEEN v.fecha_inicio AND COALESCE(v.fecha_fin, CURRENT_TIMESTAMP)
        ) ab ON TRUE
        WHERE v.estado = 'COMPLETADO' AND c.id_empresa = $1
        GROUP BY c.id_conductor, c.primer_nombre, c.apellidos
        ORDER BY rendimiento_kml DESC
        LIMIT 5
      `, [empresa_filtro]);
      ranking = resultado_ranking.rows || [];
    } catch (error_ranking) {
      console.error("Error consultando ranking:", error_ranking);
    }

    try {
      const resultado_alertas = await pool.query(`
        SELECT 
          al.id_alerta,
          al.tipo,
          al.estado,
          al.mensaje,
          al.fecha_hora,
          (co.primer_nombre || ' ' || co.apellidos) AS conductor_nombre
        FROM ALERTA al
        LEFT JOIN CONDUCTOR co ON al.id_conductor = co.id_conductor
        JOIN ANOMALIA an ON al.id_anomalia = an.id_anomalia
        JOIN TELEMETRIA t ON an.id_telemetria = t.id_telemetria AND an.fecha_hora_telemetria = t.fecha_hora
        JOIN CAMION c ON t.id_camion = c.id_camion
        JOIN FLOTA f ON c.id_flota = f.id_flota
        WHERE al.estado IN ('GENERADA', 'EN_REVISION') AND f.id_empresa = $1
        ORDER BY al.fecha_hora DESC
        LIMIT 5
      `, [empresa_filtro]);
      alertas = resultado_alertas.rows || [];
    } catch (error_alertas) {
      console.error("Error consultando alertas:", error_alertas);
    }

    try {
      const resultado_ralenti = await pool.query(`
        SELECT 
          ROUND(
            COALESCE(
              (COUNT(al.*) FILTER (WHERE al.mensaje ILIKE '%ralenti%') * 100.0) / NULLIF(COUNT(al.*), 0), 
              0
            ), 
            2
          ) AS porcentaje_ralenti
        FROM ALERTA al
        JOIN ANOMALIA an ON al.id_anomalia = an.id_anomalia
        JOIN TELEMETRIA t ON an.id_telemetria = t.id_telemetria AND an.fecha_hora_telemetria = t.fecha_hora
        JOIN CAMION c ON t.id_camion = c.id_camion
        JOIN FLOTA f ON c.id_flota = f.id_flota
        WHERE f.id_empresa = $1
      `, [empresa_filtro]);
      if (resultado_ralenti.rows && resultado_ralenti.rows[0]) {
        ralentiInnecesarioPct = resultado_ralenti.rows[0].porcentaje_ralenti || 0;
      }
    } catch (error_ralenti) {
      console.error("Error consultando ralenti:", error_ralenti);
    }

    try {
      const resultado_proyeccion = await pool.query(`
        SELECT 
          COALESCE(SUM(ab.costo), 0) AS proyeccion_gasto_mensual
        FROM ABASTECIMIENTO ab
        JOIN CAMION c ON ab.id_camion = c.id_camion
        JOIN FLOTA f ON c.id_flota = f.id_flota
        WHERE ab.fecha >= CURRENT_DATE - INTERVAL '30 days' AND f.id_empresa = $1
      `, [empresa_filtro]);
      if (resultado_proyeccion.rows && resultado_proyeccion.rows[0]) {
        proyeccionGastoMensual = resultado_proyeccion.rows[0].proyeccion_gasto_mensual || 0;
      }
    } catch (error_proyeccion) {
      console.error("Error consultando proyeccion:", error_proyeccion);
    }

    try {
      const resultado_avanzadas = await pool.query(`
        WITH rendimiento_por_viaje AS (
          SELECT 
            r.distancia_km / NULLIF(ab.litros, 0) AS rendimiento_viaje,
            r.distancia_km / NULLIF(EXTRACT(EPOCH FROM (v.fecha_fin - v.fecha_inicio)) / 3600.0, 0) AS velocidad_viaje
          FROM VIAJE v
          JOIN RUTA r ON v.id_ruta = r.id_ruta
          LEFT JOIN LATERAL (
            SELECT SUM(litros) AS litros 
            FROM ABASTECIMIENTO ab 
            WHERE ab.id_camion = v.id_camion 
              AND ab.fecha BETWEEN v.fecha_inicio AND COALESCE(v.fecha_fin, CURRENT_TIMESTAMP)
          ) ab ON TRUE
          WHERE v.estado = 'COMPLETADO' AND ab.litros > 0 AND v.fecha_fin IS NOT NULL AND v.id_empresa = $1
        )
        SELECT 
          ROUND(COALESCE(STDDEV(rendimiento_viaje), 0), 2) AS desviacion_estandar_rendimiento,
          ROUND(COALESCE(CORR(velocidad_viaje, rendimiento_viaje), 0), 2) AS correlacion_velocidad_rendimiento
        FROM rendimiento_por_viaje
      `, [empresa_filtro]);
      if (resultado_avanzadas.rows && resultado_avanzadas.rows[0]) {
        desviacionEstandarRendimiento = resultado_avanzadas.rows[0].desviacion_estandar_rendimiento || 0;
        correlacionVelocidadRendimiento = resultado_avanzadas.rows[0].correlacion_velocidad_rendimiento || 0;
      }
    } catch (error_avanzadas) {
      console.error("Error consultando estadisticas avanzadas:", error_avanzadas);
    }

    try {
      const resultado_dispersion = await pool.query(`
        SELECT 
          COALESCE(c.patente, c.codigo_dispositivo, 'Camión ' || c.id_camion) AS camion,
          ROUND(CAST(COALESCE(r.distancia_km / NULLIF(EXTRACT(EPOCH FROM (v.fecha_fin - v.fecha_inicio)) / 3600.0, 0), 0) AS numeric), 1) AS velocidad,
          COALESCE(tc.carga_total_ton, 0) AS carga,
          ROUND(CAST(COALESCE(r.distancia_km / NULLIF(ab.litros, 0), 0) AS numeric), 2) AS rendimiento
        FROM VIAJE v
        JOIN CAMION c ON v.id_camion = c.id_camion
        JOIN RUTA r ON v.id_ruta = r.id_ruta
        LEFT JOIN (
          SELECT id_viaje, SUM(peso_kg) / 1000.0 AS carga_total_ton
          FROM CARGA
          GROUP BY id_viaje
        ) tc ON tc.id_viaje = v.id_viaje
        LEFT JOIN LATERAL (
          SELECT SUM(litros) AS litros 
          FROM ABASTECIMIENTO ab 
          WHERE ab.id_camion = v.id_camion 
            AND ab.fecha BETWEEN v.fecha_inicio AND COALESCE(v.fecha_fin, CURRENT_TIMESTAMP)
        ) ab ON TRUE
        WHERE v.estado = 'COMPLETADO' AND v.id_empresa = $1
        LIMIT 20
      `, [empresa_filtro]);
      datosScatter = resultado_dispersion.rows || [];
    } catch (error_dispersion) {
      console.error("Error consultando dispersion:", error_dispersion);
    }

    try {
      const resultado_diagnosticos = await pool.query(`
        SELECT 
          al.tipo AS titulo,
          al.mensaje AS descripcion
        FROM ALERTA al
        JOIN ANOMALIA an ON al.id_anomalia = an.id_anomalia
        JOIN TELEMETRIA t ON an.id_telemetria = t.id_telemetria AND an.fecha_hora_telemetria = t.fecha_hora
        JOIN CAMION c ON t.id_camion = c.id_camion
        JOIN FLOTA f ON c.id_flota = f.id_flota
        WHERE al.estado IN ('GENERADA', 'EN_REVISION') AND f.id_empresa = $1
        ORDER BY al.fecha_hora DESC
        LIMIT 5
      `, [empresa_filtro]);
      diagnosticos = resultado_diagnosticos.rows || [];
    } catch (error_diagnosticos) {
      console.error("Error consultando diagnosticos:", error_diagnosticos);
    }

    return {
      vehiculos,
      combustible,
      rendimiento,
      ranking,
      alertas,
      ralentiInnecesarioPct,
      correlacionVelocidadRendimiento,
      desviacionEstandarRendimiento,
      proyeccionGastoMensual,
      datosScatter,
      diagnosticos,
    };
  },

  async getConsumoPorPeriodo(periodo, id_empresa) {
    let consulta_sql = "";
    const empresa_filtro = id_empresa || null;

    if (periodo === "semanal") {
      consulta_sql = `
        SELECT 
          TO_CHAR(DATE(ab.fecha), 'DD Mon') as fecha,
          COALESCE(SUM(ab.litros), 0) as cantidad_combustible
        FROM ABASTECIMIENTO ab
        JOIN CAMION c ON ab.id_camion = c.id_camion
        JOIN FLOTA f ON c.id_flota = f.id_flota
        WHERE ab.fecha >= CURRENT_DATE - INTERVAL '7 days' AND f.id_empresa = $1
        GROUP BY DATE(ab.fecha)
        ORDER BY DATE(ab.fecha) ASC;
      `;
    } else if (periodo === "mensual") {
      consulta_sql = `
        SELECT 
          'Sem ' || TO_CHAR(DATE_TRUNC('week', ab.fecha), 'DD Mon') as fecha,
          COALESCE(SUM(ab.litros), 0) as cantidad_combustible
        FROM ABASTECIMIENTO ab
        JOIN CAMION c ON ab.id_camion = c.id_camion
        JOIN FLOTA f ON c.id_flota = f.id_flota
        WHERE ab.fecha >= CURRENT_DATE - INTERVAL '4 weeks' AND f.id_empresa = $1
        GROUP BY DATE_TRUNC('week', ab.fecha)
        ORDER BY DATE_TRUNC('week', ab.fecha) ASC;
      `;
    } else if (periodo === "anual") {
      consulta_sql = `
        SELECT 
          TO_CHAR(DATE_TRUNC('month', ab.fecha), 'Mon') as fecha,
          COALESCE(SUM(ab.litros), 0) as cantidad_combustible
        FROM ABASTECIMIENTO ab
        JOIN CAMION c ON ab.id_camion = c.id_camion
        JOIN FLOTA f ON c.id_flota = f.id_flota
        WHERE ab.fecha >= CURRENT_DATE - INTERVAL '1 year' AND f.id_empresa = $1
        GROUP BY DATE_TRUNC('month', ab.fecha)
        ORDER BY DATE_TRUNC('month', ab.fecha) ASC;
      `;
    }

    try {
      const { rows } = await pool.query(consulta_sql, [empresa_filtro]);
      return rows || [];
    } catch (error_consumo) {
      console.error("Error en getConsumoPorPeriodo:", error_consumo);
      return [];
    }
  },
};