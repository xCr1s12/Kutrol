import pool from "@/lib/db";

export async function getRutasByEmpresa(id_empresa, db = pool) {
  const queryText = `
    SELECT 
      r.id_ruta,
      co.nombre AS comuna_origen,
      cd.nombre AS comuna_destino,
      r.distancia_km,
      -- Puntos de control ordenados para el mapa
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'nombre', pc.nombre,
              'latitud', pc.latitud,
              'longitud', pc.longitud,
              'orden', pc.orden
            ) ORDER BY pc.orden
          )
          FROM punto_control pc
          WHERE pc.id_ruta = r.id_ruta
        ), '[]'::json
      ) AS puntos_control,
      -- Viajes asociados a esta ruta dentro de la empresa
      COALESCE(
        (
          SELECT json_agg(
            json_build_object(
              'id_viaje', v.id_viaje,
              'estado', v.estado,
              'conductor', CONCAT(c.primer_nombre, ' ', c.apellidos),
              'encargado', CONCAT(enc.primer_nombre, ' ', enc.apellidos)
            )
          )
          FROM viaje v
          LEFT JOIN asignacion a ON a.id_viaje = v.id_viaje AND a.estado = 'ACTIVA'
          LEFT JOIN conductor c ON c.id_conductor = a.id_conductor
          LEFT JOIN encargado_empresa enc ON enc.id_empresa = v.id_empresa AND enc.id_nivel_jerarquico = 1
          WHERE v.id_ruta = r.id_ruta AND v.id_empresa = $1
        ), '[]'::json
      ) AS viajes
    FROM ruta r
    JOIN comuna co ON co.id_comuna = r.id_comuna_origen
    JOIN comuna cd ON cd.id_comuna = r.id_comuna_destino
    ORDER BY r.id_ruta ASC;
  `;

  const { rows } = await db.query(queryText, [id_empresa]);
  return rows;
}

export async function createRuta({ id_comuna_origen, id_comuna_destino, distancia_km }, db = pool) {
  const queryText = `
    INSERT INTO ruta (id_comuna_origen, id_comuna_destino, distancia_km)
    VALUES ($1, $2, $3)
    RETURNING id_ruta, id_comuna_origen, id_comuna_destino, distancia_km, created_at;
  `;

  const { rows } = await db.query(queryText, [id_comuna_origen, id_comuna_destino, distancia_km]);
  return rows[0];
}