import pool from "@/lib/db";

// BUSQUEDA de TODAS LAS REGIONES Y COMUNAS 
export async function findAllRegionesYComunas(db = pool) {
  const { rows } = await db.query(
    `SELECT r.id_region AS region_id, r.nombre AS region_nombre,
            c.id_comuna AS comuna_id, c.nombre AS comuna_nombre
     FROM region r
     JOIN comuna c ON c.id_region = r.id_region
     ORDER BY r.id_region, c.nombre`,
  );
  return rows;
}

// BUSQUEDA DE COMUNAS POR REGION
export async function getComunasbyRegion(regionId, db = pool) {
    const { rows } = await db.query(
        `SELECT c.id_comuna AS comuna_id, c.nombre AS comuna_nombre 
         FROM comuna AS c
         WHERE c.id_region = $1
         ORDER BY c.nombre`,
        [regionId]
    );
    return rows;
}

// BUSQUEDA DE COMUNAS POR NOMBRE DE REGION
export async function getComunasByRegionNombre(regionNombre, db = pool) {
    const { rows } = await db.query(
      `SELECT c.id_comuna AS comuna_id, c.nombre AS comuna_nombre 
       FROM comuna AS c
       JOIN region AS r ON c.id_region = r.id_region
       WHERE r.nombre ILIKE $1
       ORDER BY c.nombre`,
      [regionNombre] 
    );
    return rows;
}

// BUSQUEDA DE UNA COMUNA POR ID
export async function getComunaById(id_comuna, db = pool) {
    const { rows } = await db.query(
        `SELECT c.id_comuna AS comuna_id, c.nombre AS comuna_nombre, c.id_region 
         FROM comuna AS c 
         WHERE c.id_comuna = $1`,
        [id_comuna]
    );
    return rows[0] || null; 
}

// BUSQUEDA DE SI EXISTE LA COMUNA POR ID
export async function existComuna(id_comuna, db = pool) {
    const { rows } = await db.query(
        "SELECT 1 FROM comuna WHERE id_comuna = $1",
        [id_comuna]
    );
    return rows.length > 0;
}

// BUSQUEDA DE SI EXISTE LA COMUNA POR NOMBRE
export async function existComunaByNombre(nombreComuna, db = pool) {
    const { rows } = await db.query(
        "SELECT 1 FROM comuna WHERE nombre ILIKE $1",
        [nombreComuna]
    );
    return rows.length > 0;
}