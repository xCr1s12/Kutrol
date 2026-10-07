import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const periodo = searchParams.get("periodo") || "semanal";

  try {
    let query = "";

    if (periodo === "semanal") {
      // Últimos 7 días
      query = `
        SELECT 
          TO_CHAR(DATE(fecha), 'DD Mon') as fecha,
          SUM(cantidad_combustible) as cantidad_combustible
        FROM ABASTECIMIENTO
        WHERE fecha >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY DATE(fecha)
        ORDER BY DATE(fecha) ASC;
      `;
    } else if (periodo === "mensual") {
      // Últimas 4 semanas (Agrupado por semana)
      query = `
        SELECT 
          'Sem ' || TO_CHAR(DATE_TRUNC('week', fecha), 'DD Mon') as fecha,
          SUM(cantidad_combustible) as cantidad_combustible
        FROM ABASTECIMIENTO
        WHERE fecha >= CURRENT_DATE - INTERVAL '4 weeks'
        GROUP BY DATE_TRUNC('week', fecha)
        ORDER BY DATE_TRUNC('week', fecha) ASC;
      `;
    } else if (periodo === "anual") {
      // 12 meses del año (Agrupado por mes)
      query = `
        SELECT 
          TO_CHAR(DATE_TRUNC('month', fecha), 'Mon') as fecha,
          SUM(cantidad_combustible) as cantidad_combustible
        FROM ABASTECIMIENTO
        WHERE fecha >= CURRENT_DATE - INTERVAL '1 year'
        GROUP BY DATE_TRUNC('month', fecha)
        ORDER BY DATE_TRUNC('month', fecha) ASC;
      `;
    }

    const { rows } = await pool.query(query);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error en la consulta por periodo:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}