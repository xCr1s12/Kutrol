import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    // 1. Métricas de Vehículos
    const resVehiculos = await pool.query(`
      SELECT 
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE estado = 'EN_RUTA') AS en_ruta,
        COUNT(*) FILTER (WHERE estado = 'DISPONIBLE') AS disponibles,
        COUNT(*) FILTER (WHERE estado = 'MANTENCION') AS mantencion
      FROM CAMION
    `);

    // 2. Gasto Total y Litros de Combustible
    const resCombustible = await pool.query(`
      SELECT 
        COALESCE(SUM(costo), 0) AS gasto_total,
        COALESCE(SUM(cantidad_combustible), 0) AS litros_totales
      FROM ABASTECIMIENTO
    `);

    // 3. KPI Rendimiento Promedio (Km / Litro)
    const resRendimiento = await pool.query(`
      SELECT 
        ROUND(COALESCE(SUM(r.distancia_km) / NULLIF(SUM(ab.cantidad_combustible), 0), 0), 2) AS kpi_rendimiento
      FROM VIAJE v
      JOIN RUTA r ON v.id_ruta = r.id_ruta
      LEFT JOIN ABASTECIMIENTO ab ON ab.id_camion = v.id_camion 
        AND ab.fecha BETWEEN v.fecha_inicio AND COALESCE(v.fecha_fin, CURRENT_TIMESTAMP)
      WHERE v.estado = 'COMPLETADO'
    `);

    // 4. Ranking de Conductores Eficientes (Top 5)
    const resRanking = await pool.query(`
      SELECT 
        c.id_conductor,
        c.nombre,
        ROUND(COALESCE(SUM(r.distancia_km) / NULLIF(SUM(ab.cantidad_combustible), 0), 0), 1) AS rendimiento_kml
      FROM CONDUCTOR c
      JOIN ASIGNACION a ON a.id_conductor = c.id_conductor
      JOIN VIAJE v ON a.id_viaje = v.id_viaje
      JOIN RUTA r ON v.id_ruta = r.id_ruta
      LEFT JOIN ABASTECIMIENTO ab ON ab.id_camion = v.id_camion 
        AND ab.fecha BETWEEN v.fecha_inicio AND COALESCE(v.fecha_fin, CURRENT_TIMESTAMP)
      WHERE v.estado = 'COMPLETADO'
      GROUP BY c.id_conductor, c.nombre
      ORDER BY rendimiento_kml DESC
      LIMIT 5
    `);

    // 5. Alertas Activas Recientes
    const resAlertas = await pool.query(`
      SELECT 
        al.id_alerta,
        al.tipo,
        al.estado,
        al.mensaje,
        al.fecha_hora,
        co.nombre AS conductor_nombre
      FROM ALERTA al
      LEFT JOIN CONDUCTOR co ON al.id_conductor = co.id_conductor
      WHERE al.estado IN ('GENERADA', 'EN_REVISION')
      ORDER BY al.fecha_hora DESC
      LIMIT 5
    `);

    return NextResponse.json({
      success: true,
      data: {
        vehiculos: resVehiculos.rows[0],
        combustible: resCombustible.rows[0],
        rendimiento: resRendimiento.rows[0]?.kpi_rendimiento || 7.2,
        ranking: resRanking.rows,
        alertas: resAlertas.rows,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}