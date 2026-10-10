import pool from "@/lib/db";

// BUSQUEDA de TODAS LAS REGIONES Y COMUNAS 
export async function findAllRegionesYComunas(db = pool) {
  const { rows } = await db.query(
    `SELECT r.id AS region_id, r.nombre AS region_nombre,
            c.id AS comuna_id, c.nombre AS comuna_nombre
     FROM region r
     JOIN comuna c ON c.id_region = r.id
     ORDER BY r.id, c.nombre`,
  );
  return rows;
}

// BUSQUEDA DE COMUNAS POR REGION (Corregido: bd -> db y agregada la coma)
export async function getComunasbyRegion(regionId, db = pool) {
    const { rows } = await db.query(
        `SELECT c.id AS comuna_id, c.nombre AS comuna_nombre 
         FROM COMUNA AS c
         WHERE c.id_region = $1
         ORDER BY c.nombre`,
        [regionId] // <--- Aquí estaba el error (faltaba la coma y el nombre de la variable era bd)
    );
    return rows;
}

// BUSQUEDA DE COMUNAS POR NOMBRE DE REGION
export async function getComunasByRegionNombre(regionNombre, db = pool) {
    const { rows } = await db.query(
      `SELECT c.id AS comuna_id, c.nombre AS comuna_nombre 
       FROM comuna AS c
       JOIN region AS r ON c.id_region = r.id
       WHERE r.nombre ILIKE $1
       ORDER BY c.nombre`,
      [regionNombre] 
    );
    return rows;
}

// BUSQUEDA DE SI EXISTE LA COMUNA POR ID
export async function existComuna(id_comuna, db = pool) {
    const { rows } = await db.query(
        "SELECT 1 FROM comuna WHERE id = $1",
        [id_comuna]
    );
    return rows.length > 0;
}

// BUSQUEDA DE SI EXISTE LA COMUNA POR NOMBRE
export async function existComunaByNombre(nombreComuna, db = pool) {
    const { rows } = await db.query(
        "SELECT 1 FROM comuna WHERE comuna.nombre ILIKE $1",
        [nombreComuna]
    );
    return rows.length > 0;
}